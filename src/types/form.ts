import { Document, ObjectId } from 'mongoose'

export interface IForm extends Document {
  _id: ObjectId
  name: string
}
