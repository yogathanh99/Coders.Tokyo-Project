const express = require('express')
const router = express.Router()

const controllers = require('../controllers/productController')

router.get('/', controllers.root)

module.exports = router;
