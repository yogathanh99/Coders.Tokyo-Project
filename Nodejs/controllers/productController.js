/* const db = require('../modules/db')

//Root
module.exports.root = (req, res) => {
  const page = req.query.page || 1;

  const perPage = 9;
  const start = (page - 1) * perPage
  const end = page * perPage

  res.locals.page=page

  res.render('product/index', { */
  /*     products: db.get('products').value().slice(start,end) */
/*     products: db.get('products').drop(start).take(perPage).value() //Using lodash
  })
} */
//--> This is old version, using local database

//New version
const Product = require('../models/productModel')

module.exports.root = async (req, res) => {
  const products = await Product.find()
  res.render('product/index', {
    products: products
  })
}