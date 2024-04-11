const fs = require("fs");
const { encode } = require("punycode");
const { config } = require("process");

class CartManager {
  carts;
  static cartId = 0;

  constructor() {
    this.carts = [];
    this.path = "../data/carts.json";
  }

  createCart() {
    const newCart = {
      id: this.cartId,
      products: [],
    };
    this.carts.push(newCart);
    this.saveFile();

    console.log("ASSSSSSSSSSSSSSSSSSSSS");

    return newCart;
  }

  async recovery() {
    try {
      const data = await fs.promises.readFile(this.path, {
        encoding: "utf-8",
      });

      this.carts = JSON.parse(data);

      CartManager.cartId = this.carts.length + 1;

      //console.log("ESTE ES MI cartId ACTUAL: ", CartManager.cartId);
    } catch (err) {
      throw new Error(`Error al recuperar los productos: ${err.message}`);
    }
  }

  //crear archivo con los nuevos productos.
  // TODO : Cambiar a asincronia
  saveFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts), {
      encoding: "utf8",
    });
  }

  addCart({ title, description, price, thumbnail, code, stock }) {
    //Inicializamos producId en +1 y hacemos que sea autoincrementable.
    CartManager.cartId = CartManager.cartId + 1;
    //Le damos el valor de cartId al ID de nuestro Nuevo Producto.
    const id = CartManager.cartId;

    //Validamos que todos los campos sean provistos.
    if (!title || !description || !price || !thumbnail || !code || !stock)
      throw new Error("Alguno de los parametros no fueron asignados.");

    //Validamos que el code no se repita.
    const repiteCode = this.carts.some((p) => p.code == code);

    if (repiteCode)
      throw new Error(
        "Codigo existente en otro producto, ingrese un codigo distinto por favor."
      );

    //Inicializamos el nuevo producto.
    const newProduct = {
      id: CartManager.cartId + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.carts.push(newProduct);

    this.saveFile();

    return newProduct;
  }

  //Mostramos los productos agregados.
  async getCart() {
    return this.carts;
  }

  async getCartById(id) {
    const cartId = this.carts.find((e) => e.id == id);
    if (cartId) {
      return cartId;
    } else {
      throw new Error(
        `El id ${id} no coincide con ningun producto de la base de datos.`
      );
    }
  }
}

module.exports = CartManager;
