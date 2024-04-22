const express = require("express");
const CartRouter = require("./routes/cart.router.js");
const ProductRouter = require("./routes/product.router.js");
const vistasRouter = require("./routes/vistas.router.js");
const engine = require("express-handlebars").engine;
const path = require("path");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/", vistasRouter);

app.listen(PORT, async () => {
  try {
    console.log(`Server runing on Port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
