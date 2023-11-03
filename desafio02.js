const fs = require("fs");

class ProductManager {
    constructor(list) {
        this.list = list;
        try {
            let productos = fs.readFileSync(this.list, "utf-8");
            this.productos = JSON.parse(productos);
        } catch {
            this.productos = [];

            console.log (pro)
        }
    }
    //productos = [];

    // validate(elemento) {
        
    //     const {title, description, price, thumbnail, code, stock} = elemento;

    //     if (!title || !description || !price || !thumbnail || !code || !stock) {
    //         return false;
    //     }
    //     return true;
    // }

    src (id) {
        const product = this.productos.find(prod => prod.id === id);
        return product;
    }

    async saveProduct (productos) {
        try {
            await fs.promises.writeFile (
                this.list,
                JSON.stringify(productos, null, "\t")
            )
            console.log ("Se agrega producto");
            console.log (typeof productos);
        } catch (error) {
                console.log (`Hubo un error al agregar producto. Error: ${error}`);
        }
    }
    async addProduct(elemento) {

        const {title, description, price, thumbnail, code, stock} = elemento;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log ("Datos incompletos");
        } else {

            const product = this.productos.some(prod => prod.code === elemento.code);
            
            if (product) {
                console.log ("Producto existente");
                } else {
                    const newProduct = {
                        ...elemento,
                        id: this.productos.length + 1
                    }
                    this.productos.push(newProduct);

                    const respuesta = await this.saveProduct(this.productos);

                    if (!respuesta) {
                        console.log ("Producto agregado")
                    } else {
                        console.log("Hubo un error al crear producto");
                    }
            }
        }
    }


    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        const product = this.src(id);
        if (!product) {
            return "Not found";
        } {
            return product;
        }
    }

    async deleteProduct(id) {

        const product = this.src(id);
        const index = this.productos.findIndex(product);
        console.log (index);

        if (!product) {
            console.log (`El producto id:${id} no existe`);
        } {

            console.log ("Se elimina producto");
            console.log (this.productos);
            //const index = this.productos.findIndex(product);
        //console.log (index);
        // try {
        //     this.productos.splice(index, 1);
        //     await fs.promises.writeFile (
        //         this.list,
        //         JSON.stringify(this.productos, null, "\t")
        //     )} catch(error) {
        //         console.log (`Error al guardar datos despues de eliminar producto. Error: ${error}`);
        //     }
        }
    }
}

class Product {
    constructor (title, description, price, thumbnail, code, stock) {
        this.title  = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

async function fetchDatos () {
    try {
        //const response = await fetch (productos);
        //const data = await response.json();
        const listado = new ProductManager ("./listado.json");

        listado.addProduct(
            new Product ("Producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
            );

        listado.addProduct(
            new Product ("Producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
            );

        listado.addProduct(
            new Product ("Producto prueba3", "Este es un producto prueba", 200, "Sin imagen", "def123", 25)
            );
        
        listado.addProduct(
            new Product ("Producto prueba4", "Este es un producto prueba", 200, "Sin imagen", "def456", 25)
            );

        listado.deleteProduct(2);
        listado.getProducts();

    } catch {
        console.log(`Hubo un error al utilizar fetch: ${error}`);
    }
}


fetchDatos ();
//const listado = new ProductManager();

// console.log (listado.getProducts());

// listado.addProduct(
//     new Product ("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
// );

// listado.addProduct(
//     new Product ("Producto prueba", "Este es un producto prueba", "Sin imagen", "abc123", 25)
// );

// console.log (listado.getProducts());

// listado.addProduct(
//     new Product ("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
// );
// //console.log (listado.getProducts());
// console.log(listado.getProductById(1));
