const express = require('express')
const connection = require('../src/config')
const app = express()
const router = express.Router()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

router.get('/', (req, res) => {
  connection.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  connection.query('SELECT * FROM recipes WHERE id = ?', id, (err, results) => {
    if (err) {
      res.status(500).send('Error retreiving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO recipes SET ?', req.body, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error adding data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'UPDATE recipes SET ? WHERE id = ?',
    [req.body, id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retreiving data')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  connection.query('DELETE FROM recipes WHERE id = ?', id, err => {
    if (err) {
      res.status(500).send('Error deleting data')
    } else {
      res.status(200).send('Data successfully deleted')
    }
  })
})

module.exports = router
