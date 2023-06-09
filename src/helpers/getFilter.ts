import { IProduct } from '../types/index.js'

export const getFilter = (data: IProduct[]) => {
  const sortedPrise = data.sort((a, b) => a.price - b.price).map((i) => i.price)

  let price = {
    min: sortedPrise[0],
    max: sortedPrise[sortedPrise.length - 1],
  }

  if (sortedPrise.length === 0) {
    price = {
      min: 0,
      max: 0,
    }
  }

  const brands = Array.from(new Set(data.map((i) => i.brand)))
  const countries = Array.from(new Set(data.map((i) => i.country)))
  const form = Array.from(new Set(data.map((i) => i.form)))
  const availability = Array.from(new Set(data.map((i) => i.availability)))
  const delivery = Array.from(new Set(data.map((i) => i.delivery)))

  return { price, brands, countries, form, availability, delivery }
}
