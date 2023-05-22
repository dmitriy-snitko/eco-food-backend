import { Document } from 'mongoose'
import { IBrand, ICountry, IForm, IAvailability, IDelivery } from './index.js'

export interface IProduct extends Document {
  name: string
  url: string
  price: number
  oldPrice: number
  size: number
  availability: IAvailability
  description: string
  composition: string
  minerals: [string]
  vitamins: [string]
  nutritionalValue: number
  image: string
  categories: [string]
  brand: IBrand
  country: ICountry
  form: IForm
  delivery: IDelivery
  rating: number
}
