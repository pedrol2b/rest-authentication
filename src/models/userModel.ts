import mongoose from '../database/index'
import { Types, Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

enum EmailActivationStatus {
  Pending = 'Pending',
  Active = 'Active',
}

export interface UserModel extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  name: string
  password: string | undefined
  emailActivationStatus: string
  avatar: string
  emailVerificationCode: string
  emailVerificationExpiresIn: Date
  passwordResetToken: string
  passwordResetExpiresIn: Date
  createdAt: Date
}

const UserSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    emailActivationStatus: {
      type: String,
      enum: Object.values(EmailActivationStatus),
      default: EmailActivationStatus.Pending,
    },
    avatar: {
      type: String,
      default: 'https://i.imgur.com/Noy031h.png',
    },
    emailVerificationCode: {
      type: String,
      select: false,
    },
    emailVerificationExpiresIn: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpiresIn: {
      type: Date,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'user' }
)

UserSchema.pre('save', async function (next): Promise<void> {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

export default mongoose.model<UserModel>('User', UserSchema)
