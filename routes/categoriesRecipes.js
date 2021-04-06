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
  connection.query('SELECT * FROM categories_recipes', (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO categories_recipes SET ?', req.body, err => {
    if (err) {
      console.log(err)
      res.status(500).send('Error adding recipes')
    } else {
      res.status(200).send('Success adding recipes')
    }
  })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newName = req.body
  connection.query(
    'UPDATE categories_recipes SET ? WHERE id=?',
    [newName, id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error updating a recipes')
      } else {
        res.status(200).send('Recipes successfully updated')
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const idRecipe = req.params.id
  connection.query(
    'DELETE FROM categories_recipes WHERE id = ?',
    [idRecipe],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('😱 Error deleting an category')
      } else {
        res.status(200).send('🎉 Recipe deleted!')
      }
    }
  )
})

module.exports = router
