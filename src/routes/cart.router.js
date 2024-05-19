const { isValidObjectId } = require("mongoose");
const CartManganagerDB = require("../dao/CartManagerDB.js");
const Router = require("express").Router;
const router = Router();

const cartManager = new CartManganagerDB();

//getCarts
router.get("/", async (req, res) => {
  try {
    let getAllCarts = await cartManager.getCarts();
    res.json({ getAllCarts });
  } catch (error) {
    res.status(500).json({ error: `error getting carts: ${error.message}` });
  }
});

//createCarts
router.post("/", async (req, res) => {
  try {
    await cartManager.createCart();
    res.json({
      payload: `Cart successfully created.`,
    });
  } catch (error) {
    res.status(500).json({ error: "error, cart not created" });
  }
});

//getCartsByID
router.get("/:cid", async (req, res) => {
  let { cid } = req.params;
  if (!isValidObjectId(cid)) {
    return res.status(400).json({
      error: `Enter a valid MongoDB id`,
    });
  }

  try {
    let cartById = await cartManager.getCartById(cid);
    if (!cartById) {
      return res.status(300).json({ error: "Cart not found" });
    } else {
      res.json({ cartById });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `error getting cart ${cid}, ${error.message}` });
  }

  router.post("/:cid/product/:pid", async (req, res) => {
    let { cid, pid } = req.params;

    if (!isValidObjectId(cid, pid)) {
      return res.status(400).json({
        error: `Enter a valid MongoDB id`,
      });
    }

    if (!cid || !pid) {
      return res.status(300).json({ error: "Check unfilled fields" });
    }

    try {
      await cartManager.addProducts(cid, pid);
      let cartUpdated = await cartManager.getCartById(cid);
      res.json({ payload: cartUpdated });
    } catch (error) {
      res
        .status(500)
        .json({ error: `error when adding product ${pid} to cart ${cid}` });
    }
  });
});

//addProduct
router.post("/:cid/product/:pid", async (req, res) => {
  let { cid, pid } = req.params;

  if (!isValidObjectId(cid, pid)) {
    return res.status(400).json({
      error: `Enter a valid MongoDB id`,
    });
  }

  if (!cid || !pid) {
    return res.status(300).json({ error: "Check unfilled fields" });
  }

  try {
    await cartManager.addProducts(cid, pid);
    let cartUpdated = await cartManager.getCartById(cid);
    res.json({ payload: cartUpdated });
  } catch (error) {
    res
      .status(500)
      .json({ error: `error when adding product ${pid} to cart ${cid}` });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  let { cid, pid } = req.params;
  if (!isValidObjectId(cid)) {
    return res.status(400).json({
      error: `Enter a valid MongoDB id`,
    });
  }

  if (!cid || !pid) {
    return res.status(300).json({ error: "Check unfilled fields" });
  }

  try {
    await cartManager.deleteProduct(cid, pid);
    return res.json({ payload: `Product ${pid} deleted from cart ${cid}` });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
});

//UpdateCartProducts
router.put("/:cid/product/:pid", async (req, res) => {
  let { cid, pid } = req.params;
  let { quantity } = req.body;
  if (!isValidObjectId(cid)) {
    return res.status(400).json({
      error: `Enter a valid MongoDB id`,
    });
  }

  if (!cid || !pid) {
    return res.status(300).json({ error: "Check unfilled fields" });
  }

  try {
    await cartManager.updateCartProducts(cid, pid, quantity);
    res.json({ payload: `Product ${pid} updated` });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
});

//deleteAllProducts
router.delete("/:cid", async (req, res) => {
  let { cid } = req.params;
  if (!isValidObjectId(cid)) {
    return res.status(400).json({
      error: `Enter a valid MongoDB id`,
    });
  }

  if (!cid) {
    return res.status(300).json({ error: "Check unfilled fields" });
  }

  try {
    await cartManager.deleteAllProducts(cid);
    res.json({ payload: `Products deleted from cart ${cid}` });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
});

//updateCart
router.put("/:cid", async (req, res) => {
  let { cid } = req.params;
  let toUpdate = req.body;
  if (!isValidObjectId(cid)) {
    return res.status(400).json({
      error: `Enter a valid MongoDB id`,
    });
  }

  if (!cid) {
    return res.status(400).json({ error: "Cart ID is missing" });
  }

  if (!toUpdate.product || !toUpdate.quantity) {
    return res.status(400).json({ error: "Invalid Cart" });
  }

  try {
    await cartManager.updateCart(cid, toUpdate);
    res.json({ payload: `Cart ${cid} updated` });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
});

module.exports = router;
