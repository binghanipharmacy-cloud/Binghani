const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescription.controller");
const { uploadPrescriptionFile } = require("../middleware/upload");
const { submissionLimiter } = require("../middleware/rateLimiter");

// Multer wrapper that gracefully handles both multipart and JSON requests
const handleUpload = (req, res, next) => {
  uploadPrescriptionFile.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// POST /api/prescriptions/upload - Upload prescription file with Cloudinary & MongoDB support
router.post(
  "/upload",
  submissionLimiter,
  handleUpload,
  prescriptionController.uploadPrescription
);

// GET /api/prescriptions - Get all prescription submissions (admin)
router.get("/", prescriptionController.getAllPrescriptions);

// GET /api/prescriptions/:id - Get a single prescription by ID
router.get("/:id", prescriptionController.getPrescriptionById);

module.exports = router;
