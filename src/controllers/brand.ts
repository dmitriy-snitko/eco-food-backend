import { Request, Response } from 'express'
import * as service from '../services/index.js'
import { sendSuccessRes } from '../helpers/sendSuccessRes.js'
import { ctrlWrapper } from '../helpers/index.js'

const getAllBrands = async (req: Request, res: Response) => {
  const data = await service.findAllBrands()
  sendSuccessRes(res, data)
}

export default {
  getAllBrands: ctrlWrapper(getAllBrands),
}
