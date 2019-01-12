const express = require('express')
const router = express.Router()
const multer = require('multer')
var upload = multer({ dest: './public/uploads' })


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
router.post('/create', upload.single('avatar'), validate.validation, controllers.postCreate) //In this, I'm using middleware of Express

module.exports = router;