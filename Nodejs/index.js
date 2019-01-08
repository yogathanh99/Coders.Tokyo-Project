const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const userRoute= require('./routes/userRoute')

const port = 3000

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Set-up for Pug file
app.set('view engine', 'pug')
app.set('views','./views')

//Using static path (images, css, javascript)
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

//Route users
app.use('/users/', userRoute)

app.listen(port, () =>console.log(`Server listening on port ${port}`))

//request la nhung gi nguoi dung gui len (req)
//response la nhung gi server gui ve (res)