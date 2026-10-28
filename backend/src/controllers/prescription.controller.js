const mongoose = require("mongoose");
const Prescription = require("../models/Prescription");
const { uploadBufferToCloudinary } = require("../config/cloudinary");

// Fallback in-memory store if MongoDB is not connected
const memoryPrescriptions = [];

/**
 * POST /api/prescriptions/upload
 * Upload a prescription with optional image/document file to Cloudinary & MongoDB
 */
exports.uploadPrescription = async (req, res) => {
  try {
    const { patientName, phone, notes } = req.body;

    if (!patientName || !phone) {
      return res.status(400).json({
        error: "Patient name and phone number are required.",
      });
    }

    let imageUrl = null;
    let imagePublicId = null;

    // If an image or PDF was uploaded via Multer
    if (req.file) {
      try {
        const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
          folder: "bin-ghani-pharmacy/prescriptions",
          resource_type: "auto",
        });
        imageUrl = uploadResult.secure_url || uploadResult.url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr.message);
        // Continue saving prescription record even if cloud image upload fails, but warn
      }
    }

    // Check if MongoDB is connected (readyState === 1)
    if (mongoose.connection.readyState === 1) {
      const savedPrescription = await Prescription.create({
        patientName,
        phone,
        notes: notes || "",
        imageUrl,
        imagePublicId,
        status: "pending",
      });

      return res.status(201).json({
        success: true,
        message: "Prescription received. Our pharmacist will review and contact you shortly.",
        id: savedPrescription._id,
        imageUrl: savedPrescription.imageUrl,
      });
    }

    // Fallback in-memory store
    const fallbackPrescription = {
      id: Date.now().toString(),
      patientName,
      phone,
      notes: notes || "",
      imageUrl,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    memoryPrescriptions.push(fallbackPrescription);

    return res.status(201).json({
      success: true,
      message: "Prescription received. Our pharmacist will review and contact you shortly.",
      id: fallbackPrescription.id,
      imageUrl: fallbackPrescription.imageUrl,
    });
  } catch (error) {
    console.error("Prescription processing error:", error);
    return res.status(500).json({ error: "Failed to process prescription." });
  }
};

/**
 * GET /api/prescriptions
 * Get all prescriptions (admin)
 */
exports.getAllPrescriptions = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const prescriptions = await Prescription.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: prescriptions.length,
        data: prescriptions,
      });
    }

    return res.status(200).json({
      success: true,
      count: memoryPrescriptions.length,
      data: memoryPrescriptions,
    });
  } catch (error) {
    console.error("Fetch prescriptions error:", error);
    return res.status(500).json({ error: "Failed to fetch prescriptions." });
  }
};

/**
 * GET /api/prescriptions/:id
 * Get a single prescription by ID
 */
exports.getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(id)) {
      const prescription = await Prescription.findById(id);
      if (!prescription) {
        return res.status(404).json({ error: "Prescription not found." });
      }
      return res.status(200).json({ success: true, data: prescription });
    }

    const prescription = memoryPrescriptions.find((p) => p.id === id);
    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found." });
    }
    return res.status(200).json({ success: true, data: prescription });
  } catch (error) {
    console.error("Fetch prescription error:", error);
    return res.status(500).json({ error: "Failed to fetch prescription." });
  }
};
