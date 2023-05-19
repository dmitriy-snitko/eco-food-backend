import { Request, Response } from 'express'
import * as service from '../services/index.js'
import { sendSuccessRes, getFilter } from '../helpers/index.js'
import { ctrlWrapper } from '../helpers/index.js'
import { HttpError } from '../helpers/index.js'

const getAllProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 20 }: { page?: number; limit?: number } = req.query
  const skip = (page - 1) * limit
  const data = await service.findAllProducts(skip, limit)
  sendSuccessRes(res, { products: data, filter: getFilter(data) })
}

const getProductsByCategory = async (req: Request, res: Response) => {
  const { categoryUrl } = req.params
  if (!(await service.findCategoryByUrl(categoryUrl))) {
    throw HttpError(404, `Category whith url: '${categoryUrl}' not found.`)
  }

  const allProductsInCanegory = await service.findProductsByCategory(categoryUrl)
  const filterValues = getFilter(allProductsInCanegory)

  const {
    page = 1,
    limit = 20,
    price,
    brand,
    country,
    form,
    availability,
    delivery
  }: {
    price?: string
    brand?: string
    country?: string
    form?: string
    availability?: string
    delivery?: string
    page?: number
    limit?: number
  } = req.query
  const skip = (page - 1) * limit
  const products = await service.findProductsByCategory(
    categoryUrl,
    price,
    brand,
    country,
    form,
    availability,
    delivery,
    skip,
    limit,
  )
  sendSuccessRes(res, { products, filter: filterValues })
}

const getOneProduct = async (req: Request, res: Response) => {
  const { productUrl } = req.params
  const product = await service.findOneProduct(productUrl)
  if (!product) {
    throw HttpError(404, `Product '${productUrl}' not found.`)
  }
  const reviews = await service.findReviewsByProduct(productUrl)
  sendSuccessRes(res, { product, reviews })
}

export default {
  getAllProducts: ctrlWrapper(getAllProducts),
  getProductsByCategory: ctrlWrapper(getProductsByCategory),
  getOneProduct: ctrlWrapper(getOneProduct),
}
