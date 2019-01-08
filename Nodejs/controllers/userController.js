const shortid = require('shortid')

const db = require('../modules/db')

//Root
module.exports.root = (req, res) => res.render('users/index', {
  users: db.get('users').value()
})

//Search
module.exports.search=(req, res) => {
  let q = req.query.q

  let matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

  res.render('users/index',{
    users: matchedUsers,
    q: q
  })
}

//Create
module.exports.create = (req, res) => {
  res.render('users/create')
}

//View Info
module.exports.viewInfo= (req, res) => {
  const id = req.params.id
  const user = db.get('users').find({ id: id }).value()

  res.render('users/view', {
    user: user
  })
}

//Post Create
module.exports.postCreate= (req, res) => {
  req.body.id = shortid.generate()

  let errors = []

  if (!req.body.name) {
    errors.push('Name is required')
  }
  if (!req.body.phone) {
    errors.push('Phone is required')
  }

  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return
  }
  db.get('users').push(req.body).write()

  res.redirect('/users')
}