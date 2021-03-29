const express = require('express')
const connection = require('../src/config')
const router = express.Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM vracn_co ', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO vracn_co SET ?', req.body, err => {
    if (err) {
      res.status(500).send('error adding data')
    } else {
      res.status(200).send('data successfully added')
    }
  })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'UPDATE vracn_co SET ? WHERE id = ?',
    [req.body, id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating page')
      } else {
        res.status(200).send('Page successfully updated')
      }
    }
  )
})

module.exports = router
