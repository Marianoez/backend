const socket = io();

let productlist = document.getElementById("products");

socket.on("NewProduct", (product) => {
  productlist.innerHTML += `<li>${product.name}</li>`;
});
