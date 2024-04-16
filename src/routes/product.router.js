const ProductManager = require("../dao/ProductManager.js");
const Router = require("express").Router;
const router = Router();
const PManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    await PManager.recovery();
    let productos = await PManager.getProduct();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await PManager.recovery();
    let { id } = req.params;
    let prod = await PManager.getProductById(id);

    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    await PManager.recovery();
    let newProduct = PManager.addProduct(req.body);

    return res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await PManager.recovery();
    let { id } = req.params;
    let prodId = PManager.delete(id);

    res.status(200).json({ message: `Product ${prodId} deleted` });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    await PManager.recovery();
    let { pid } = req.params;
    const pUpdate = await PManager.updateProduct(Number(pid), req.body);

    return res.json({ pUpdate });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

module.exports = router;
