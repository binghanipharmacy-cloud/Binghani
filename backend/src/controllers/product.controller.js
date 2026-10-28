const mongoose = require("mongoose");
const Product = require("../models/Product");

// Seed catalog products for fallback or initial population
const seedProducts = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    brand: "Generic",
    price: 50,
    inStock: true,
    requiresPrescription: false,
    description: "Relieves mild to moderate pain and fever.",
  },
  {
    id: "2",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    brand: "Generic",
    price: 180,
    inStock: true,
    requiresPrescription: true,
    description: "Broad-spectrum antibiotic for bacterial infections.",
  },
  {
    id: "3",
    name: "Omeprazole 20mg",
    category: "Gastroenterology",
    brand: "Generic",
    price: 120,
    inStock: true,
    requiresPrescription: false,
    description: "Reduces stomach acid for heartburn and GERD.",
  },
  {
    id: "4",
    name: "Metformin 500mg",
    category: "Diabetes",
    brand: "Generic",
    price: 95,
    inStock: true,
    requiresPrescription: true,
    description: "First-line medication for type 2 diabetes management.",
  },
  {
    id: "5",
    name: "Vitamin C 1000mg",
    category: "Supplements",
    brand: "Bin Ghani",
    price: 250,
    inStock: true,
    requiresPrescription: false,
    description: "High-dose Vitamin C for immune system support.",
  },
];

/**
 * GET /api/products
 * Return all products from MongoDB or memory
 */
exports.getAllProducts = async (req, res) => {
  try {
    const { search, inStock } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ];
      }

      if (inStock === "true") {
        query.inStock = true;
      }

      let dbProducts = await Product.find(query);

      // If DB is empty, auto-seed with initial catalog items
      if (dbProducts.length === 0 && !search && inStock === undefined) {
        const count = await Product.countDocuments();
        if (count === 0) {
          dbProducts = await Product.insertMany(
            seedProducts.map(({ id, ...rest }) => rest)
          );
        }
      }

      if (dbProducts.length > 0) {
        return res.status(200).json({
          success: true,
          count: dbProducts.length,
          data: dbProducts,
        });
      }
    }

    // Fallback to static seed
    let result = [...seedProducts];

    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (inStock === "true") {
      result = result.filter((p) => p.inStock === true);
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Products fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch products." });
  }
};

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(id)) {
      const product = await Product.findById(id);
      if (product) {
        return res.status(200).json({ success: true, data: product });
      }
    }

    const product = seedProducts.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Product fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch product." });
  }
};

/**
 * GET /api/products/category/:category
 * Get products by category
 */
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const dbProducts = await Product.find({
        category: { $regex: new RegExp(`^${category}$`, "i") },
      });
      if (dbProducts.length > 0) {
        return res.status(200).json({
          success: true,
          count: dbProducts.length,
          data: dbProducts,
        });
      }
    }

    const result = seedProducts.filter(
      (p) => p.category.toLowerCase() === category
    );
    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Product by category error:", error);
    return res.status(500).json({ error: "Failed to fetch products." });
  }
};
