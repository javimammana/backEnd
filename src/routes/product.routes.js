import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";

//FileSystem// import { ProductManager, Product } from "../manager/ProductManager.js";
//FileSystem// import { validateProd } from "../utils/validate.js";

const router = Router();

router.get("/", async (req, res) => {
    const { query, page, limit, sort } = req.query;

    const productos = await productsDao.getProductPaginate(limit, page, query, sort);
    
    // console.log(productos);

    const pages = []

    if (productos.totalPages != 1) {
        for (let i = 1; i <= productos.totalPages; i++) {
            pages.push({page: i, limit: limit, filtro: query, sort: sort, pageNow: i == productos.page ? true : false });
        }
    }

    const productosPage = {
        // status:,
        payload: productos.totalDocs,
        totalPages: productos.totalPages,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        page: productos.page,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevLink: productos.hasPrevPage ? `/api/products?page=${productos.prevPage}&&limit={{productos.limit}}&query={{query}}&sort={{sort}}` : null,
        nextLink: productos.hasNextPage ? `/api/products?page=${productos.nextPage}&&limit={{productos.limit}}&query={{query}}&sort={{sort}}` : null,
    };

    console.log(productosPage)
    // console.log(pages)
    // res.json(productos)
    res.render("products", {
        title: "Productos",
        fileCss: "style.css",
        productos,
        pages,
        sort,
        query,
    });
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsDao.getProductById(id);

        if (!product) return res.json({ message: "El producto no existe" });

        res.json({
            product,
            message: "Producto existente",
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: `Error al leer el producto ${id}`,
            e,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const prod = req.body;
        const product = await productsDao.createProduct(prod);
        res.json({
            product,
            message: "Producto creado",
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al crear producto",
            e,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await productsDao.updateProduct(id, req.body);

        // const product = await productsDao.getProductById(id);

        res.json({
            // product,
            message: `Producto ${id} modificado`,
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al modificar Producto",
            e,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productsDao.deleteProduct(id);

        res.json({
            product,
            message: "Producto eliminado",
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error al eliminar Producto",
            e,
        });
    }
});

//------FILE SYSTEM-------//

//filesystem// const manager = new ProductManager("./src/data/productos.json");

// router.get("/", async (req, res) => {
//     const productos = manager.getProducts();

//     const limit = await Number(req.query.limit);
//     console.log(limit);

//     if (limit) {
//         const productosFiltrados = productos.slice(0, limit);
//         res.send(productosFiltrados);
//         return;
//     }
//     res.json(productos);
// });

// router.get("/:pid", async (req, res) => {
//     console.log(req.params);
//     const { pid } = req.params;

//     const producto = await manager.getProductById(Number(pid));

//     res.send(producto);
// });

// router.post("/", validateProd, async (req, res) => {
//     const { title, description, price, code, stock, category } = req.body;
//     const producto = new Product(
//         title,
//         description,
//         price,
//         code,
//         stock,
//         category
//     );

//     try {
//         const addProduct = await manager.addProduct(producto);
//         if (addProduct?.error) {
//             return res.status(409).json({ error: addProduct.error });
//         }

//         res.json({
//             message: "Producto Creado",
//             producto,
//         });
//     } catch (e) {
//         res.status(500).json({
//             error: e.message,
//         });
//     }
// });

// router.put("/:pid", validateProd, async (req, res) => {
//     console.log(req.params);
//     const { pid } = req.params;

//     const { title, description, price, code, stock, category } = req.body;
//     const producto = new Product(
//         title,
//         description,
//         price,
//         code,
//         stock,
//         category
//     );

//     try {
//         const upDateProduct = await manager.updateProduct(
//             Number(pid),
//             producto
//         );

//         if (upDateProduct?.error) {
//             return res.status(409).json({ error: upDateProduct.error });
//         }
//         res.json({
//             message: "Producto Actualizado",
//             producto,
//         });
//     } catch (e) {
//         res.status(500).json({
//             error: e.message,
//         });
//     }
// });

// router.delete("/:pid", async (req, res) => {
//     console.log(req.params);
//     const { pid } = req.params;

//     try {
//         const deleteProduct = await manager.deleteProduct(Number(pid));

//         if (deleteProduct?.error) {
//             return res.status(409).json({ error: deleteProduct.error });
//         }
//         res.json({
//             message: "Producto eliminado",
//         });
//     } catch (e) {
//         res.status(500).json({
//             error: e.message,
//         });
//     }
// });

export default router;
