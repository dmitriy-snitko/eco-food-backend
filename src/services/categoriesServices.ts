import { Categories } from '../models/categories.js'

export const findAll = () => {
  return Categories.find({});
}

export const findByUrl = (url: string) => {
  return Categories.findOne({url});
}
