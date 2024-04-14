const express = require("express");
const PManager = require("./dao/ProductManager");
const CartManager = require("./dao/CartManager");
const PORT = 3000;

const app = express();

const ProductManager = new PManager();

const CManager = new CartManager();

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

//Andando GetCarts
app.get("/api/carts", async (req, res) => {
  try {
    let carts = await CManager.getCart();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
  /* return res.json(carts); */
});

//Andando getCartById
app.get("/api/carts/:cid", async (req, res) => {
  try {
    await CManager.getCart();
    let { cid } = req.params;
    cartd = await CManager.getCartProductsById(parseInt(cid));
    console.log(cartd);
    return res.json(cartd);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
      error: `Error inesperado en el servidor.`,
    });
  }
});

//Andando CreateCarts
app.post("/api/carts", async (req, res) => {
  try {
    await CManager.getCart();
    let nCart = await CManager.createCart();
    return res.json(nCart);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
      error: `Error inesperado en el servidor.`,
    });
  }
});

app.post("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    //await CManager.getCart();
    let cid = Number(req.params.cid);
    let pid = Number(req.params.pid);
    console.log("entro");
    console.log(typeof cid);
    console.log(typeof pid);
    let product = await CManager.addToCart(cid, pid);
    res.json(product);
  } catch (error) {
    res.status(300).json({ error: `Error al cargar productos al cart. ` });
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
