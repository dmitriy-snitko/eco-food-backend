import { ObjectId, Document } from 'mongoose'

export interface IReview extends Document {
  text: string
  score: number
  product: string
  owner: ObjectId
}