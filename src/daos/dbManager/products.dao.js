import { productModel } from "../../models/products.model.js";

class ProductDao {
  async getAllProducts() {
    return await productModel.find();
  }

  async getProductPaginate (limit, page, query, sort) {
    const filtro = query ? {category: query} : {};
    const orden = sort ? {price: Number(sort)} : {} ;
    return await productModel.paginate(filtro, {limit: limit || 10, page: page || 1 , sort: orden} )
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async createProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product);
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default new ProductDao();
