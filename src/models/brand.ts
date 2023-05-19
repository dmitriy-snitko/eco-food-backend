import { Schema, model } from 'mongoose'
import { IBrand } from 'types/index.js'

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const Brand = model<IBrand>('brand', brandSchema)
