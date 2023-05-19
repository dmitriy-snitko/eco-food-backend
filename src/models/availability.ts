import { Schema, model } from 'mongoose'
import { IAvailability } from 'types/availability.js'

const availabilitySchema = new Schema<IAvailability>(
  {
    name: {
      type: String,
      required: true,
      enum: ['in stock', 'sold out', 'is running out', 'out of production'],
      default: 'in stock',
    },
  },
  { versionKey: false, timestamps: true },
)

export const Availability = model<IAvailability>('availability', availabilitySchema)
