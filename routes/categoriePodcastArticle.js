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
  connection.query(
    'SELECT * FROM categories_podcast_article ',
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving data')
      } else {
        res.status(200).json(results)
      }
    }
  )
})
router.post('/', (req, res) => {
  const { name } = req.body
  connection.query(
    'INSERT INTO categories_podcast_article(name) VALUES (?)',
    [name],
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error adding a category')
      } else {
        res.status(200).send('category successfully saved !')
      }
    }
  )
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const newCategorie = req.body
  connection.query(
    'UPDATE categories_podcast_article SET ? WHERE id = ?',
    [newCategorie, id],
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating a category')
      } else {
        res.status(200).send('Category successfully updated')
      }
    }
  )
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'DELETE FROM categories_podcast_article WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting a category')
      } else {
        res.status(200).send('Category successfully deleted')
      }
    }
  )
})
module.exports = router
