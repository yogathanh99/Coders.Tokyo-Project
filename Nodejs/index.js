require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const cartRoute= require('./routes/cartRoute')

const authMiddleware = require('./middleware/authMiddleware')
const sessionMiddleware = require('./middleware/sessionMiddleware')

const port = process.env.PORT_URL


app.use(bodyParser.json()); // for parsing application/json. Speacial: bodyParse does not support for upload multi-media file (image...)
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware)

//Set-up for Pug file
app.set('view engine', 'pug')
app.set('views','./views')
//Using static path (images, css, javascript)
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

app.get('/create', (req,res)=> res.render('users/create'))

//Route users
app.use('/users/',authMiddleware.checkAuth, userRoute)
//Route login
app.use('/auth', authRoute)
//Route product
app.use('/products', authMiddleware.checkAuth, productRoute)
//Route cart
app.use('/cart', cartRoute)

app.listen(port, () =>console.log(`Server listening on port ${port}`))

//request la nhung gi nguoi dung gui len (req)
//response la nhung gi server gui ve (res)