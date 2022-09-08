import { Request, Response } from 'express'
import userModel from '../models/userModel'
import JWT from '../services/jwt/index'
import { Types } from 'mongoose'
const { jwtSign } = new JWT()
import StorageUpload from '../utils/StorageUpload'
import transporter from '../services/smtp/index'
import { Options } from 'nodemailer/lib/mailer'

interface UserModel {
  _id: Types.ObjectId
  password: string | undefined
}

interface Transporter extends Options {
  template: string
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

      const file = await StorageUpload(<any>req.file)
      const avatar = file ? file.cloudStorageURL : undefined

      const createdUser: UserModel = await userModel.create({ username, email, name, password, avatar })
      createdUser.password = undefined

      const code_numbers = []
      const now = new Date()
      for (let i = 0; i < 8; i++) code_numbers.push(Math.floor(Math.random() * 10))
      now.setMinutes(now.getMinutes() + 30)
      const code = code_numbers.join('')

      await userModel.findByIdAndUpdate(createdUser._id, {
        $set: {
          emailVerificationCode: code,
          emailVerificationExpiresIn: now,
        },
      })

      transporter(
        <Transporter>{
          to: email,
          from: process.env.SMTP_FROM,
          subject: 'Email Address Confirmation',
          template: 'email_confirmation',
          ctx: { code },
        },
        (err) => {}
      )

      res.send({
        token: jwtSign({ _id: createdUser._id }),
      })
    } catch (e) {
      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default SignupController
