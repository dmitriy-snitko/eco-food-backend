import {IUser} from './types/user.ts'

declare namespace Express {
  export interface Request {
    user?: IUser
  }
}