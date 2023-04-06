import { Document } from 'mongoose'

export interface IProducts extends Document {
  name: string
  url: string
  price: number
  oldPrice: number
  size: number
  availability: boolean
  description: string
  composition: string
  minerals: [string]
  vitamins: [string]
  nutritionalValue: number
  image: string
  categories: [string]
  brand: string
  country: string
  form: 'prepackaged' | 'on weight'
  delivery: string
}
