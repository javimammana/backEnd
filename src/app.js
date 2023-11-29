import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewRouter from "./routes/view.routes.js";


const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const socketServer = new Server(httpServer);

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

//socket comunication


socketServer.on("connection", (socketClient) => {
    console.log ("Nuevo cliente conectado");
})


