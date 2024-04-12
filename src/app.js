const express = require("express");
const PManager = require("./dao/ProductManager");
const CartManager = require("./dao/CartManager.js");
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

app.get("/api/productos", async (req, res) => {
  try {
    let productos = await ProductManager.getProduct();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

app.get("/api/productos/:id", async (req, res) => {
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

app.post("/api/productos", async (req, res) => {
  try {
    let newProduct = ProductManager.addProduct(req.body);

    return res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

app.delete("/api/productos/:id", async (req, res) => {
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

app.put("/api/productos/:pid", async (req, res) => {
  try {
    let { pid } = req.params;
    const p = new PManager();
    await p.recovery();
    const pUpdate = await p.updateProduct(Number(pid), req.body);

    return res.json({ pUpdate });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

app.get("/api/carts", (req, res) => {
  const { cid } = req.params;
  console.log("sadadasdasd");
  return res.json({});
});

app.get("/api/carts/:cid", (req, res) => {
  const { cid } = req.params;
  res.json(cid);
});

app.post("/api/carts", (req, res) => {
  const c = new CartManager();
  c.recovery();
  const cart = c.createCart();
  console.log("algo anda aunque sea");
  return res.json({ cart });
});

app.listen(PORT, async () => {
  try {
    await ProductManager.recovery();
    console.log(`Server runing on Port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
