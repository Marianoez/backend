const fs = require("fs");

class CartManager {
  carts;
  static cartId = 0;

  constructor() {
    this.carts = [];
    this.path = "../data/newCart.json";
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.path, {
        encoding: "utf-8",
      });

      this.carts = JSON.parse(data);

      //ProductManager.productId = this.products.length + 1;

      //console.log("ESTE ES MI PRODUCTID ACTUAL: ", ProductManager.productId);
    } catch (err) {
      throw new Error(`Error al recuperar los productos: ${err.message}`);
    }
  }
}
