class ProductManager {

    productos = [];

    addProduct(elemento) {

        const {title, description, price, thumbnail, code, stock} = elemento;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log ("Datos incompletos");
        } else {

            const product = this.productos.find(prod => prod.code === elemento.code);
            
            if (product) {
                console.log ("Producto existente");
            } else {
                const newProduct = {
                    ...elemento,
                    id: this.productos.length + 1
                }
                this.productos.push(newProduct);
                return "Se agrega producto";
            }
        }

    }

    getProduct() {
        return this.productos;
    }

    getProductById(id) {
        const product = this.productos.find(prod => prod.id === id);
        if (!product) {
            return "Not found";
        } {
            return product;
        }
    }

    // clearProduct() {
    //     this.productos = [];
    // }
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

const listado = new ProductManager();

console.log (listado.getProduct());

listado.addProduct(
    new Product ("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
);

console.log (listado.getProduct());

listado.addProduct(
    new Product ("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
);

console.log(listado.getProductById(1));