import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import app from '../app.js'

const { DB_HOST, PORT } = process.env

if (!DB_HOST) {
  throw new Error('DB_HOST is not defined')
}

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful')
    app.listen(PORT || 3030)
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
