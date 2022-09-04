import * as dotenv from 'dotenv'
dotenv.config()
import { createTransport, SendMailOptions } from 'nodemailer'
import { pugEngine } from 'nodemailer-pug-engine'
import { resolve } from 'path'

const sender = createTransport(<SendMailOptions>{
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

sender.use(
  'compile',
  pugEngine({
    templateDir: resolve(__dirname, '../../res/mail/'),
    pretty: true,
  })
)

export default sender.sendMail.bind(sender)
