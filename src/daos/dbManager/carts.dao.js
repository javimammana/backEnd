import { cartModel } from "../../models/carts.model.js";


class CartDao {
    async getAllCart() {
        return await cartModel.find();
    }

    async getCartById(id) {
        return await cartModel.findById(id);
    }

    async addCart(cart) {
        return await cartModel.create(cart);
    }

    async deleteCart (id) {
        return await cartModel.findByIdAndDelete(id);
    }

}


export default new CartDao();
