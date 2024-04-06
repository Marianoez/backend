const express = require("express");
const PManager = require("./dao/ProductManager");
const PORT = 3000;

const app = express();

const ProductManager = new PManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working perfectly");
});

app.get("/home", (req, res) => {
  res.send("Working perfectly");
});

app.get("/productos", async (req, res) => {
  await ProductManager.recovery();
  let productos = await ProductManager.getProduct();
  res.json(productos);
});

app.get("/productos/:id", async (req, res) => {
  await ProductManager.recovery();
  let id = req.params.id;
  let prod = await ProductManager.getProductById(id);
  console.log(prod);

  res.json(prod);
});

/* app.post("/productos", async (req, res) => {
  try {
    let newProduct = await ProductManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    res.setHeader("Content-Type", "aplication/json");
    return res.status(200).json(newProduct);
  } catch (error) {
    res.setHeader("Content-Type", "aplication/json");
    return res.status(500).json({
      error: "Error en el servidor",
    });
  }
}); */

app.listen(PORT, () => {
  console.log(`Server runing on Port ${PORT}`);
});
