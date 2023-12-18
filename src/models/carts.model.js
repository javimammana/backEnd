import { Schema, model } from "mongoose";

const cartSchema = new Schema ({
    products: { type: Array }
});

// const itemSchema = new Schema ({
//     product: { type: String },
//     quantity: { type: Number }
// })

const cartModel = model("cart", cartSchema);
// const itemModel = model("item", itemSchema);

export { cartModel };