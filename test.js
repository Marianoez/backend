const ProductManager = require("./ProductManager");

//Pruebas con productos

const p1 = new ProductManager();

p1.addProduct(
  "Play 5",
  "Ultima Playstation 5",
  999,
  "www.google.com.ar",
  "d1123",
  185
);
p1.addProduct(
  "Pc Gamer",
  "Pc gamer con monitor y placa de video RTX",
  2000,
  "www.outlook.com.ar",
  "d1124",
  20
);
p1.addProduct(
  "SEGA",
  "Consola antigua de videojuegos 32bits",
  199,
  "www.youtube.com.ar",
  "d1125",
  10
);

//Mostramos todos los productos del array
p1.getProduct();
// *********************** Salto de linea ***********************
console.log("");
//Mostramos productos por Id
console.log("Producto con ID 2: ");
p1.getProductById(2);
// *********************** Salto de linea ***********************
console.log("");
//Mostramos mensaje de error por Id inexistente.
p1.getProductById(4);
// *********************** Salto de linea ***********************
console.log("");

//Probamos pidiendole al usuario que ingrese un numero ed ID.

let Idrequerido = 0;

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
);
