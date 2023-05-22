// import { Product } from '../models/product.js'

// const populateProduct = (query: any) => {
//   return query
//     .populate({
//       path: 'brand form availability',
//       select: 'name',
//     })
//     .populate({
//       path: 'country',
//       select: ['name', 'code'],
//     })
// }

// export const findAllProducts = async (skip?: number, limit?: number) => {
//   const query = Product.find({}, '-createdAt -updatedAt', { skip, limit })
//   return await populateProduct(query)
// }

// export const findProductsByCategory = async (category: string, price?: string, filter?: any, skip?: number, limit?: number) => {
//   if (price) {
//     const minMaxPrice = price.split('_')
//     const query = Product.find({ categories: category, $and: [ { price: { $gte: minMaxPrice[0] } }, { price: { $lte: minMaxPrice[1] } } ], ...filter }, '-createdAt -updatedAt', { skip, limit })
//     return await populateProduct(query)
//   }
//   const query = Product.find({ categories: category, ...filter }, '-createdAt -updatedAt', { skip, limit })
//   return await populateProduct(query)
// }

// export const findOneProduct = async (product: string) => {
//   const query = Product.findOne({ url: product }, '-createdAt -updatedAt')
//   return await populateProduct(query)
// }

import { Product } from '../models/product.js'

const populateProduct = (query: any) => {
  return query
    .populate({
      path: 'brand form availability',
      select: 'name',
    })
    .populate({
      path: 'delivery',
      select: 'description',
    })
    .populate({
      path: 'country',
      select: ['name', 'code'],
    })
}

const findProducts = async (query: any, skip?: number, limit?: number) => {
  query.select('-createdAt -updatedAt').skip(skip).limit(limit)
  return await populateProduct(query)
}

export const findAllProducts = async (skip?: number, limit?: number) => {
  const query = Product.find({})
  return await findProducts(query, skip, limit)
}

export const findProductsByCategory = async (
  category: string,
  price?: string,
  brand?: string,
  country?: string,
  form?: string,
  availability?: string,
  delivery?: string,
  skip?: number,
  limit?: number,
) => {
  const query = Product.find({ categories: category })

  if (price) {
    const [minPrice, maxPrice] = price.split('_')
    query.find({ price: { $gte: minPrice, $lte: maxPrice } })
  }

  if (brand) {
    const brandList = brand.split('_')
    query.find({ brand: { $in: brandList } })
  }

  if (country) {
    const countryList = country.split('_')
    query.find({ country: { $in: countryList } })
  }

  if (form) {
    const formList = form.split('_')
    query.find({ form: { $in: formList } })
  }

  if (delivery) {
    const deliveryList = delivery.split('_')
    query.find({ delivery: { $in: deliveryList } })
  }

  if (availability) {
    const availabilityList = availability.split('_')
    query.find({ availability: { $in: availabilityList } })
  }

  return await findProducts(query, skip, limit)
}

export const findOneProduct = async (product: string) => {
  const query = Product.findOne({ url: product })
  return await populateProduct(query)
}

export const updateRating = async(product: string, rating: number) => {
  return Product.updateOne({url: String(product)}, {$set: {rating}})
}