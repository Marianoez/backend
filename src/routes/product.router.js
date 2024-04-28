const ProductManager = require("../dao/ProductManager.js");
const Router = require("express").Router;
const router = Router();
const path = require("path");
const routeProd = path.join(__dirname, "../data/products.json");

const enviromentExe = async () => {
  const productManager = new ProductManager(routeProd);
  try {
    await productManager.recovery();
  } catch (error) {
    console.log(error.message);
    return;
  }

  router.get("/", async (req, res) => {
    try {
      let productos = await productManager.getProduct();
      /* res.setHeader("content-type", "text/html"); */
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      await productManager.recovery();
      let { id } = req.params;
      let prod = await productManager.getProductById(id);

      res.status(200).json(prod);
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });

  router.post("/", async (req, res) => {
    try {
      await productManager.recovery();
      productManager.addProduct(req.body);

      let newp = productManager.getProduct();
      req.io.emit("NewProduct", newp);

      return res.json({ payload: `Product Added` });

      //return res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });

  router.delete("/:id", async (req, res) => {
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

  router.put("/:pid", async (req, res) => {
    try {
      await productManager.recovery();
      let { pid } = req.params;
      const pUpdate = await productManager.updateProduct(Number(pid), req.body);

      return res.json({ pUpdate });
    } catch (error) {
      res.status(500).json({
        error: error.message || "Error en el servidor",
      });
    }
  });
};

enviromentExe();

module.exports = router;
