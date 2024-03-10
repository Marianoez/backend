let Idrequerido = 0;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Por favor, ingrese el ID del producto: ", (ids) => {
  // Llamar a la función getProductById con el valor ingresado por el usuario
  Idrequerido = ids;

  // Aquí puedes hacer lo que necesites con el valor ingresado
  console.log("El ID del producto ingresado es:", Idrequerido);

  rl.close();
});
