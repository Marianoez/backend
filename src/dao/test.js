const CartManager = require("./CartManager");
const ProductManager = require("./ProductManager");

//Pruebas con productos

const p1 = new CartManager();

async function exe() {
  await p1.recovery();
  p1.createCart({ name: "cosas" });
  await p1.recovery();
  await p1.getCart();
}
exe();

//Probamos pidiendole al usuario que ingrese un numero ed ID.

/* let Idrequerido = 0;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Por favor, ingrese el ID del producto que desea buscar: ",
  (ids) => {
    // Llamar a la función getProductById con el valor ingresado por el usuario
    // *********************** Salto de linea ***********************
    console.log("");
    Idrequerido = ids;
    p1.getProductById(Idrequerido);
    rl.close();
  }
); */
