# rest-authentication

🔥 REST Authentication API with JWT made in **TypeScript**.

> ⚠️ In order to use this API, you must provide the following parameters for your .env
>>
>>``` JWT_SECRET=
>> JWT_EXPIRATION=
>> MONGODBNAME=
>> MONGODBURL=
>> SMTP_HOST=
>> SMTP_PORT=
>> SMTP_FROM=
>> SMTP_USER=
>> SMTP_PASS=
>> STORAGE_GOOGLEAPI=
>> STORAGE_BUCKET=
>>```

## Firebase Admin SDK

This application depends on the Firebase Storage Service, so you'll need to provide your own Firebase Admin SDK, [here's how you can get it](https://firebase.google.com/docs/admin/setup#add-sdk).
After that just throw the SDK on the project root as `'firebase-adminsdk.json'`

## Routes

### POST/signup

| ![preview](https://user-images.githubusercontent.com/107975184/200271590-b786b1f8-0ae9-48f0-b7ff-7ab86d964330.png) |
| :--------------------------------------------------------------------------------------------------------: |

### POST/signin

| ![preview](https://user-images.githubusercontent.com/107975184/200271596-92cac546-2278-40e3-8999-1a96177f18b0.png) |
| :--------------------------------------------------------------------------------------------------------: |

### POST/password_recovery

| ![preview](https://user-images.githubusercontent.com/107975184/200271598-06288a71-97d4-4ed7-9679-dda45645670b.png) |
| :--------------------------------------------------------------------------------------------------------: |

### POST/password_reset

| ![preview](https://user-images.githubusercontent.com/107975184/200271601-0e0ef0a6-fc44-4980-a313-68748db93434.png) |
| :--------------------------------------------------------------------------------------------------------: |

### POST/email_change

| ![preview](https://user-images.githubusercontent.com/107975184/200271603-aff81a4c-6355-4e06-ac30-b7f61a099397.png) |
| :--------------------------------------------------------------------------------------------------------: |

### POST/email_verify

| ![preview](https://user-images.githubusercontent.com/107975184/200271607-eb3130f1-313f-4d50-a574-4854f0800651.png) |
| :--------------------------------------------------------------------------------------------------------: |

### GET/email_verify

| ![preview](https://user-images.githubusercontent.com/107975184/200271609-1873d831-352e-493c-b120-91a7c753721e.png) |
| :--------------------------------------------------------------------------------------------------------: |
