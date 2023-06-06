const express = require('express')
const cors = require('cors')
const router = express.Router();
const { addBook, getBooks, getBookbyID, deletebook, updatebook } = require('../controllers/bookcontroller')
const { verifySuperUserToken, verifytoken } = require('../middleware/verifytoken')

//to add an book you must be an super user
router.post('/addbook', verifySuperUserToken, addBook)
//to get an book its not neccesery to be it
router.get('/getbooks', verifytoken, getBooks)
router.get('/getbook/:id', verifytoken, getBookbyID)
router.delete('/delete/:id', verifySuperUserToken, deletebook)
router.patch('/update/:id', verifySuperUserToken, updatebook)

module.exports = router;