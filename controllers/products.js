const pool = require("../db");

// GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /products
exports.createProduct = async (req, res) => {
  const { name, quantity, price } = req.body;

  // Basic validation
  if (!name || price <= 0 || quantity == null) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const result = await pool.query(
      //parameterized query to prevent SQL injection(attacks, hacking etc)
      "INSERT INTO products (name, quantity, price) VALUES ($1, $2, $3) RETURNING *",
      [name, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /products/:id
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;

  if (!name || price <= 0 || quantity == null) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, quantity, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
