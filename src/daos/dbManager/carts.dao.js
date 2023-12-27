import { cartModel } from "../../models/carts.model.js";


class CartDao {
    async getAllCart() {
        return await cartModel.find();
    }

    async getCartById(id) {
        return await cartModel.findById(id).populate("products.product");
    }

    async addCart(cart) {
        return await cartModel.create(cart);
    }

    async upDateCart (cid, cart) {
        return await cartModel.findByIdAndUpdate(cid, cart);
    }

    async deleteCart (id) {
        return await cartModel.findByIdAndDelete(id);
    }

}

export default new CartDao();
