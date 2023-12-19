import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [{
    product: { type: String },
    quantity: { type: Number, required: true, default: 1 },
    }],
});

const cartModel = model("cart", cartSchema);

export { cartModel };