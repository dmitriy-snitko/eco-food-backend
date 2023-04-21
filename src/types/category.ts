import { Document } from 'mongoose'

export interface ICategory extends Document {
  url: string
  name: string
  description: string
  image: string
}
