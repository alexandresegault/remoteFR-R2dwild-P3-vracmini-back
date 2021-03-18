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
  connection.query('SELECT * FROM vracn_co ', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.put('/', (req, res) => {
  const newPage = req.body
  const id = 1
  connection.query(
    'UPDATE aux_fourneaux SET ? WHERE id = ?',
    [newPage, id],
    (err, results) => {
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
