import * as dotenv from 'dotenv'
dotenv.config()
import mongoose, { ConnectOptions } from 'mongoose'

mongoose.connect(`${process.env.MONGODBURL}${process.env.MONGODBNAME}`, <ConnectOptions>{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise
export default mongoose
