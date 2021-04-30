const ProductsModel = require('../models/products')

async function get(req, res) {
    const { id } = req.params /// Se tiver vindo no posto, pega pelo body, se tiver vindo no query string (?id=123), pega pelo query.

    const obj = id ? { _id: id } : null

    const products = await ProductsModel.find(obj)

    res.send(products)
}

module.exports = {
    get,
}