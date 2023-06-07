const express = require('express')
const cors = require('cors')
const router = express.Router();
const { addBook, getBooks, getBookbyID, deletebook, updatebook } = require('../controllers/bookcontroller')
const { verifySuperUserToken, verifytoken } = require('../middleware/verifytoken')


router.post('/addbook', verifySuperUserToken, addBook)
router.get('/getbooks', verifytoken, getBooks)
router.get('/superuser/getbooks', verifySuperUserToken, getBooks)
router.get('/getbook/:id', verifytoken, getBookbyID)
router.delete('/delete/:id', verifySuperUserToken, deletebook)
router.patch('/update/:id', verifySuperUserToken, updatebook)

module.exports = router;