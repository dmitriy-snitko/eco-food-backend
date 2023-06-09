import { Request, Response } from 'express'
import * as service from '../services/index.js'
import { sendSuccessRes, getFilter, ctrlWrapper, HttpError } from '../helpers/index.js'

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

  const {
    page = 1,
    limit = 20,
    price,
    brand,
    country,
    form,
    availability,
    delivery,
    sortBy = 'relevancy',
  }: {
    price?: string
    brand?: string
    country?: string
    form?: string
    availability?: string
    delivery?: string
    page?: number
    limit?: number
    sortBy?: string
  } = req.query

  const skip = (page - 1) * limit

  const allProductsInCanegory = await service.findAllProductsInCategory(categoryUrl)
  const filterValues = getFilter(allProductsInCanegory)

  try {
    const products = await service.findProductsByCategory(
      categoryUrl,
      skip,
      limit,
      price,
      brand,
      country,
      form,
      availability,
      delivery,
      sortBy,
    )
    sendSuccessRes(res, { products, filter: filterValues })
  } catch (error: any) {
    throw HttpError(400, error.message)
  }
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
