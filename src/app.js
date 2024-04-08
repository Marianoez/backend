const express = require("express");
const PManager = require("./dao/ProductManager");
const PORT = 3000;

const app = express();

const ProductManager = new PManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working perfectly");
});

app.get("/home", (req, res) => {
  res.send("Working perfectly");
});

app.get("/productos", async (req, res) => {
  try {
    let productos = await ProductManager.getProduct();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

app.get("/productos/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let prod = await ProductManager.getProductById(id);

    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

app.post("/productos", async (req, res) => {
  try {
    let newProduct = ProductManager.addProduct(req.body);

    return res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

app.delete("/productos/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let prodId = ProductManager.delete(id);

    res.status(200).json({ message: `Product ${prodId} deleted` });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

app.listen(PORT, async () => {
  try {
    await ProductManager.recovery();
    console.log(`Server runing on Port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
