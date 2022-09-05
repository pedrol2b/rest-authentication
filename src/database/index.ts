import * as dotenv from 'dotenv'
dotenv.config()
import mongoose, { ConnectOptions } from 'mongoose'

mongoose.connect(
  <string>process.env.MONGODBURL,
  <ConnectOptions>{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

mongoose.Promise = global.Promise
export default mongoose
