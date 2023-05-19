import { Country } from "../models/country.js";

export const findAllCountrys = async () => {
  return await Country.find({}, '-createdAt -updatedAt');
}