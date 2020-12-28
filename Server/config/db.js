const mongoose = require('mongoose')
require('dotenv').config({ path: '../variables.env' })

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    console.log('DB connection success')
  } catch (error) {
    console.log('Error fail connection')
    console.log(error)
    process.exit(1)
  }
}
module.exports = conectDB
