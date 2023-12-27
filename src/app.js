import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
// import { ProductManager, Product } from "./manager/ProductManager.js";
import mongoose from "mongoose";

import chatDao from "./daos/dbManager/chat.dao.js";
import productsDao from "./daos/dbManager/products.dao.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewRouter from "./routes/view.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
);

const io = new Server(httpServer);

// Mongoose connection
mongoose
    .connect(`mongodb://localhost:27017`)
    .then(() => {
        console.log("DB Connected MONGO");
    })
    .catch((err) => {
        console.log("Hubo un error");
        console.log(err);
    });

//Handlebars

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
app.use("/api/messages", chatRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

// const manager = new ProductManager("./src/data/productos.json");

//socket comunication

io.on("connection", async (socketClient) => {
    console.log("Nuevo cliente conectado");

    //socket productos en tiempos real

    socketClient.on("objetForm", async (data) => {
        const nvoProducto = await productsDao.createProduct(data);
        console.log(nvoProducto); //Como puedo recuperar el mesnaje del res.json?
        io.emit("listProduct", await productsDao.getAllProducts());
        socketClient.emit("resultado", "Producto agregado"); //Aplicar la respuesta para mostrar en pantalla.-
    });

    socketClient.emit("listProduct", await productsDao.getAllProducts());

    socketClient.on("deleteOrden", async (data) => {
        console.log(data);
        // manager.deleteProduct(data);
        await productsDao.deleteProduct(data);
        io.emit("listProduct", await productsDao.getAllProducts());
    });

    //socket CHAT

    const messages = await chatDao.getAllMessages();
    console.log("Nuevo usuario conectado");

    socketClient.on("message", async (data) => {
        // console.log(data);
        await chatDao.sendMessage(data);
        const messages = await chatDao.getAllMessages();
        io.emit("messages", messages);
    });

    socketClient.on("inicio", async (data) => {
        const messages = await chatDao.getAllMessages();
        io.emit("messages", messages);
        socketClient.broadcast.emit("connected", data);
    });

    socketClient.emit("messages", messages);
});
