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

  createCart(cart = {}) {
    this.getCart();

    let id = 1;

    if (this.carts.length > 0) {
      id = Math.max(...this.carts.map((d) => d.id)) + 1;
    }
    console.log(id);

    const newCart = {
      id: id,
      products: [],
    };

    this.carts.push(newCart);

    this.saveFile();
    console.log(newCart);
    return newCart;
  }

  saveFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts), {
      encoding: "utf8",
    });
  }

  async addtoCart(id, cartId) {
    //Validamos que todos los campos sean provistos.
    if (!product || !quantity)
      throw new Error("Alguno de los parametros no fueron asignados.");

    //Validamos que el code no se repita.
    const repiteCode = this.carts.some((p) => p.code == code);
    let quantity = +1;
    if (repiteCode) {
      quantity = quantity + 1;
    }

    //Inicializamos el nuevo producto.
    const newProduct = {
      id: id,
      quantity: 1,
    };

    this.carts.push(newProduct);

    this.saveFile();

    return newProduct;
  }

  //Mostramos los productos agregados.
  async getCart() {
    try {
      const data = await fs.promises.readFile(this.path, {
        encoding: "utf-8",
      });

      this.carts = JSON.parse(data);

      //console.log("ESTE ES MI cartId ACTUAL: ", CartManager.cartId);
    } catch (err) {
      throw new Error(`Error al recuperar los productos: ${err.message}`);
    }
    return this.carts;
  }

  async getCartById(id) {
    const cartId = this.carts.find((e) => e.id == id);
    //const products = cartId.products.map((e)=> )
    if (cartId) {
      return cartId;
    } else {
      throw new Error(
        `El id ${id} no coincide con ningun Cart de la base de datos.`
      );
    }
  }

  //Listamos productos del carrito con ID correspondiente.
  async getCartProductsById(id) {
    const cartId = this.carts.find((e) => e.id == id);
    //const products = cartId.products.map((e)=> )
    if (cartId) {
      return cartId.products;
    } else {
      throw new Error(
        `El id ${id} no coincide con ningun Cart de la base de datos.`
      );
    }
  }
}

module.exports = CartManager;
