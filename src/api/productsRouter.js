const express = require('express')
const Products = require('../models/products')
const products = new Products()

const router = express.Router()

router.get('/products', getAllProducts)
router.get('/products/:id', getOneProducts)

router.post('/products', postProducts)
router.put('/products/:id', editProducts)
router.delete('/products/:id', destroyProducts)

function getAllProducts (req, res, next) {
  products.read()
    .then(result => {
      const output = {
        count: result.length,
        data: result
      }
      res.status(200).json(output)
    })
    .catch(next)
}

function getOneProducts (req, res, next) {
  products.read(req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
}

function postProducts (req, res, next) {
  products.create(req.body)
    .then(result => {
      res.status(201).json(result)
    })
}

function editProducts (req, res, next) {
  products.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
}

function destroyProducts (req, res, next) {
  products.delete(req.params.id)
    .then(result => {
      res.status(202).json(result)
    })
    .catch(next)
}

module.exports = router
