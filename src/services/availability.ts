import { Availability } from "../models/availability.js";

export const findAllAvailabilitys = async () => {
  return await Availability.find({}, '-createdAt -updatedAt');
}