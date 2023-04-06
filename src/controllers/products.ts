import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import * as service from '../services/index.js'
import { sendSuccessRes, getFilter } from '../helpers/index.js'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  const data = await service.findAllProducts()
  sendSuccessRes(res, data)
}

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.params
  if (!(await service.findCategoryByUrl(category)))
    return next(createError(404, `Category whith url: '${category}' not found.`))

  const data = await service.findProductsByCategory(category)
  if (!data.length) return sendSuccessRes(res, data, 200, `Category '${category}' is empty`)

  sendSuccessRes(res, { products: data, filter: getFilter(data) })
}

export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { category, product } = req.params
  if (!(await service.findCategoryByUrl(category)))
    return next(createError(404, `Category whith url: '${category}' not found.`))
  const data = await service.findOneProduct(category, product)
  if (!data) return next(createError(404, `Product '${product}' not found.`))

  sendSuccessRes(res, data)
}
