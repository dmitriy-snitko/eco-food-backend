import { Form } from "../models/form.js";

export const findAllForms = async () => {
  return await Form.find({}, '-createdAt -updatedAt');
}