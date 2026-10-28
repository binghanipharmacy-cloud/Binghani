const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

const { submissionLimiter } = require("../middleware/rateLimiter");
const { validateContactInput } = require("../middleware/securityGuard");

// POST /api/contact - Submit contact form enquiry (rate limited & strictly validated)
router.post("/", submissionLimiter, validateContactInput, contactController.submitContact);

// GET /api/contact - Get all contact submissions (admin)
router.get("/", contactController.getAllContacts);

module.exports = router;
