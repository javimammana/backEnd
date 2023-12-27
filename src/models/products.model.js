import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: {type: String, 'default': 'sinImagen.png'},
    code: { type: String, required: true, unique: true, index: true },
    stock: { type: Number, required: true },
    status: {type: String, 'default': 'true'},
    category: { type: String, required: true },
});

productSchema.plugin(mongoosePaginate);

const productModel = model("product", productSchema);

export { productModel };