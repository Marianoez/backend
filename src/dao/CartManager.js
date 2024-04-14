const fs = require("fs");
const { encode } = require("punycode");
const { config } = require("process");
const ProductManager = require("./ProductManager");
const pManager = new ProductManager();

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

  async addToCart(pid, cid) {
    await this.getCart();
    await pManager.recovery();
    let product = await pManager.getProductById(pid);
    let cart = await this.getCartById(cid);
    let cartfind = this.carts.find((cart) => cart.id === cid);
    let cartValidation = cart.products.some((p) => p.id == product.id);

    console.log("Entro a addToCart");
    console.log(product);
    console.log(typeof cart.products);
    console.log("cartfind", cartfind);
    console.log("cartValidation", cartValidation);
    console.log("newtext");

    //return console.log(`carrito ${cart}`);
    return product;
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
