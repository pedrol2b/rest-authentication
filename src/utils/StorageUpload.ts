import * as dotenv from 'dotenv'
dotenv.config()
import { initializeApp } from 'firebase-admin/app'
import { credential, storage, ServiceAccount } from 'firebase-admin'
import { randomBytes } from 'crypto'
import serviceAccount from '../firebase-adminsdk.json'

const storageBucket = process.env.STORAGE_BUCKET

initializeApp({
  credential: credential.cert(<ServiceAccount>{
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url,
  }),
  storageBucket,
})

const bucket = storage().bucket()

interface File extends Express.Multer.File {
  cloudStorageURL: string
}

export default function (file: File): File | void {
  if (!file) return

  const filename = `${Date.now()}-${randomBytes(16).toString('hex')}.${file.originalname.split('.').pop()}`

  const bucketFile = bucket.file(filename)
  const stream = bucketFile.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  })

  stream.on('error', (err) => console.error(err))

  stream.on('finish', async () => {
    await bucketFile.makePublic()

    file.cloudStorageURL = `${process.env.STORAGE_GOOGLEAPI}${storageBucket}/${filename}`
    return file
  })

  stream.end(file.buffer)
}
