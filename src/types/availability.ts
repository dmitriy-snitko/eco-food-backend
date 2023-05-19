import { Document, ObjectId } from 'mongoose'

export interface IAvailability extends Document {
  _id: ObjectId
  name: string
}
