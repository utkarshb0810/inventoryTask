const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// Route definitions
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
