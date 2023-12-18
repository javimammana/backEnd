import { Schema, model } from "mongoose";

const productSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: {type: String, 'default': 'sinImagen.png'},
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    // status: "true",
    category: { type: String, required: true },
});

const productModel = model("product", productSchema);

export { productModel };