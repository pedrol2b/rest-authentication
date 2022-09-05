import { Request, Response } from 'express'
import userModel from '../models/userModel'
import createJWT from '../services/jwt/createJWT'
import { Types } from 'mongoose'

interface UserModel {
  _id: Types.ObjectId
  password: string | undefined
}

class SignupController {
  async handle(req: Request, res: Response): Promise<any> {
    const { username, email, name, password } = req.body

    try {
      if (await userModel.findOne({ username }))
        return res.status(400).send({ error: true, message: 'An account with that username already exists' })
      if (await userModel.findOne({ email }))
        return res.status(400).send({ error: true, message: 'This email address is already in use' })

      if (password.length < 4) return res.status(400).send({ error: true, message: 'This password is very weak' })

      const file = <any>req.file
      const avatar = file ? file.cloudStorageURL : undefined

      const createdUser: UserModel = await userModel.create({ username, email, name, password, avatar })
      createdUser.password = undefined

      res.send({
        token: createJWT({ _id: createdUser._id }),
      })
    } catch (e) {
      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default SignupController
