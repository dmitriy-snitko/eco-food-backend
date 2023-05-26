import { Request, Response } from 'express'
import * as service from '../services/country.js'
import { sendSuccessRes } from '../helpers/sendSuccessRes.js'
import { ctrlWrapper } from '../helpers/index.js'

const getAllCountries = async (req: Request, res: Response) => {
  const data = await service.findAllCountries()
  sendSuccessRes(res, data)
}

export default {
  getAllCountries: ctrlWrapper(getAllCountries),
}
