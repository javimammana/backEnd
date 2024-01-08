import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";
import cartsDao from "../daos/dbManager/carts.dao.js";
import chatDao from "../daos/dbManager/chat.dao.js";

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
        fileCss: "managerStyle.css",
    });
});

router.get("/products", async (req, res) => {

    const { query, page, limit, sort } = req.query;

    const productos = await productsDao.getProductPaginate(limit, page, query, sort);
    // console.log(productos);
    

    console.log(productos)

    const pages = []

    if (productos.totalPages != 1) {
        for (let i = 1; i <= productos.totalPages; i++) {
            pages.push({page: i, limit: limit, filtro: query, sort: sort, pageNow: i == productos.page ? true : false });
        }
    }

    res.render("products", {
        title: "Productos",
        fileCss: "style.css",
        productos,
        pages,
        sort,
        query,
    });
})

router.get("/cart/:id", async (req, res) => {
    const { id } = req.params;

    const cart = await cartsDao.getCartById(id);

    res.render("cart", {
        title: "Carrito",
        fileCss: "cardStyle.css",
        cart,
    });
})

router.get ("/messages", async (req, res) => {
    try {
        const chats = await chatDao.getAllMessages();
        // console.log(chats);
        res.render("chat", {
            title: "CHAT",
            fileCss: "chatStyle.css",
            chats,
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al leer Mensajes",
            e,
        });
    }
})

export default router;
