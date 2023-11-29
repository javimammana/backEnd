import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { ProductManager, Product } from "./manager/ProductManager.js";

import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewRouter from "./routes/view.routes.js";
import { validateProd } from "./utils/validate.js";


const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const io = new Server(httpServer);

//Handlebars
app.engine ("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main"
}));
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

const manager = new ProductManager("./src/data/productos.json")

//socket comunication

io.on("connection", (socketClient) => {
    console.log ("Nuevo cliente conectado");

    socketClient.on ("objetForm", async (data) => {
        // console.log (data);
        const product = new Product(data.title, data.description, data.price, data.code, data.stock, data.category);
        // console.log (product);
        const nvoProducto = await manager.addProduct(product);
        console.log(nvoProducto.error);
        io.emit ("listProduct", manager.getProducts());
        socketClient.emit("resultado", nvoProducto.error)
    })

    socketClient.emit("listProduct", manager.getProducts());

    socketClient.on ("deleteOrden", (data) => {
        console.log(data);
        manager.deleteProduct(data);
        io.emit ("listProduct", manager.getProducts());
    })
})


