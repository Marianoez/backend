const productManager = require("./ProductManager.js");
const path = require("path");
const routeProd = path.join(__dirname, "../data/products.json");

const i = new productManager();

//Pruebas con productos

const p1 = new productManager(routeProd);

async function exe() {
  await p1.recovery();
  console.log(p1);
  const products = await p1.getProduct();
}
exe();
