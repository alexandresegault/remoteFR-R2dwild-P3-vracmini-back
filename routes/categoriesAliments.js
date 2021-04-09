const express = require('express')
const connection = require('../src/config')
const router = express.Router()
const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

router.get('/', (req, res) => {
  connection.query('SELECT * FROM categories_aliments', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO categories_aliments SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error adding data')
    } else {
      res.status(200).send('Data successfully added')
    }
  })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'UPDATE categories_aliments SET ? WHERE id=?',
    [req.body, id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error updating data')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  connection.query('DELETE FROM categories_aliments WHERE id=?', id, err => {
    if (err) {
      res.status(500).send('Error deleting data')
    } else {
      res.status(200).send('Data successfully deleted')
    }
  })
})

module.exports = router
