const rateLimit = require("express-rate-limit");

/**
 * Global Rate Limiter:
 * Enforces fair traffic distribution across all clients.
 * Protects the API from brute-force, scraping, and volumetric spikes.
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Max 200 requests per IP per 15 minutes
  standardHeaders: true, // Return standard `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    status: 429,
    error: "Too Many Requests",
    message: "Fair traffic limit exceeded. Please slow down and try again later.",
    retryAfterMinutes: 15,
  },
});

/**
 * Strict Submissions Limiter:
 * For contact forms and prescription uploads to prevent spamming and bot saturation.
 */
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // Max 8 form submissions per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "Submission Rate Limit Exceeded",
    message: "You have submitted multiple requests recently. Please wait a few minutes before trying again.",
  },
});

/**
 * Product Catalog Limiter:
 * Generous limit for product browsing, with automated burst tolerance.
 */
const productBrowseLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 120, // Max 120 requests per 5 minutes
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  globalLimiter,
  submissionLimiter,
  productBrowseLimiter,
};
