import mongoose from 'mongoose'
import app from '../app.js'
import * as dotenv from 'dotenv'
dotenv.config()

const { DB_HOST, PORT = 3030 } = process.env

if (!DB_HOST) {
  throw new Error('DB_HOST is not defined')
}

mongoose.set('strictQuery', true)

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
