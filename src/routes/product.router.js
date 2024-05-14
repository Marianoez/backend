const ProductManagerDB = require("../dao/ProductManagerDB.js");
const Router = require("express").Router;
const router = Router();
const path = require("path");

const productManager = new ProductManagerDB();

router.get("/", async (req, res) => {
  try {
    let products = await productManager.getProduct();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let product = await productManager.getProductBy({ _id: id });
    res.json({ product });
  } catch (error) {
    res.status(400).json({
      error: error.message || "Error en el servidor",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category ||
      !thumbnails
    ) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: "Faltan ingresar datos" });
    }

    let exist;
    exist = await productManager.getProductBy({ code });
    if (exist) {
      return res.status(500).json({
        error: `El producto con el codigo ${code} ya existe`,
      });
    }

    try {
      await productManager.addProduct({ ...req.body });
      let updatedList = await productManager.getProduct();
      req.io.emit("NewProduct", updatedList);
      return res.json({ payload: `Product Added` });
    } catch (error) {
      res.status(300).json({ error: "Error al crear el producto." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let existe = await productManager.getProductBy({ _id: id });
    if (existe) {
      let productDeleted = await productManager.deleteProduct({ _id: id });
      let updatedList = await productManager.getProduct();
      req.io.emit("ProductDelete", updatedList);
      res.status(200).json({ message: `Product ${{ existe }} deleted` });
    } else {
      res.status(500).json({
        error: `El producto con ID: ${id} No existe`,
      });
    }
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

module.exports = router;
