const express = require("express");
const PManager = require("./dao/ProductManager");
const CartManager = require("./dao/CartManager");
const PORT = 3000;
const CartRouter = require("./routes/cart.router.js");
const ProductRouter = require("./routes/product.router.js");

const app = express();

const ProductManager = new PManager();

const CManager = new CartManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/api/carts", CartRouter);
app.use("/api/productos", ProductRouter);
app.use("/api/carts", CartRouter);

app.listen(PORT, async () => {
  try {
    await ProductManager.recovery();
    console.log(`Server runing on Port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
