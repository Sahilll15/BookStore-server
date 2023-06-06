const express = require('express')
const cors = require('cors')
const router = express.Router();
// const { addBook, getBooks, getBookbyID, deletebook, updatebook } = require('../controllers/bookcontroller')
const { addToCart, getCartItems, updateCartItemQuantity } = require('../controllers/cartcontroller')
const { verifySuperUserToken, verifytoken } = require('../middleware/verifytoken')


router.post('/addtocart', verifytoken, addToCart)
router.get('/getcartitems', verifytoken, getCartItems)
router.post('/updatecartitems', verifytoken, updateCartItemQuantity)


module.exports = router;