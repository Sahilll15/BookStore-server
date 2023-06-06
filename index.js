const express = require('express')
const cors = require('cors')
const myDb = require('./db')
const authroutes = require('./routes/authroutes')
const bookroutes = require('./routes/bookroutes')
const cartroutes = require('./routes/cartroutes')
require('dotenv').config();
const PORT = process.env.PORT;

const app = express()

app.use(express.json())
app.use(cors())



myDb.myDb();
app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/auth', authroutes)
app.use('/api/book', bookroutes)
app.use('/api/cart', cartroutes)