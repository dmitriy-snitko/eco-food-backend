import { Product } from '../models/product.js'

export const findAllProducts = async (skip?: number, limit?: number) => {
  return await Product.find({}, '-createdAt -updatedAt', { skip, limit })
}

export const findProductsByCategory = async (category: string, skip?: number, limit?: number) => {
  return await Product.find({ categories: category }, '-createdAt -updatedAt', { skip, limit })
}

export const findOneProduct = async (product: string) => {
  return await Product.findOne({ url: product }, '-createdAt -updatedAt')
}
