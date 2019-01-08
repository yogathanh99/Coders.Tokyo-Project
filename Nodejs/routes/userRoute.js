const express = require('express')
const router = express.Router()

const controllers = require('../controllers/userController')

router.get('/', controllers.root)

//Route Search
router.get('/search', controllers.search)

//Route Create
router.get('/create', controllers.create)

//Route View Info
router.get('/:id', controllers.viewInfo)

//Route Post Create
router.post('/create', controllers.postCreate)

module.exports = router;