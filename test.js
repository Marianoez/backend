const ProductManager = require("./ProductManager");

//Pruebas con productos

const p1 = new ProductManager();

async function exe() {
  await p1.recovery();
  await p1.addProduct(
    "Pc Gamer",
    "Pc gamer con monitor y placa de video RTX",
    2000,
    "www.outlook.com.ar",
    "d112444",
    20
  );
  await p1.getProduct();
  await p1.delete(5);
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
