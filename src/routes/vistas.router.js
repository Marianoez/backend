const Router = require("express").Router;
const router = Router();
const ProductManager = require("../dao/ProductManager");
const path = require("path");
const routeProd = path.join(__dirname, "../data/products.json");

const vistasEnviroment = async () => {
  const productManager = new ProductManager(routeProd);

  router.get("/", async (req, res) => {
    await productManager.recovery();
    try {
      let productos = await productManager.getProduct();
      res.status(200).render("home", { productos, pageTitle: "Home" });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });

  //Show Products in /realTimeProducts
  router.get("/realTimeProducts", async (req, res) => {
    //const productManager = new ProductManager(routeProd);
    await productManager.recovery();

    try {
      let productos = await productManager.getProduct();
      res
        .status(200)
        .render("realTimeProducts", { productos, pageTitle: "Home" });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });
  // New Product
  router.post("/realTimeProducts", async (req, res) => {
    try {
      await productManager.recovery();
      let newProduct = productManager.addProduct(req.body);
      let newp = productManager.getProduct();
      req.io.emit("NewProduct", newp);

      return res.json({ payload: `Product Added` });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });

  //Delete Product
  router.delete("/realTimeProducts/:id", async (req, res) => {
    try {
      await productManager.recovery();
      let { id } = req.params;
      let prodId = productManager.delete(id);
      const products = productManager.getProduct();
      req.io.emit("ProductDelete", products);

      res.status(200).json({ message: `Product ${prodId} deleted` });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });
};
vistasEnviroment();

module.exports = { router };
