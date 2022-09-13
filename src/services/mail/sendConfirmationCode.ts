import * as dotenv from 'dotenv'
dotenv.config()
import { Types } from 'mongoose'
import userModel from '../../models/userModel'
import transporter, { Transporter } from '../smtp/index'

export default async function (user_id: Types.ObjectId | string, email: string): Promise<void> {
  const codeNumVet = []
  const now = new Date()

  for (let i = 0; i < 8; i++) codeNumVet.push(Math.floor(Math.random() * 10))
  now.setMinutes(now.getMinutes() + 30)
  const code = codeNumVet.join('')

  await userModel.findByIdAndUpdate(user_id, {
    $set: {
      emailVerificationCode: code,
      emailVerificationExpiresIn: now,
    },
  })

  return new Promise((resolve, reject) => {
    transporter(<Transporter>{
      to: email,
      from: process.env.SMTP_FROM,
      subject: 'Email Address Confirmation',
      template: 'email_confirmation',
      ctx: { code },
    }).then(() => resolve())
  })
}
