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

  let sql = 'SELECT * FROM aliments'
  const sqlValues = []
  if (req.query.categories_aliments_id) {
    sql += ' WHERE categories_aliments_id = ?'
    sqlValues.push(req.query.categories_aliments_id)
  }
  connection.query(sql, sqlValues, (err, results) => {

    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})


router.get('/:id', (req, res) => {
  const alimentId = req.params.id
  connection.query(
    'SELECT * FROM aliments WHERE id = ?',
    [alimentId],
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`)
      }
      if (results.length === 0) {
        return res.status(404).send('Aliment not found')
      }
      return res.json(results[0])
    }
  )
})


module.exports = router
