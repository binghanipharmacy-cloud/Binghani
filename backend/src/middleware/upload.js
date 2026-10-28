const multer = require("multer");

// Use memory storage so we can stream directly to Cloudinary without saving files to disk
const storage = multer.memoryStorage();

// File filter: accept images and PDF prescriptions
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/heic",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Only JPEG, PNG, WEBP, and PDF documents are allowed."
      ),
      false
    );
  }
};

const uploadPrescriptionFile = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter,
});

module.exports = {
  uploadPrescriptionFile,
};
