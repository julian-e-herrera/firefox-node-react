const express = require('express')
const connectionDB = require('./config/db')
const app = express()

connectionDB()

console.log(`working NODESEND`)
const port = process.env.PORT || 4000

app.use(express.json())
//endpoints
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/link', require('./routes/link'))
app.use('/api/files', require('./routes/files'))

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is working ${port}`)
})
