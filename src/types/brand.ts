import { Document, ObjectId } from 'mongoose'

export interface IBrand extends Document {
  _id: ObjectId
  name: string
}
