import { Router } from "express";

import { ProductManager } from "../manager/ProductManager.js";


const router = Router();
const manager = new ProductManager("./src/data/productos.json");
const productos = manager.getProducts();

router.get ("/", (req, res) => {

    res.render("home", {
        title: "Productos",
        fileCss: "style.css",
        productos
    })
})

router.get ("/realTimeProducts", (req, res) => {
    res.render ("realTimeProducts", {
        title: "Cargar Productos",
        fileCss: "style2.css"
    })
})



export default router;