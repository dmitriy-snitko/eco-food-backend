import { Request, Response } from 'express'
import * as service from '../services/index.js'
import { sendSuccessRes } from '../helpers/sendSuccessRes.js'
import { ctrlWrapper } from '../helpers/index.js'
import { HttpError } from '../helpers/index.js'

const getAllCategories = async (req: Request, res: Response) => {
  const data = await service.findAllCategories()
  sendSuccessRes(res, data)
}

const getCategoryByUrl = async (req: Request, res: Response) => {
  const { categoryUrl } = req.params
  const data = await service.findCategoryByUrl(categoryUrl)
  if (!data) {
    throw HttpError(404, `Category whith url: '${categoryUrl}' not found.`)
  }
  sendSuccessRes(res, data)
}

export default {
  getAllCategories: ctrlWrapper(getAllCategories),
  getCategoryByUrl: ctrlWrapper(getCategoryByUrl),
}
