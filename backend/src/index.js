const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const hpp = require("hpp");
const path = require("path");
const mongoose = require("mongoose");
// Load backend .env robustly regardless of current execution directory
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// Also fallback to root .env if present
require("dotenv").config();

// Database & Cloud Configuration
const connectDB = require("./config/db");

// Traffic Management Middlewares
const { globalLimiter } = require("./middleware/rateLimiter");
const { requestTimeoutGuard } = require("./middleware/trafficGuard");

// Cyber Security Middlewares
const {
  payloadSanitizer,
  methodSecurityFilter,
} = require("./middleware/securityGuard");

// Route imports
const contactRoutes = require("./routes/contact.routes");
const prescriptionRoutes = require("./routes/prescription.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// ─── Reverse Proxy & ETag Configuration ──────────────────────────────────────
app.set("trust proxy", 1);
app.set("etag", "strong");
app.disable("x-powered-by");

// ─── 1. HTTP Security Headers (Helmet Fortification) ─────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"], // Complete Clickjacking Defense
        upgradeInsecureRequests: isProduction ? [] : null,
      },
    },
    frameguard: { action: "deny" },
    noSniff: true,
    hsts: {
      maxAge: 63072000, // 2 years
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);

// Custom Permissions-Policy header
app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), midi=(), browsing-topics=()"
  );
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  next();
});

// ─── 2. HTTP Method Filter (Block TRACE, TRACK, CONNECT) ─────────────────────
app.use(methodSecurityFilter);

// ─── 3. Bandwidth Optimization (Compression) ─────────────────────────────────
app.use(
  compression({
    level: 6,
    threshold: 1024,
  })
);

// ─── 4. CORS Lockdown with Whitelist ─────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://binghanipharmacy.com",
  "https://www.binghanipharmacy.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: Origin not allowed"), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    maxAge: 86400, // 24 hours preflight cache
  })
);

// ─── 5. Request Timeout Guard (15s) ──────────────────────────────────────────
app.use(requestTimeoutGuard(15000));

// ─── 6. Fair Traffic Rate Limiter ────────────────────────────────────────────
app.use(globalLimiter);

// ─── 7. Payload Sanitization & Size Constraints (Anti-DoS & Anti-XSS) ────────
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));

// HTTP Parameter Pollution (HPP) defense
app.use(hpp());

// Deep XSS & Injection payload sanitizer
app.use(payloadSanitizer);

// Access Logging
app.use(morgan("dev"));

// ─── Health & Security Diagnostics Endpoint ──────────────────────────────────
app.get("/api/health", (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.status(200).json({
    status: "healthy",
    uptimeSeconds: Math.floor(process.uptime()),
    service: "Bin Ghani Pharmacy API",
    securityPosture: {
      headers: "CSP, HSTS, X-Frame-Options: DENY, Permissions-Policy",
      xssDefense: "Deep entity sanitization active",
      rateLimiting: "Active (200 req/15min)",
      parameterPollutionDefense: "HPP active",
      compression: "Gzip/Deflate active",
    },
    integrations: {
      database:
        mongoose.connection.readyState === 1
          ? "connected (MongoDB Atlas)"
          : "disconnected / in-memory fallback",
      cloudinary: process.env.CLOUDINARY_CLOUD_NAME
        ? "configured"
        : "unconfigured",
    },
    system: {
      heapUsedMb: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      rssMb: (memoryUsage.rss / 1024 / 1024).toFixed(2),
    },
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/contact", contactRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/products", productRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

// ─── Global Secure Error Handler (No Information Disclosure) ───────────────────
app.use((err, req, res, next) => {
  // Log full error stack securely to server console only (never to client)
  console.error(`[SECURITY ERROR] ${err.message}`);

  // Mask internal database or runtime errors from the client
  const statusCode = err.status || (err.message.includes("CORS") ? 403 : 500);
  const clientMessage =
    statusCode === 403
      ? "Access forbidden by security policy."
      : statusCode === 400
      ? err.message
      : "An unexpected error occurred. Request has been safely terminated.";

  res.status(statusCode).json({
    status: statusCode,
    error: clientMessage,
  });
});

// ─── Server Start & Graceful Shutdown ────────────────────────────────────────
connectDB();

const server = app.listen(PORT, () => {
  console.log(`🚀 Bin Ghani Pharmacy API running on port ${PORT}`);
  console.log(`🛡️ Cyber Security & Rate Limiting: HARDENED & ACTIVE`);
});

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Closing HTTP server gracefully...`);

  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.close(false);
      console.log("🍃 MongoDB connection safely closed.");
    } catch (err) {
      console.error("Error closing MongoDB connection:", err.message);
    }
  }

  server.close(() => {
    console.log("HTTP server closed. All pending requests drained.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

module.exports = app;
