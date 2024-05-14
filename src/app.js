const express = require("express");
const CartRouter = require("./routes/cart.router.js");
const ProductRouter = require("./routes/product.router.js");
const { router: vistasRouter } = require("./routes/vistas.router.js");
const engine = require("express-handlebars").engine;
const path = require("path");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

//Contenido estatico
app.use(express.static(path.join(__dirname, "/public")));

//Router
app.use(
  "/api/products",
  (req, res, next) => {
    req.io = io;
    next();
  },
  ProductRouter
);
app.use(
  "/api/carts",
  (req, res, next) => {
    req.io = io;
    next();
  },
  CartRouter
);
app.use(
  "/",
  (req, res, next) => {
    req.io = io;
    next();
  },
  vistasRouter
);

//Server Http
const serverHTTP = app.listen(PORT, () =>
  console.log(`Server online en puerto ${PORT}`)
);

//Server Websocket
let io = new Server(serverHTTP);

const connDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Mariano:464518@cluster0.9wd9taq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "ecommerce",
      }
    );
    console.log("Db Connected");
  } catch (error) {
    console.log("Error al conectar a la DB", error.message);
  }
};
connDB();
