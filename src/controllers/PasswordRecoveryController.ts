import { Request, Response } from 'express'
import userModel, { UserModel } from '../models/userModel'
import { randomBytes } from 'crypto'
import transporter, { Transporter } from '../services/smtp/index'

class PasswordRecoveryController {
  async handle(req: Request, res: Response): Promise<any> {
    const { email } = req.body

    try {
      const User: UserModel | null = await userModel.findOne({ email })

      if (!User) return res.status(400).send({ error: true, message: 'No account linked with that email address' })

      const token = randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)

      await userModel.findByIdAndUpdate(User._id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpiresIn: now,
        },
      })

      transporter(
        <Transporter>{
          to: email,
          from: process.env.SMTP_FROM,
          subject: 'Password Recovery',
          template: 'password_recovery',
          ctx: { email, token },
        },
        (err) => {
          if (err) return res.status(500).send({ error: true, message: 'Internal Server Error' })

          res.send()
        }
      )
    } catch (e) {
      res.status(500).send({ error: true, message: 'Internal Server Error' })
    }
  }
}

export default PasswordRecoveryController
