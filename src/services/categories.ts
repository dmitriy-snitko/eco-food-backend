import { Categories } from '../models/categories.js'

export const findAllCategories = () => {
  return Categories.find({});
}

export const findCategoryByUrl = (category: string) => {
  return Categories.findOne({url: category});
}
