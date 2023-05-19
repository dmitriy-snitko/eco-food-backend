import { Schema, model } from 'mongoose'
import { IDelivery } from 'types/index.js'

const deliverySchema = new Schema<IDelivery>(
  {
    description: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const Delivery = model<IDelivery>('delivery', deliverySchema)
