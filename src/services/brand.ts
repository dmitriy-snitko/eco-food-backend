import { Brand } from "../models/brand.js";

export const findAllBrands = async () => {
  return await Brand.find({}, '-createdAt -updatedAt');
}