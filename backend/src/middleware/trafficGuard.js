/**
 * Traffic Guard Middleware:
 * Provides connection hygiene, timeout guards, and bandwidth protection.
 */

// Request timeout guard (15 seconds) to prevent slowloris/hung sockets
const requestTimeoutGuard = (timeoutMs = 15000) => {
  return (req, res, next) => {
    res.setTimeout(timeoutMs, () => {
      if (!res.headersSent) {
        res.status(504).json({
          status: 504,
          error: "Gateway Timeout",
          message: "Request took too long to complete. Server released the connection to preserve capacity.",
        });
      }
    });
    next();
  };
};

// HTTP Cache Control for static/read-only responses (Products, Health)
const cacheControl = (maxAgeSeconds = 300, staleWhileRevalidate = 600) => {
  return (req, res, next) => {
    if (req.method === "GET") {
      res.set(
        "Cache-Control",
        `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${staleWhileRevalidate}`
      );
    }
    next();
  };
};

module.exports = {
  requestTimeoutGuard,
  cacheControl,
};
