import { Router } from 'express'
import SignupController from './controllers/SignupController'
import multer from './services/multer/multer'
import cdnUpload from './utils/cdnUpload'

const router = Router()

const signupController = new SignupController()

router.post('/signup', multer.single('avatar'), cdnUpload, signupController.handle)

export { router }
