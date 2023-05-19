import { Document, ObjectId } from 'mongoose'

export interface IDelivery extends Document {
  _id: ObjectId
  description: string
}
