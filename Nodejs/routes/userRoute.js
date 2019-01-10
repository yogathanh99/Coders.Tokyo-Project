const express = require('express')
const router = express.Router()

const controllers = require('../controllers/userController')
const validate =require('../validate/userValidate')

router.get('/', controllers.root)

//Route Search
router.get('/search', controllers.search)

//Route Create
router.get('/create', controllers.create)

//Route View Info
router.get('/:id', controllers.viewInfo)

//Route Post Create
router.post('/create', validate.validation, controllers.postCreate) //In this, I'm using middleware of Express

module.exports = router;