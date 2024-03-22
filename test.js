const ProductManager = require("./ProductManager");

//Pruebas con productos

const p1 = new ProductManager();

async function exe() {
  await p1.recovery();
  await p1.addProduct(
    "Placa de video",
    "Placa de video RTX 4090",
    2500,
    "www.gmail.com",
    "d112449",
    15
  );
  await p1.getProduct();
  // ------> Borramos producto con ID Requerida.
  await p1.delete();
  // -------> Update a producto 2 o el que se desee y se lo sobreescribe en archivo.
  // -------> (Si se pone Id incorrecto error, si se pide cambiar ID error.)
  // -------> Update no tiene la opcion saveFile(), para no romper el archivo con las pruebas, una vez aprobado se lo habilito.
  await p1.updateProduct(3, {
    title: "Hotwheel....................................",
    price: 5000000000000000000000000000000000000000,
    thumbnail: "www.youtube.com///////////////////////////////////",
    stock: 2,
  });
  await p1.getProduct();
  await p1.resetDb();
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
