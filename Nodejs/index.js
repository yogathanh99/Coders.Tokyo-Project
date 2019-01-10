require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const authMiddleware = require('./middleware/authMiddleware')

const port = 3000


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))


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

app.listen(port, () =>console.log(`Server listening on port ${port}`))

//request la nhung gi nguoi dung gui len (req)
//response la nhung gi server gui ve (res)