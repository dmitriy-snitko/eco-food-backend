import { Response } from 'express'

export const sendSuccessRes = (res: Response, data: any, code = 200, status = 'success', message?: string) => {
  res.status(code).json({
    status,
    code,
    message,
    data,
  })
}
