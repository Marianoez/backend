class ProductManager {
  products;
  static productId = 0;

  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //Inicializamos producId en +1 y hacemos que sea autoincrementable.
    ProductManager.productId = ProductManager.productId + 1;
    //Le damos el valor de productId al ID de nuestro Nuevo Producto.
    const id = ProductManager.productId;

    //Validamos que todos los campos sean provistos.
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return "Alguno de los parametros no fueron asignados.";

    //Validamos que el code no se repita.
    const repiteCode = this.products.some((p) => p.code == code);
    if (repiteCode)
      return "Codigo existente en otro producto, ingrese un codigo distinto por favor.";

    //Inicializamos el nuevo producto.
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
  }

  //Mostramos los productos agregados.
  getProduct() {
    console.log(this.products);
  }

  getProductById(i) {
    const pId = this.products.find((e) => e.id == i);
    if (pId) {
      return console.log(pId);
    } else {
      return console.log(
        `El id ${i} no coincide con ningun producto de la base de datos.`
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
}

module.exports = ProductManager;
