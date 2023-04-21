import { ObjectId } from 'mongoose'
import { Review } from '../models/review.js'
import { IReview } from '../types/review.js'

export const createReview = async (review: IReview) => {
  return await Review.create(review)
}

export const findReviewsByOwner = async (id: ObjectId, skip?: number, limit?: number) => {
  return await Review.find({ owner: id }, "-createdAt -updatedAt", {skip, limit}).populate({
    path: 'owner',
    select: 'name',
  })
}

export const findReviewsByProduct = async (product: string, skip?: number, limit?: number) => {
  return await Review.find({ product }, "-createdAt -updatedAt -product", {skip, limit}).populate({
    path: 'owner',
    select: 'name',
  })
}
