class Productos {
  constructor(name, price, brand, stock) {
    this.name = name;
    this.price = price;
    this.brand = brand;
    this.stock = stock;
  }
  iva() {
    const preciototal = this.price * 1.21;
    console.log(`precio lleno: ${preciototal}`);
  }
}

class Pedidos {
  constructor(productname, quantity) {
    this.productname = productname;
    this.quantity = quantity;
  }
}

const p1 = new Productos("Jarra", 55, "Cariel", 12);
console.log(p1);

const showproduct = (produ) => {
  console.log(`${produ.name} ${produ.price} ${produ.brand}`);
};

p1.iva();
