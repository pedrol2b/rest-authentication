import * as dotenv from 'dotenv'
dotenv.config()
import { createTransport, SendMailOptions } from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer'
import { pugEngine } from 'nodemailer-pug-engine'
import { resolve } from 'path'

export interface Transporter extends Options {
  template: string
}

const transporter = createTransport(<SendMailOptions>{
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

transporter.use(
  'compile',
  pugEngine({
    templateDir: resolve(__dirname, '../../res/mail/'),
    pretty: true,
  })
)

export default transporter.sendMail.bind(transporter)
