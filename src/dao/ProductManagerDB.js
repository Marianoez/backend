const fs = require("fs");
const productsModel = require("./models/productsModel.js");

class ProductManagerDB {
  async getProduct() {
    return await productsModel.find();
  }
  async addProduct({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  }) {
    let product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    return await productsModel.create(product);
  }
  async getProductBy(filter) {
    return await productsModel.findOne(filter);
  }
  async deleteProduct(id) {
    return await productsModel.deleteOne(id);
  }
}

module.exports = ProductManagerDB;
