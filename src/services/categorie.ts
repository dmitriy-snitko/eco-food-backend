import { Category } from '../models/category.js'

export const findAllCategories = async () => {
  return await Category.find({}, '-createdAt -updatedAt');
}

export const findCategoryByUrl = async (category: string) => {
  return await Category.findOne({url: category}, '-createdAt -updatedAt');
}
