const express = require('express')
const connection = require('../src/config')
const router = express.Router()

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM categories_podcasts_articles ',
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
  connection.query(
    'INSERT INTO categories_podcasts_articles SET ?',
    req.body,
    err => {
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
    'UPDATE categories_podcasts_articles SET ? WHERE id = ?',
    [newCategorie, id],
    err => {
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
    'DELETE FROM categories_podcasts_articles WHERE id = ?',
    [id],
    err => {
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
