import mongoose from '../database/index'
import bcrypt from 'bcryptjs'

const Schema = new mongoose.Schema(
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
    avatar: {
      type: String,
      default:
        'https://storage.googleapis.com/inventory-management-sys-a9cc0.appspot.com/1662349783980-1dd56510056c47992120185a2fb0515a.png',
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

Schema.pre('save', async function (next): Promise<void> {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

export default mongoose.model('User', Schema)
