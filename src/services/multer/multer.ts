import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

export default multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Invalid file type.'))
  },
})
