const CartManager = require("../dao/CartManager");
const Router = require("express").Router;
const router = Router();
const path = require("path");
const routeCart = path.join(__dirname, "../data/carts.json");

const cartEnviroment = async () => {
  const cartManager = new CartManager(routeCart);
  try {
    await cartManager.getCart();
  } catch (error) {
    console.log(error.message);
    return;
  }

  //Andando GetCarts -
  router.get("/", async (req, res) => {
    try {
      let carts = await cartManager.getCart();
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
      await cartManager.getCart();
      let { cid } = req.params;
      cartd = await cartManager.getCartProductsById(parseInt(cid));
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
      await cartManager.getCart();
      let nCart = await cartManager.createCart();
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
      await cartManager.addToCart(cid, pid);

      let mostrarCarrito = await cartManager.getCartById(cid);

      res.json(mostrarCarrito);
    } catch (error) {
      res.status(300).json({ error: `Error al cargar productos al cart. ` });
    }
  });
};

cartEnviroment();

module.exports = router;
