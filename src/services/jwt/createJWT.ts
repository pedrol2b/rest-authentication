import * as dotenv from 'dotenv'
dotenv.config()
import { sign, Secret, SignOptions } from 'jsonwebtoken'

export default (payload: string | Buffer | object): string =>
  sign(payload, <Secret>process.env.JWT_SECRET, <SignOptions>{ expiresIn: process.env.JWT_EXPIRATION })
