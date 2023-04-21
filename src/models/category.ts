import { Schema, model } from 'mongoose'
import { ICategory } from 'types/index.js'

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    url: {
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
  },
  { versionKey: false, timestamps: true },
)

export const Category = model<ICategory>('category', categorySchema)
