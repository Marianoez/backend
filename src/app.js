const express = require("express");
const PManager = require("./classes/ProductManager");
const PORT = 3000;

const app = express();

const ProductManager = new PManager();

app.get("/", (req, res) => {
  res.send("Working perfectly");
});

app.get("/home", (req, res) => {
  res.send("Working perfectly");
});

app.get("/productos", async (req, res) => {
  await ProductManager.recovery();
  //let productos = await ProductManager.getProduct();
  res.json(productos);
});

app.listen(PORT, () => {
  console.log(`Server runing on Port ${PORT} `);
});
