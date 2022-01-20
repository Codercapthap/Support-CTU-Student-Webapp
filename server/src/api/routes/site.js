const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/')
  .get(() => {
    res.send('Hello World')
  })

module.exports = router