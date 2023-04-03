import { Response } from "express"

const sendSuccessRes = (res: Response, data: any, status = 200, message?: string) => {
  res.status(status).json({
    status: 'success',
    code: status,
    data,
    message
  })
}

export default sendSuccessRes