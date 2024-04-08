const ProductManager = require("./ProductManager");

//Pruebas con productos

const p1 = new ProductManager();

async function exe() {
  await p1.recovery();
  console.log(p1);
  await p1.updateProduct(2, {
    title: "WWWWwsssssss....................................",
    price: 5000,
    thumbnail: "www.youtube.com///////////////////////////////////",
    stock: 2,
  });
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
