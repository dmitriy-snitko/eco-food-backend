import { Country } from "../models/country.js";

export const findAllCountries = async () => {
  return await Country.find({}, '-createdAt -updatedAt');
}