const ProductsModel = require('../models/products')

async function get(req, res) {
    const { id } = req.params /// Se tiver vindo no posto, pega pelo body, se tiver vindo no query string (?id=123), pega pelo query.

    const obj = id ? { _id: id } : null

    const products = await ProductsModel.find(obj)

    res.send(products)
}

async function post(req, res) {
    const {
        name,
        brand,
        price,
    } = req.body // recebe do body, porque é post

    const product = new ProductsModel({
        name,
        brand,
        price,
    })

    product.save() // até este ponto, houve a inserção no banco de dados

    res.send({
        message: 'success'
    }) // aqui o envio
}

module.exports = {
    get,
    post,
}