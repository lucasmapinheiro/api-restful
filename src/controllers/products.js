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

async function put(req, res) {
    const { id } = req.params

    const product = await ProductsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })

    res.send({
        message: 'success',
        product,
    })

    /*
    const product = await ProductsModel.findOne({ _id: id }) // acha o elemento. Poderia ser, também, o findById.

    await product.updateOne(req.body) // este método atualiza o objeto. O parâmetro req.body recebe tudo de uma vez e não só um elemento específico.

    res.send({
        message: 'success',
        product,
    })
    */
}

async function remove(req, res) {
    const { id } = req.params

    const remove = await ProductsModel.deleteOne({ _id: id })

    const message = remove.ok ? 'success' : 'error'

    res.send({
        message,
    })
}

module.exports = {
    get,
    post,
    put,
    remove,
}