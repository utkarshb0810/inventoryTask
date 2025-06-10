const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
