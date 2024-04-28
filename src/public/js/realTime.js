const socket = io();

let productlist = document.getElementById("products");

socket.on("NewProduct", (product) => {
  productlist.innerHTML = "";
  product.forEach((p) => {
    productlist.innerHTML += `
    <li>
      <p>${p.title}</p>
      <h5>precio $${p.price}</h5>
      <p>${p.code}</p>
    </li>`;

    console.log(product);
  });
});

socket.on("ProductDelete", (product) => {
  productlist.innerHTML = "";
  product.forEach((p) => {
    productlist.innerHTML += `<li>
      <p>${p.title}</p>
      <h5>precio $${p.price}</h5>
      <p>${p.code}</p>

    </li>`;
    console.log(productlist);
  });
});
