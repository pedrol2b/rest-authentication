import * as dotenv from 'dotenv'
dotenv.config()
import { Request, Response, NextFunction } from 'express'
import { verify, Secret } from 'jsonwebtoken'

interface Payload {
  _id: string
}

export default function (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).send({ error: true, message: 'No token provided' })
  const parts = authorization.split(' ')

  if (parts.length !== 2) return res.status(401).send({ error: true, message: 'Token error' })
  const [scheme, token] = parts

  if ('Bearer' !== scheme) return res.status(401).send({ error: true, message: 'Token malformatted' })

  try {
    const { _id } = verify(token, <Secret>process.env.JWT_SECRET) as Payload
    req.user_id = _id

    next()
  } catch (e) {
    return res.status(401).send({ error: true, message: 'Invalid token' })
  }
}
