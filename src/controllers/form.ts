import { Request, Response } from 'express'
import * as service from '../services/form.js'
import { sendSuccessRes } from '../helpers/sendSuccessRes.js'
import { ctrlWrapper } from '../helpers/index.js'

const getAllForms = async (req: Request, res: Response) => {
  const data = await service.findAllForms()
  sendSuccessRes(res, data)
}

export default {
  getAllForms: ctrlWrapper(getAllForms),
}
