import type { NextConfig } from "next";

// Strict Content Security Policy
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https:;
  connect-src 'self' http://localhost:5000 https://binghanipharmacy.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\n/g, " ").trim();

const securityHeaders = [
  // 1. Content Security Policy
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  // 2. Prevent Clickjacking
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // 3. Prevent MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // 4. Referrer Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // 5. Restrict Browser Device Permissions
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), midi=(), browsing-topics=()",
  },
  // 6. Strict Transport Security (HSTS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // 7. Cross-Domain Policy
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  // 8. Legacy XSS Filter protection
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const isExport = process.env.NEXT_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const } : {}),

  // 1. Enable Brotli / Gzip compression for all rendered pages, CSS, JS and payloads
  compress: true,

  // 2. Hide server framework signature for security
  poweredByHeader: false,

  // 3. Image optimization & long-term edge caching
  images: isExport
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
      },

  // 4. Comprehensive Cyber Security & Caching Headers (for Node.js runtime)
  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            // Apply security headers to all routes
            {
              source: "/:path*",
              headers: securityHeaders,
            },
            // Static media edge caching
            {
              source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ];
        },
      }),

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
