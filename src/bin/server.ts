import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import app from '../app.js'

const PORT = process.env.PORT || 3030
const uriDb = process.env.DB_HOST

if (!uriDb) {
  throw new Error('DB_HOST is not defined')
}

mongoose
  .connect(uriDb)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
