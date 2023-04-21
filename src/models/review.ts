import Joi from 'joi'
import { Schema, model } from 'mongoose'
import { handleMongooseError } from '../middleware/index.js'
import { IReview } from '../types/review.js'

const reviewSchema = new Schema<IReview>(
  {
    text: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

reviewSchema.post('save', handleMongooseError)

const addSchema = Joi.object<IReview>({
  text: Joi.string().required(),
  score: Joi.number().min(0).max(5).required(),
  product: Joi.string().required(),
})

export const schemas = {
  addSchema,
}

export const Review = model<IReview>('review', reviewSchema)
