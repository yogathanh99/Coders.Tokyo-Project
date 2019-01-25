module.exports.validation = (req, res, next) => {
  const patterns = {
    phone: /^\d{11}$/,
    password: /^[\w@-]{8,20}$/
  }
  let errors = []

  if (!req.body.name) {
    errors.push('Name is required')
  }
  if (!req.body.phone) {
    errors.push('Phone is required')
  }
  if (!patterns.phone.test(req.body.phone)) {
    errors.push('Phone must have 11 numbers')
  }
  if (!patterns.password.test(req.body.password)) {
    errors.push('Password must alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters')
  }

  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return
  }

  next()
}