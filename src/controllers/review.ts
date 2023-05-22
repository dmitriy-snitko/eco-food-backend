import * as services from '../services/index.js'
import { Request, Response } from 'express'
import { HttpError, ctrlWrapper, sendSuccessRes } from '../helpers/index.js'
import { IRequest, IUser } from '../types/index.js'

const addReview = async (req: IRequest, res: Response) => {
  if (!req.user) {
    throw HttpError(401)
  }
  const { _id: owner }: IUser = req.user
  const newReview = await services.createReview({ ...req.body, owner })
  const { product } = newReview
  const reviews = await services.findReviewsByProduct(product)
  
  const sum = reviews.reduce((acc: number, val) => {
    return acc + val.score
  }, 0)

  const rating = sum / reviews.length
  await services.updateRating(product, rating)
  sendSuccessRes(res, newReview, 201, 'created')
}

const getReviewsByOwner = async (req: IRequest, res: Response) => {
  if (!req.user) {
    throw HttpError(401)
  }
  const { _id: owner }: IUser = req.user
  const { page = 1, limit = 20 }: { page?: number; limit?: number } = req.query
  const skip = (page - 1) * limit
  const data = await services.findReviewsByOwner(owner, skip, limit)
  sendSuccessRes(res, data)
}

const getByProduct = async (req: Request, res: Response) => {
  const { product } = req.params
  if (!(await services.findOneProduct(product))) {
    throw HttpError(404, `Product with url: '${product}' not found`)
  }
  const { page = 1, limit = 20 }: { page?: number; limit?: number } = req.query
  const skip = (page - 1) * limit
  const data = await services.findReviewsByProduct(product, skip, limit)
  sendSuccessRes(res, data)
}

export default {
  addReview: ctrlWrapper(addReview),
  getReviewsByOwner: ctrlWrapper(getReviewsByOwner),
  getByProduct: ctrlWrapper(getByProduct),
}
