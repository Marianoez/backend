const CartManager = require("../dao/CartManager");
const Router = require("express").Router;
const router = Router();
const CManager = new CartManager();

//Andando GetCarts -
router.get("/", async (req, res) => {
  try {
    let carts = await CManager.getCart();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error en el servidor",
    });
  }
});

//Andando getCartById -
router.get("/:cid", async (req, res) => {
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
router.post("/", async (req, res) => {
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

//Andando post -
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = Number(req.params.cid);
    let pid = Number(req.params.pid);
    await CManager.addToCart(cid, pid);

    let mostrarCarrito = await CManager.getCartById(cid);

    res.json(mostrarCarrito);
  } catch (error) {
    res.status(300).json({ error: `Error al cargar productos al cart. ` });
  }
});

module.exports = router;
