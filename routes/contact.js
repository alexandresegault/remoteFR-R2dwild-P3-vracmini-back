const express = require('express')
const connection = require('../src/config')
const router = express.Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM contact ', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
