import { IProducts } from '../types/products.js'

export const getFilter = (data: IProducts[]) => {
  const sortedPrise = data.sort((a, b) => a.price - b.price).map((i) => i.price)

  const price = {
    min: sortedPrise[0],
    max: sortedPrise[sortedPrise.length - 1],
  }

  const brands = Array.from(new Set(data.map((i) => i.brand)))
  const countrys = Array.from(new Set(data.map((i) => i.country)))

  return { price, brands, countrys }
}
