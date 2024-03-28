const express = require("express");
const PManager = require("./classes/ProductManager");
const PORT = 3000;

const app = express();

const ProductManager = new PManager();

app.get("/", (req, res) => {
  res.send("Working perfectly");
  /* res.status(200).send("Working well"); */
});

app.get("/productos", async (req, res) => {
  await ProductManager.recovery(
    "C:UsersMarianodesktop\backend\test-1data\newProduct.json"
  );
  let productos = await ProductManager.getProduct();
  console.log("sdsdsdsdsdsddddddddddd");
  res.json(productos);
});

app.listen(PORT, () => {
  console.log(`Server runing on Port ${PORT} `);
});
