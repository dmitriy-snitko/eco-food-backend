import { Document, ObjectId } from 'mongoose'
import { Request } from 'express'

export interface IUser extends Document {
  _id: ObjectId
  name: string
  email: string
  password: string
  token: string
}

export interface IRequest extends Request {
  user?: IUser
}
