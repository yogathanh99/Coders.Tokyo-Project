const express = require('express')
const router = express.Router()

const controllers = require('../controllers/cartController')

router.get('/add/:productId', controllers.addToCart)

module.exports = router;
