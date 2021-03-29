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

router.post('/', (req, res) => {
  connection.query('INSERT INTO aliments SET ?', [req.body], err => {
    if (err) {
      console.log(err)
      res.status(500).send('Error adding data')
    } else {
      res.status(200).send('Success adding data !')
    }
  })
})

module.exports = router
