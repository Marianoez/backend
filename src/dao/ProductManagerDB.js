const fs = require("fs");
const productsModel = require("./models/productsModel.js");

class ProductManagerDB {
  async getProduct() {
    return await productsModel.find().lean();
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
  async productUpdate(id, product) {
    return await productsModel.findByIdAndUpdate(id, product, {
      runValidators: true,
    });
  }
}

module.exports = ProductManagerDB;
