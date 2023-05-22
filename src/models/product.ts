import { Schema, model } from 'mongoose'
import { IProduct } from '../types/product.js'

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Product name is required'],
    },
    url: {
      type: String,
      unique: true,
      required: [true, 'Url is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
    },
    availability: {
      type: Schema.Types.ObjectId,
      ref: 'availability',
      required: [true, 'You need to indicate the availability of goods'],
    },
    description: { type: String },
    composition: {
      type: String,
      required: [true, 'You need to specify the composition of the product'],
    },
    minerals: { type: [String] },
    vitamins: { type: [String] },
    nutritionalValue: { type: Number },
    image: { type: String },
    categories: {
      type: [String],
      required: [true, 'Specify the category of the product'],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'brand',
      required: [true, 'Specify the brand of the product'],
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'country',
      required: [true, 'Specify the country of manufacture'],
    },
    form: {
      type: Schema.Types.ObjectId,
      ref: 'form',
      required: [true, 'Form is required'],
    },
    delivery: {
      type: Schema.Types.ObjectId,
      ref: 'delivery',
      required: [true, 'Specify delivery method'],
    },
    rating: {
      type: Number,
      default: 0,
    }
  },
  { versionKey: false, timestamps: true },
)

export const Product = model<IProduct>('product', productSchema)
