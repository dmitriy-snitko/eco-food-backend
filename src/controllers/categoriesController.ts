import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import * as service from '../services/categoriesServices.js'
import sendSuccessRes from '../helpers/sendSuccessRes.js'

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  const data = await service.findAll()
  sendSuccessRes(res, data)
}

export const getCategoryByUrl = async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.params
  const data = await service.findByUrl(url)

  if (!data) return next(createError(404, `Category whith url: '${url}' not found.`))

  sendSuccessRes(res, data)
}
