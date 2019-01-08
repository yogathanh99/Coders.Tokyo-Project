const express = require('express')
const app = express()
const bodyParser = require('body-parser');
//database basic
const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const port = 3000

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Set-up for Pug file
app.set('view engine', 'pug')
app.set('views','./views')

// Set some defaults for lowdb (required if your JSON file is empty)
db.defaults({users: []}).write()

app.get('/', (req, res) => res.render('index'))

app.get('/users', (req, res) => res.render('users/index', {
  users: db.get('users').value()
}))

//route Search
app.get('/users/search', (req, res) => {
  let q = req.query.q

  let matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

  res.render('users/index',{
    users: matchedUsers,
    q: q
  })
})

//Route Create
app.get('/users/create', (req, res) => {
  res.render('users/create')
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  const user = db.get('users').find({ id: id }).value()

  res.render('users/view', {
    user: user
  })
})

app.post('/users/create', (req, res) => {
  req.body.id=shortid.generate()
  db.get('users').push(req.body).write()

  res.redirect('/users')

})
app.listen(port, () =>console.log(`Server listening on port ${port}`))

//request la nhung gi nguoi dung gui len (req)
//response la nhung gi server gui ve (res)