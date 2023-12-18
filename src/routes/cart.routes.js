//import { CartManager } from "../manager/CartManager.js";
// import { ProductManager } from "../manager/ProductManager.js";
import { Router } from "express";
import cartsDao from "../daos/dbManager/carts.dao.js";
// import productsDao from "../daos/dbManager/products.dao.js";

const router = Router();

router.get ("/", async (req, res) => {
    try {
        const carts = await cartsDao.getAllCart();
        console.log(carts);
        res.json(carts);
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al leer carritos",
            e,
        });
    }
})

router.get ("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const carts = await cartsDao.getCartById(id);
        console.log(carts);
        res.json(carts);
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al leer carrito",
            e,
        });
    }
})


//Agregar producto a Carrito, bajo analisis aun.-

// router.put ("/:cid/product/:pid", async (req, res) => {
//     try{
//         const { cid } = req.params;
//         const { pid } = req.params;
//         const cart = await cartsDao.getCartById(cid);
//         console.log (cart);
//         const prod = await productsDao.getProductById(pid);
//         const prodId = prod._id;
//         console.log(prodId);

//         cartsDao.addItemToCart(cid, prodId)

//         res.json({
//             message: "producto agregado a carrito"
//         })

//     } catch (e) {
//         console.log (e);
//         res.json({
//             message: "Error al agregar producto al carrito",
//             e,
//         })

//     }
// })

router.post ("/", async (req, res) => {
    try {
        const cart = await cartsDao.addCart();
        res.json(cart);
    } catch (e) {
        console.log(e);
        res.json ({
            message: "Error al crear carrito",
            e,
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await cartsDao.deleteCart(id);
        res.json({
            cart,
            message: "Carrito eliminado",
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al eliminar Carrito",
            e,
        });
    }
});


//------FILE SYSTEM-------//

//FileSystem// const manager = new CartManager("./src/data/carrito.json");

// router.post("/", async (req, res) => {
//     try {
//         await manager.addCart();
//         res.json({
//         message: "Carrito creado",
//         });
//     } catch (e) {
//         res.json({
//         error: e.message,
//         });
//     }
// });

// router.get("/:cid", (req, res) => {
//     console.log(req.params);
//     const { cid } = req.params;
//     const prodInCart = manager.getCartById(Number(cid));

//     res.json(prodInCart);
// });

// router.post("/:cid/product/:pid", async (req, res) => {
//     const { cid, pid } = req.params;

//     try {
//         const addProdCart = await manager.addProductInCart(
//         Number(cid),
//         Number(pid)
//         );

//         if (addProdCart?.error) {
//         return res.status(409).json({ error: addProdCart.error });
//         }
//         res.json({
//         message: "Producto Agregado a Carrito",
//         });
//     } catch (e) {
//         res.status(500).json({
//         error: e.message,
//         });
//     }
// });

// router.delete("/:cid", async (req, res) => {
//     const { cid } = req.params;

//     try {
//         const deleteCart = await manager.deleteCart(Number(cid));

//         if (deleteCart?.error) {
//         return res.status(409).json({ error: deleteCart.error });
//         }
//         res.json({
//         message: "Carrito eliminado",
//         });
//     } catch (e) {
//         res.status(500).json({
//         error: e.message,
//         });
//     }
// });

// router.delete("/:cid/product/:pid", async (req, res) => {
//     const { cid, pid } = req.params;

//     try {
//         const deleteItem = await manager.deleteItem(Number(cid), Number(pid));
//         if (deleteItem?.error) {
//         return res.status(409).json({ error: deleteItem.error });
//         }

//         res.json({
//         message: "Carrito eliminado",
//         });
//     } catch (e) {
//         res.status(500).json({
//         error: e.message,
//         });
//     }
// });

export default router;
