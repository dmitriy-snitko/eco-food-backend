export interface IError extends Error {
  code?: number
  status?: number
}
