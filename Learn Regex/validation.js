const inputs= document.querySelectorAll('input')

const patterns = {
  username: /^[a-z\d]{5,12}$/i,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^[\w@-]{8,20}$/,
  telephone: /^\d{11}$/,
  slug: /^[a-z\d-]{8,20}$/
}

function validate(field, regex){
  const checkValidate = regex.test(field.value)
  if (checkValidate) {
    field.classList.remove('invalid')
    field.classList.add('valid')
  }
  else {
    field.classList.remove('valid')
    field.classList.add('invalid')
  }
}

inputs.forEach(input => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.name])
  })
})