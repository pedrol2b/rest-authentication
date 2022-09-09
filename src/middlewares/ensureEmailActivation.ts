import { Request, Response, NextFunction } from 'express'
import userModel, { UserModel } from '../models/userModel'

export default async function (req: Request, res: Response, next: NextFunction) {
  const { user_id } = req

  const User: UserModel | null = await userModel.findOne({ _id: user_id })

  if (User?.status === 'Pending') return res.status(401).send({ error: true, message: 'Pending confirmation' })
  next()
}
