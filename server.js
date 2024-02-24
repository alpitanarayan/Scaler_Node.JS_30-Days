const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function createProduct(data) {
  try {
    const product = await Product.create(data);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateProduct(id, newData) {
  try {
    const product = await Product.findByIdAndUpdate(id, newData, { new: true });
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteProduct(id) {
  try {
    const product = await Product.findByIdAndDelete(id);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}


app.post("/products", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
