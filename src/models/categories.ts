import { Schema, Model, model } from 'mongoose'
import { ICategories } from 'types/index.js'

const categoriesSchema: Schema = new Schema({
  url: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
})

export const Categories: Model<ICategories> = model<ICategories>('Categories', categoriesSchema)
