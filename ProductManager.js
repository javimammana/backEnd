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
    
    src = id => this.productos.find(prod => prod.id === id);

    async saveProduct (productos) {
        try {
            await fs.promises.writeFile (
                this.list,
                JSON.stringify(productos, null, "\t")
            )
            console.log ("Se agrega producto");
        } catch (error) {
                console.log (`Hubo un error al agregar producto. Error: ${error}`);
        }
    }

    validate(elemento) {
        const {title, description, price, thumbnail, code, stock} = elemento;
        return (!title || !description || !price || !thumbnail || !code || !stock) ? false : true;
    }

    async addProduct(elemento) {

        const validacion = this.validate(elemento);

        if (validacion) {
            const product = this.productos.some(prod => prod.code === elemento.code);
            
            if (!product) {
                const newProduct = await {
                        ...elemento,
                        id: this.productos.length + 1
                    }
                    this.productos.push(newProduct);
                    console.log("Producto creado");

                    const respuesta = await this.saveProduct(this.productos);
                    return !respuesta 
                    ? console.log ("Producto agregado a la base") 
                    : console.log("Hubo un error agregar el producto a la base");
                } 
                console.log ("Producto existente");
        }
        console.log ("Datos incompletos");
    }

    getProducts = () => console.log(this.productos);

    async deleteProduct(id) {

        const product = this.src(id);

        if (product) {
            await this.productos.splice(this.productos.indexOf(product), 1);
            console.log ("Se elimina producto");

            const respuesta = await this.saveProduct(this.productos);
            return !respuesta
            ? console.log ("Producto borrado de la Base")
            : console.log("Hubo un error al borrar el producto de la base");
        }
        console.log (`El producto id:${id} no existe para ser eliminado`);
    }

    async updateProduct (id, elemento) {

        const product = this.src(id);

        if (product) {

            const productCode = this.productos.some(prod => prod.code === elemento.code);
                
            if (!productCode) {
                
                const validacion = this.validate(elemento);

                if (validacion) {
                    const newProduct = {
                        ...elemento,
                        id: id
                    }

                    this.productos.splice(this.productos.indexOf(product), 1, newProduct);
                    console.log ("Producto modificado");

                    const respuesta = await this.saveProduct(this.productos);
                    return !respuesta
                    ? console.log ("Producto modificado en la Base")
                    : console.log("Hubo un error al modificar el producto en la base");
                }
                console.log ("Datos incompleto");
            }
            console.log ("Producto existente");
        }
        console.log (`El producto id:${id} no existe para ser modificado`);
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

        await listado.getProducts();

        await listado.addProduct(
            new Product ("Producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
            );

        await listado.getProducts();

        await listado.addProduct(
            new Product ("Producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
            );
        
        await listado.addProduct(
            new Product ("Producto prueba3", "Este es un producto prueba", "Sin imagen", "abc456", 25)
            );

        await listado.addProduct(
            new Product ("Producto prueba4", "Este es un producto prueba", 200, "Sin imagen", "abc456", 25)
            );

        await listado.addProduct(
            new Product ("Producto prueba5", "Este es un producto prueba", 200, "Sin imagen", "def456", 25)
            );

        await listado.getProducts();

        await listado.getProductById(2);
        await listado.getProductById(8);

        await listado.updateProduct(3,
            new Product ("Producto modificado", "Este producto de modifico", 200, "Sin imagen", "abc123", 25)
            );

        await listado.getProducts();

        await listado.updateProduct(3,
            new Product ("Producto modificado", "Este producto de modifico", 200, "Sin imagen", "xyz123", 25)
            );

        await listado.updateProduct(9,
            new Product ("Producto modificado", "Este producto de modifico", 200, "Sin imagen", "xyz987", 25)
            );

        await listado.getProducts();
        
        await listado.deleteProduct(2);

        await listado.getProducts();

        await listado.deleteProduct(7);

    } catch {
        console.log(`Hubo un error al utilizar fetch: ${error}`);
    }
}

fetchDatos();