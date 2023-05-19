import { Delivery } from "../models/delivery.js";

export const findAllDeliverys = async () => {
  return await Delivery.find({}, '-createdAt -updatedAt');
}