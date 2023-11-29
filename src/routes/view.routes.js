import { Router } from "express";

import { ProductManager } from "../manager/ProductManager.js";


const router = Router();
const manager = new ProductManager("./src/data/productos.json");


router.get ("/", (req, res) => {
    
    const productos = manager.getProducts();

    res.render("home", {
        title: "Productos",
        fileCss: "style.css",
        productos
    })
})



export default router;