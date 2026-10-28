const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

const { productBrowseLimiter } = require("../middleware/rateLimiter");
const { cacheControl } = require("../middleware/trafficGuard");

// GET /api/products - Get all products (cached for 5 minutes, stale-while-revalidate 10 minutes)
router.get("/", productBrowseLimiter, cacheControl(300, 600), productController.getAllProducts);

// GET /api/products/:id - Get a single product by ID
router.get("/:id", productController.getProductById);

// GET /api/products/category/:category - Get products by category
router.get("/category/:category", productController.getProductsByCategory);

module.exports = router;
