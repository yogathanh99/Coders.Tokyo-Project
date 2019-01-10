const md5 = require('md5');

const db = require('../modules/db')

module.exports.login = (req, res) => {
  res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = db.get('users').find({ email: email }).value()

  if (!user) {
    res.render('auth/login', {
      errors: [
        'User does not exits.'
      ],
      values: req.body
    })
    return
  }
  const hashPassword= md5(password)
  if (hashPassword !== user.password) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      values: req.body
    })
    return
  }

  res.cookie('userId', user.id, {
    signed: true
  })
  res.redirect('/users')
}