import express from "express";
import fs from "fs";


const app = express();
const PORT = 8080;


const productosJson = fs.readFileSync("./listado.json", "utf-8");
const productos = JSON.parse (productosJson);

app.get("/products", (req,res) => {

    const limit = Number(req.query.limit);
    console.log(limit);

    if (limit) {
        const productosFiltrados = [];
        for (let i = 1; i <= limit; i++) {
            let elemento = productos.find ((prod) => prod.id === i);
            productosFiltrados.push(elemento);
        }
        res.json (productosFiltrados);
    }
    res.json (productos);
})

app.get("/products/:id", (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const producto = productos.find ((prod) => prod.id === Number(id));

    (producto) ? res.json(producto) : res.json(`El producto ID: ${id}, no existe`);
})



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));