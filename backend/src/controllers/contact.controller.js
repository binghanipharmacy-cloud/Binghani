const mongoose = require("mongoose");
const Contact = require("../models/Contact");

// Fallback in-memory store if MongoDB is not connected
const memoryContacts = [];

/**
 * POST /api/contact
 * Submit a contact form enquiry
 */
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required fields.",
      });
    }

    // If MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const savedContact = await Contact.create({
        name,
        email,
        phone: phone || null,
        subject: subject || "General Enquiry",
        message,
        status: "unread",
      });

      return res.status(201).json({
        success: true,
        message: "Thank you for contacting us! We will get back to you shortly.",
        id: savedContact._id,
      });
    }

    // Fallback in-memory store
    const fallbackContact = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || null,
      subject: subject || "General Enquiry",
      message,
      createdAt: new Date().toISOString(),
      status: "unread",
    };
    memoryContacts.push(fallbackContact);

    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us! We will get back to you shortly.",
      id: fallbackContact.id,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return res.status(500).json({ error: "Failed to submit contact form." });
  }
};

/**
 * GET /api/contact
 * Get all contact submissions (admin use)
 */
exports.getAllContacts = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    }

    return res.status(200).json({
      success: true,
      count: memoryContacts.length,
      data: memoryContacts,
    });
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return res.status(500).json({ error: "Failed to fetch contact submissions." });
  }
};
