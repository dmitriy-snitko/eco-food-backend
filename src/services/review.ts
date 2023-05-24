import { ObjectId } from 'mongoose'
import { Review } from '../models/review.js'
import { IReview } from '../types/review.js'
import { findOneProduct } from './product.js'
import { HttpError } from '../helpers/HttpError.js'

export const createReview = async (review: IReview) => {
  const { product: productUrl } = review

  if (!(await findOneProduct(productUrl))) {
    throw HttpError(404, `Product whith url: '${productUrl}' not found.`)
  }

  const { _id: id, text, score, product, owner } = await Review.create(review)
  return { id, text, score, product, owner }
}

export const findReviewsByOwner = async (id: ObjectId, skip?: number, limit?: number) => {
  return await Review.find({ owner: id }, '-createdAt -updatedAt', { skip, limit }).populate({
    path: 'owner',
    select: 'name',
  })
}

export const findReviewsByProduct = async (product: string, skip?: number, limit?: number) => {
  return await Review.find({ product }, '-createdAt -updatedAt -product', { skip, limit }).populate({
    path: 'owner',
    select: 'name',
  })
}
