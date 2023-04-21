import { IError } from '../types/index.js'

interface ErrorMessageList {
  [key: number]: string
}
const errorMessageList: ErrorMessageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
}

export const HttpError = (status: number, message = errorMessageList[status]) => {
  const error = new Error(message) as IError
  error.status = status
  return error
}
