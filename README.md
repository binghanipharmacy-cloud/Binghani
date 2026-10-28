# Bin Ghani Pharmacy — Monorepo

A clean full-stack monorepo separating the **Next.js frontend** and **Node.js/Express backend** for Bin Ghani Pharmacy.

```
bin-ghani-pharmacy/
├── frontend/          ← Next.js 15 App (React, Tailwind, GSAP)
│   ├── src/
│   │   ├── app/       ← Pages & layouts (App Router)
│   │   └── components/← All UI components
│   ├── public/        ← Static assets & images
│   └── package.json
│
├── backend/           ← Node.js / Express REST API
│   ├── src/
│   │   ├── index.js          ← Server entry point
│   │   ├── routes/           ← API route definitions
│   │   │   ├── contact.routes.js
│   │   │   ├── prescription.routes.js
│   │   │   └── product.routes.js
│   │   ├── controllers/      ← Business logic
│   │   │   ├── contact.controller.js
│   │   │   ├── prescription.controller.js
│   │   │   └── product.controller.js
│   │   ├── middleware/        ← Custom middleware
│   │   └── config/            ← DB & app config
│   ├── .env.example
│   └── package.json
│
└── package.json       ← Root monorepo scripts
```

---

## 🚀 Getting Started

### 1. Install all dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Setup backend environment
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your values
```

### 3. Run both servers
```bash
# Frontend only (http://localhost:3000)
cd frontend && npm run dev

# Backend only (http://localhost:5000)
cd backend && npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| GET    | `/api/health`                   | Health check                   |
| POST   | `/api/contact`                  | Submit contact enquiry         |
| GET    | `/api/contact`                  | List all enquiries (admin)     |
| POST   | `/api/prescriptions/upload`     | Upload prescription            |
| GET    | `/api/prescriptions`            | List all prescriptions (admin) |
| GET    | `/api/prescriptions/:id`        | Get prescription by ID         |
| GET    | `/api/products`                 | List products (+ search/filter)|
| GET    | `/api/products/:id`             | Get product by ID              |
| GET    | `/api/products/category/:cat`   | Products by category           |

---

## 🛡️ Traffic Management & High-Load Architecture

The system is configured with full traffic management to handle high visitor volume fairly and efficiently without server degradation:

1. **Fair Traffic Throttling (`express-rate-limit`)**:
   - **Global Limiter**: 200 requests per 15 minutes per IP with standard `RateLimit-*` headers to avoid noisy neighbours and scraping.
   - **Form Abuse Protection**: 8 requests per 15 minutes per IP on `/api/contact` and `/api/prescriptions/upload` to prevent bot spam.
   - **Catalog Browser Limiter**: 120 requests per 5 minutes.
2. **Bandwidth Optimization & Payload Compression**:
   - `compression` enabled with Gzip & Deflate, reducing transfer size by 60%–80%.
   - Strict payload limits (25KB JSON/URL-encoded) to prevent memory exhaustion attacks.
3. **HTTP Cache Control & ETags**:
   - Strong ETags enabled for `304 Not Modified` instant responses without resending body data.
   - `Cache-Control: public, max-age=300, stale-while-revalidate=600` on product routes.
   - Next.js edge static caching (`Cache-Control: public, max-age=31536000, immutable`) for all images and JS chunks.
4. **Connection Timeout & Denial-of-Service Defense**:
   - 15-second request timeout guard to release hung sockets.
   - `trust proxy: 1` enabled for accurate IP tracking behind Cloudflare, Vercel, or Nginx.
5. **Search Engine & Crawler Throttling**:
   - `public/robots.txt` configured with `Crawl-delay` and rules to block unauthorized AI scrapers while keeping Googlebot indexed efficiently.
6. **Zero-Downtime Clean Traffic Draining**:
   - Graceful shutdown handles `SIGTERM` and `SIGINT` to cleanly complete in-flight traffic before process termination during autoscaling or deployments.

---

## 🔒 Cyber Security Architecture & Hardening

The application is fortified against the OWASP Top 10 web vulnerabilities with zero-trust defense in depth:

1. **Content Security Policy (CSP) & Frameguard**:
   - `Content-Security-Policy` with `frame-ancestors 'none'` blocks all framing/clickjacking attacks.
   - `X-Frame-Options: DENY` ensures strict clickjacking defense across legacy browsers.
2. **Deep XSS & Script Injection Neutralization**:
   - Automated recursive payload sanitizer escapes all HTML entities and strips malicious `<script>`, `<iframe>`, `onerror=`, `onclick=`, and pseudo-protocols (`javascript:`, `data:`).
3. **MIME-Sniffing & Transport Security (HSTS)**:
   - `X-Content-Type-Options: nosniff` stops MIME-type confusion attacks.
   - `Strict-Transport-Security` enforces 2-year HTTPS with `includeSubDomains; preload`.
4. **Hardware Permissions Lockdown**:
   - `Permissions-Policy` completely revokes camera, microphone, geolocation, and USB hardware access.
5. **Denial-of-Service (DoS) & Buffer Defense**:
   - Strict 15KB JSON body cap terminates oversized payload flooding attacks with `HTTP 413`.
   - 15-second socket timeout guard defends against Slowloris connection pool exhaustion.
6. **HTTP Method Filtering**:
   - Prohibits dangerous methods (`TRACE`, `TRACK`, `CONNECT`) with `HTTP 405 Method Not Allowed`.
7. **Parameter Pollution (HPP)**:
   - Defends against duplicate parameter injection attempts using `hpp`.
8. **Information Disclosure Shield**:
   - Framework signature `X-Powered-By` is stripped on both Frontend and Backend.
   - Internal stack traces and database errors are masked from clients.

### 🧪 Run Automated Penetration & Security Audit:
```bash
npm run security:audit
```

---

## 🛠 Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | Next.js 15, React, TypeScript, Tailwind CSS, GSAP|
| Backend   | Node.js, Express.js, REST API                   |
| Security  | Helmet, CSP, HSTS, XSS Sanitizer, HPP, Validator|
| Traffic   | Rate Limiter, Compression (Gzip/Brotli), ETags  |
| Future DB | MongoDB / PostgreSQL (ready to plug in)         |
