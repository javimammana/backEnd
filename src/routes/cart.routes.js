//import { CartManager } from "../manager/CartManager.js";
// import { ProductManager } from "../manager/ProductManager.js";
import { Router } from "express";
import cartsDao from "../daos/dbManager/carts.dao.js";
import productsDao from "../daos/dbManager/products.dao.js";

const router = Router();

router.get("/", async (req, res) => {
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
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await cartsDao.getCartById(id);
        console.log("Buscado ok");
        res.json(cart);

        // res.render("cart", {
        //     title: "Carrito",
        //     fileCss: "cardStyle.css",
        //     cart,
        // });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al leer carrito",
            e,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const cart = await cartsDao.addCart();
        res.json(cart);
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al crear carrito",
            e,
        });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cart = await cartsDao.getCartById(cid);

        const prodSRC = await productsDao.getProductById(pid);

        const exist = cart.products.find(
            (prod) => prod.product._id.toString() === prodSRC._id.toString()
        );

        if (!exist) {
            console.log("No Existe");
            cart.products.push({ product: prodSRC._id, quantity: 1 }),
                console.log(cart.products);
            await cartsDao.upDateCart(cid, cart);
            console.log("agregado");
            res.json({
                message: "producto agregado a carrito",
            });
        } else if (exist.quantity < prodSRC.stock) {
            const addQuantity = {
                product: exist.product,
                quantity: exist.quantity + 1,
            };

            cart.products.splice(cart.products.indexOf(exist), 1, addQuantity);

            await cartsDao.upDateCart(cid, cart);
            console.log("incrementado");

            res.json({
                message: "producto incrementado en carrito",
            });
        } else {
            console.log("maximo de stock");
            res.json({
                message: `Maximo de productos ${prodSRC.stock}`,
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al agregar producto al carrito",
            e,
        });
    }
});

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const listProd = req.body;

        const cart = await cartsDao.getCartById(cid);

        const nvoCart = [];

        for (const prod of listProd) {
            let prodSRC = await productsDao.getProductById(prod.product);
            console.log(prodSRC);

            if (prod.quantity <= prodSRC.stock) {
                nvoCart.push(prod);
            }
            // No agrega producto
            // {console.log("Excede STOCK!")}

            // Agrega producto con stock maximo
            else {
                console.log(
                    `Solo se agregan ${prodSRC.stock} que es el stock maximo`
                );
                nvoCart.push({
                    product: prod.product,
                    quantity: prodSRC.stock,
                });
            }
        }

        cart.products = nvoCart;

        await cartsDao.upDateCart(cid, cart);

        res.json({
            message: "Carrito Actualizado",
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al actualizar Carrito",
            e,
        });
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cant = req.body;
        const cart = await cartsDao.getCartById(cid);
        const prodSRC = await productsDao.getProductById(pid);

        console.log(cant.quantity);

        const exist = cart.products.find(
            (prod) => prod.product._id.toString() === pid
        );

        if (cant.quantity <= prodSRC.stock) {
            const updateQuantity = {
                product: exist.product,
                quantity: cant.quantity,
            };

            cart.products.splice(
                cart.products.indexOf(exist),
                1,
                updateQuantity
            );

            await cartsDao.upDateCart(cid, cart);
            console.log("cantidad modificada");

            res.json({
                message: "Cantidad modificada",
            });
        } else {
            console.log("la cantidad excese al stock");
            res.json({
                message: "La cantidad supera al stock disponible",
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al actualizar cantidad de Producto",
            e,
        });
    }
});

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsDao.getCartById(cid);

        cart.products = [];

        await cartsDao.upDateCart(cid, cart);

        res.json({
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
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cart = await cartsDao.getCartById(cid);

        const exist = cart.products.find(
            (prod) => prod.product._id.toString() === pid
        );

        console.log(exist);

        if (!exist) {
            console.log("no existe producto en carrito");
            res.json({
                message: "El producto no existe en el carrito",
            });
        } else {
            console.log("existe en carrito");
            cart.products.splice(cart.products.indexOf(exist), 1);

            await cartsDao.upDateCart(cid, cart);

            res.json({
                cart,
                message: "Producto eliminado",
            });
        }
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
