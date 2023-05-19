import { Request, Response } from 'express'
import * as service from '../services/availability.js'
import { sendSuccessRes } from '../helpers/sendSuccessRes.js'
import { ctrlWrapper } from '../helpers/index.js'

const getAllAvailability = async (req: Request, res: Response) => {
  const data = await service.findAllAvailabilitys()
  sendSuccessRes(res, data)
}

export default {
  getAllAvailability: ctrlWrapper(getAllAvailability),
}
