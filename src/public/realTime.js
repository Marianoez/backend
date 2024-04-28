const socket = io();

let productlist = document.getElementById("products");

socket.on("NewProduct", (product) => {
  productlist.innerHTML += `<li>${product.title}</li>`;
});

socket.on("ProductDelete", (product) => {
  productlist.innerHTML = "";
  product.forEach((p) => {
    productlist.innerHTML += `<li>${p.title}</li>`;
  });
});
