import { Document, ObjectId } from 'mongoose'

export interface ICountry extends Document {
  _id: ObjectId
  name: string
  code: string
}
