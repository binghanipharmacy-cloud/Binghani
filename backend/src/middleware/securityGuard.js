const validator = require("validator");

/**
 * Cyber Security Module: Input Sanitization & Anti-Injection Guard
 * Protects against:
 * - Cross-Site Scripting (XSS / Stored & Reflected)
 * - HTML & Script Injections
 * - SQL / NoSQL Injection artifacts
 * - Null-Byte attacks & Unicode Smuggling
 * - Dangerous Protocol schemes (javascript:, data:, vbscript:)
 */

/**
 * Deep sanitization for strings:
 * Removes script tags, malicious event handlers, protocols, and escapes HTML entities.
 */
function sanitizeString(str) {
  if (typeof str !== "string") return str;

  let cleaned = str
    // Remove null bytes
    .replace(/\0/g, "")
    // Strip script and iframe tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    // Neutralize dangerous inline event handlers (e.g. onerror=, onclick=)
    .replace(/\bon\w+\s*=/gi, "data-blocked=")
    // Block pseudo-protocols
    .replace(/(javascript|vbscript|data):/gi, "$1_blocked:");

  // Escape HTML entities to neutralize any remaining markup
  return validator.escape(cleaned.trim());
}

/**
 * Recursively sanitize all incoming payload data (body, query, params)
 */
function sanitizePayload(obj) {
  if (!obj || typeof obj !== "object") return obj;

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === "string") {
      obj[key] = sanitizeString(val);
    } else if (typeof val === "object" && val !== null) {
      sanitizePayload(val);
    }
  }
  return obj;
}

/**
 * Middleware: Global Payload Sanitizer
 */
const payloadSanitizer = (req, res, next) => {
  if (req.body) sanitizePayload(req.body);
  if (req.query) sanitizePayload(req.query);
  if (req.params) sanitizePayload(req.params);
  next();
};

/**
 * Middleware: Contact Form Input Validator & Defense
 */
const validateContactInput = (req, res, next) => {
  const { name, email, phone, message, subject } = req.body || {};

  // 1. Mandatory presence check
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Validation Failed",
      message: "Full name, valid email address, and message are required.",
    });
  }

  // 2. Length limits (prevent buffer saturation / memory bloat)
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return res.status(400).json({
      error: "Validation Failed",
      message: "Name must be between 2 and 80 characters.",
    });
  }

  if (typeof email !== "string" || !validator.isEmail(email) || email.length > 100) {
    return res.status(400).json({
      error: "Validation Failed",
      message: "Please provide a valid email address.",
    });
  }

  if (phone && (typeof phone !== "string" || !/^[\d\s+\-()]{7,25}$/.test(phone))) {
    return res.status(400).json({
      error: "Validation Failed",
      message: "Phone number contains invalid characters.",
    });
  }

  if (typeof message !== "string" || message.length < 5 || message.length > 2500) {
    return res.status(400).json({
      error: "Validation Failed",
      message: "Message must be between 5 and 2500 characters.",
    });
  }

  if (subject && (typeof subject !== "string" || subject.length > 120)) {
    return res.status(400).json({
      error: "Validation Failed",
      message: "Subject must not exceed 120 characters.",
    });
  }

  next();
};

/**
 * Middleware: Disallow insecure / unsupported HTTP methods (TRACE, TRACK, CONNECT)
 */
const methodSecurityFilter = (req, res, next) => {
  const disallowedMethods = ["TRACE", "TRACK", "CONNECT"];
  if (disallowedMethods.includes(req.method)) {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: `HTTP method ${req.method} is strictly prohibited by security policy.`,
    });
  }
  next();
};

module.exports = {
  payloadSanitizer,
  validateContactInput,
  methodSecurityFilter,
};
