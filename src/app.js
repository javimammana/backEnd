import express from "express";
import {ProductManager} from "./ProductManager.js";


const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./src/listado.json");

app.get("/products", async (req,res) => {

    const productos = await manager.getProducts();

    const limit = await Number(req.query.limit);
    console.log(limit);

    if (limit) {
        const productosFiltrados = [];
        for (let i = 1; i <= limit; i++) {
            let elemento = productos.find ((prod) => prod.id === i);
            productosFiltrados.push(elemento);
        }
        res.send (productosFiltrados);
        return;
    } 
    res.send (productos);
})

app.get("/products/:id", async (req, res) => {
    console.log (req.params);
    const { id } = req.params;

    const producto = await manager.getProductById(Number(id));

    res.send (producto);
})



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));