import { Router, Request, Response } from 'express'
import multer from 'multer'
import multerConfig from './services/storage/multer'
import upload from './services/storage/firebase'

const router = Router()

// TODO: remove
/** */
router.post(
  '/test',
  [multer(multerConfig).single('file'), upload],
  async (req: Request, res: Response): Promise<any> => {
    console.log(req.file)
    res.status(201).send()
  }
)
/** */

export { router }
