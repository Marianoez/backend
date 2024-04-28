const socket = io();

let productlist = document.getElementById("products");
console.log(productlist);

socket.on("NewProduct", (product) => {
  productlist.innerHTML += `<li>${product.title}</li>`;
  console.log(productlist);
});

socket.on("ProductDelete", (product) => {
  productlist.innerHTML = "";
  product.forEach((p) => {
    productlist.innerHTML += `<li>${p.title}</li>`;
    console.log(productlist);
  });
});
