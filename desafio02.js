const fs = require("fs");

class ProductManager {
    constructor(list) {
        this.list = list;
        try {
            let productos = fs.readFileSync(this.list, "utf-8");
            this.productos = JSON.parse(productos);
        } catch {
            this.productos = [];
        }
    }

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

    validate(elemento) {
        
        const {title, description, price, thumbnail, code, stock} = elemento;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return false;
        }
        return true;
    }
    async addProduct(elemento) {

        const validacion = this.validate(elemento);

        if (!validacion) {
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
                    console.log("Producto creado");

                    const respuesta = await this.saveProduct(this.productos);

                    if (!respuesta) {
                        console.log ("Producto agregado a la base")
                    } else {
                        console.log("Hubo un error agregar el producto a la base");
                    }
            }
        }
    }


    getProducts() {
        console.log(this.productos);
        return this.productos;
    }

    getProductById(id) {
        const product = this.src(id);
        if (!product) {
            return "Not found";
        } {
            console.log (product);
            return product;
        }
    }

    async deleteProduct(id) {

        const product = this.src(id);
        
        if (!product) {
            console.log (`El producto id:${id} no existe`);
        } {
            this.productos.splice(this.productos.indexOf(product), 1);
            console.log ("Se elimina producto");

            const respuesta = await this.saveProduct(this.productos);

            if (!respuesta) {
                console.log ("Producto borrado de la Base")
            } else {
                console.log("Hubo un error al borrar el producto de la base");
            }
        }
    }

    async updateProduct (id, elemento) {

        const product = this.src(id);

        if (!product) {
            console.log (`El producto id:${id} no existe`);
        } {
            const validacion = this.validate(elemento);

            if (!validacion) {
                console.log ("Datos incompleto");
            } {
                const newProduct = {
                    ...elemento,
                    id: id
                }

                this.productos.splice(this.productos.indexOf(product), 1, newProduct);
                console.log ("Producto modificado");

                const respuesta = await this.saveProduct(this.productos);

                if (!respuesta) {
                    console.log ("Producto modificado en la Base")
                } else {
                    console.log("Hubo un error al modificar el producto en la base");
                }
            }
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
        const listado = new ProductManager ("./listado.json");

        listado.addProduct(
            new Product ("Producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
            );

        listado.addProduct(
            new Product ("Producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
            );

        listado.addProduct(
            new Product ("Producto prueba3", "Este es un producto prueba", "Sin imagen", "ghi123", 25)
            );

        listado.addProduct(
            new Product ("Producto prueba3", "Este es un producto prueba", 200, "Sin imagen", "def123", 25)
            );
        
        listado.addProduct(
            new Product ("Producto prueba4", "Este es un producto prueba", 200, "Sin imagen", "def456", 25)
            );

        listado.deleteProduct(2);

        listado.updateProduct(3, 
            new Product ("Producto modificado", "Este es un producto prueba", 200, "Sin imagen", "def456", 25)
            );

            console.log ("Todos los productos del array")
        listado.getProducts();

        console.log ("Solo el producto buscado por ID")
        listado.getProductById(3);

    } catch {
        console.log(`Hubo un error al utilizar fetch: ${error}`);
    }
}

fetchDatos();