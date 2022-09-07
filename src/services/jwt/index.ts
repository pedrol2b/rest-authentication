import * as dotenv from 'dotenv'
dotenv.config()
import { sign, Secret, SignOptions } from 'jsonwebtoken'

export default class JWT {
  jwtSign(payload: string | Buffer | object): string {
    return sign(payload, <Secret>process.env.JWT_SECRET, <SignOptions>{ expiresIn: process.env.JWT_EXPIRATION })
  }
}
