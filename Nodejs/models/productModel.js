const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  numb: Number,
  name: String,
  image: String,
  description: String
})

const Product = mongoose.model('Product', productSchema, 'products')

module.exports=Product