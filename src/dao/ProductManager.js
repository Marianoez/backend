const fs = require("fs");
const { encode } = require("punycode");
const { config } = require("process");

class ProductManager {
  products;
  static productId = 0;

  constructor() {
    this.products = [];
    this.path = "../data/newProduct.json";
  }

  async recovery() {
    try {
      const data = await fs.promises.readFile(this.path, {
        encoding: "utf-8",
      });

      this.products = JSON.parse(data);

      ProductManager.productId = this.products.length;

      //console.log("ESTE ES MI PRODUCTID ACTUAL: ", ProductManager.productId);
    } catch (err) {
      throw new Error(`Error al recuperar los productos: ${err.message}`);
    }
  }

  //crear archivo con los nuevos productos.
  // TODO : Cambiar a asincronia
  saveFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products), {
      encoding: "utf8",
    });
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    //Inicializamos producId en +1 y hacemos que sea autoincrementable.
    ProductManager.productId = ProductManager.productId + 1;
    //Le damos el valor de productId al ID de nuestro Nuevo Producto.
    const id = ProductManager.productId;

    //Validamos que todos los campos sean provistos.
    if (!title || !description || !price || !thumbnail || !code || !stock)
      throw new Error("Alguno de los parametros no fueron asignados.");

    //Validamos que el code no se repita.
    const repiteCode = this.products.some((p) => p.code == code);

    if (repiteCode)
      throw new Error(
        "Codigo existente en otro producto, ingrese un codigo distinto por favor."
      );

    //Inicializamos el nuevo producto.
    const newProduct = {
      id: ProductManager.productId + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);

    this.saveFile();

    return newProduct;
  }

  //Mostramos los productos agregados.
  async getProduct() {
    return this.products;
  }

  async getProductById(id) {
    const productId = this.products.find((e) => e.id == id);
    if (productId) {
      return productId;
    } else {
      throw new Error(
        `El id ${id} no coincide con ningun producto de la base de datos.`
      );
    }
  }

  //Un metodo extra para probar.
  getNameById(i) {
    const name = this.products.find((e) => e.id == i);
    if (name) {
      console.log(name);
      const nameF = name.title;
      console.log(nameF);
    }
  }

  delete(id) {
    const productIndex = this.products.findIndex((e) => e.id == id);

    if (productIndex === -1)
      throw new Error(`El ID ${id} no corresponde a ningun producto.`);

    this.products.splice([productIndex], 1);

    this.saveFile();

    return id;
  }
}

module.exports = ProductManager;
