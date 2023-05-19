import { Schema, model } from 'mongoose'
import { ICountry } from 'types/index.js'

const countrySchema = new Schema<ICountry>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    }
  },
  { versionKey: false, timestamps: true },
)

export const Country = model<ICountry>('country', countrySchema)
