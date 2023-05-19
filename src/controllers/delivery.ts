import { Request, Response } from 'express'
import * as service from '../services/delivery.js'
import { sendSuccessRes } from '../helpers/sendSuccessRes.js'
import { ctrlWrapper } from '../helpers/index.js'

const getAllDeliverys = async (req: Request, res: Response) => {
  const data = await service.findAllDeliverys()
  sendSuccessRes(res, data)
}

export default {
  getAllDeliverys: ctrlWrapper(getAllDeliverys),
}
