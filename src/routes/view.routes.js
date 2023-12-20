import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";

// import { ProductManager } from "../manager/ProductManager.js";

const router = Router();
// const manager = new ProductManager("./src/data/productos.json");


router.get("/", async (req, res) => {
    const productos = await productsDao.getAllProducts();
    // console.log(productos)
    res.render("home", {
        title: "Productos",
        fileCss: "style.css",
        productos,
    });
});

router.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts", {
        title: "Cargar Productos",
        fileCss: "style2.css",
    });
});

export default router;
