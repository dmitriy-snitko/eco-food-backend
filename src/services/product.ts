import { Product } from '../models/product.js'
import { IProduct } from '../types/index.js'

const getSortedProducts = (products: IProduct[], sortValue?: string) => {
  if (sortValue === 'relevancy') {
    return products.sort((a, b) => b.oldPrice - a.oldPrice)
  }

  if (sortValue === 'price-down') {
    return products.sort((a, b) => b.price - a.price)
  }

  if (sortValue === 'price-up') {
    return products.sort((a, b) => a.price - b.price)
  }

  if (sortValue === 'rating') {
    return products.sort((a, b) => b.rating - a.rating)
  }

  return products.sort((a, b) => b.oldPrice - a.oldPrice)
}

function getPaginateProducts(products: IProduct[], skip: number, limit: number) {
  const endIndex = skip + limit
  return products.slice(skip, endIndex)
}

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
  query.skip(skip).limit(limit)
  return await populateProduct(query)
}

export const findAllProducts = async (skip?: number, limit?: number) => {
  const query = Product.find({}, '-createdAt -updatedAt')
  return await findProducts(query, skip, limit)
}

export const findAllProductsInCategory = async (category: string) => {
  const query = Product.find({ categories: category }, '-createdAt -updatedAt')
  return await findProducts(query)
}

export const findProductsByCategory = async (
  category: string,
  skip: number,
  limit: number,
  price?: string,
  brand?: string,
  country?: string,
  form?: string,
  availability?: string,
  delivery?: string,
  sortBy?: string,
) => {
  const query = Product.find({ categories: category }, '-createdAt -updatedAt')

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

  const products: IProduct[] = await findProducts(query)
  const sortedProducts = getSortedProducts(products, sortBy)
  const paginateProducts = getPaginateProducts(sortedProducts, skip, limit)

  return paginateProducts
}

export const findOneProduct = async (product: string) => {
  const query = Product.findOne({ url: product }, '-createdAt -updatedAt')
  return await populateProduct(query)
}

export const updateRating = async (product: string, rating: number) => {
  return Product.updateOne({ url: String(product) }, { $set: { rating } })
}
