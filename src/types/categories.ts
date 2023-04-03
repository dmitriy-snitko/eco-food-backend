import { Document } from 'mongoose'

export interface ICategories extends Document {
  url: string
  title: string
  description: string
  image: string
}
