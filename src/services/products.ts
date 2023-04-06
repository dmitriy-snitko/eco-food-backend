import { Products } from '../models/products.js'

export const findAllProducts = async () => {
  return Products.find({})
}

export const findProductsByCategory = async (category: string) => {
  return Products.find({ categories: category })
}

export const findOneProduct = async (category: string, product: string) => {
  return Products.findOne({
    categories: category,
    url: product,
  })
}
