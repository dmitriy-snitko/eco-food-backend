import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import * as service from '../services/index.js'
import { sendSuccessRes } from '../helpers/sendSuccessRes.js'

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  const data = await service.findAllCategories()
  sendSuccessRes(res, data)
}

export const getCategoryByUrl = async (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.params
  const data = await service.findCategoryByUrl(category)

  if (!data) return next(createError(404, `Category whith url: '${category}' not found.`))

  sendSuccessRes(res, data)
}
