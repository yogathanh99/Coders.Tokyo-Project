const express = require('express')
const router = express.Router()

const controllers = require('../controllers/authController')

router.get('/login', controllers.login)

router.post('/login', controllers.postLogin)

module.exports=router