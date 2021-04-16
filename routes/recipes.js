const express = require('express')
const connection = require('../src/config')
const router = express.Router()

router.get('/', (req, res) => {
  let sql = 'SELECT * FROM recipes'
  let sqlValues = []
  if (req.query.categories_recipes_id) {
    sql += ' WHERE categories_recipes_id = ?'
    sqlValues.push(req.query.categories_recipes_id)
  }
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})
router.get('/search', (req, res) => {
  connection.query('SELECT * FROM recipes', (err, results) => {
    err
      ? res.status(404).send('Error retrieving data')
      : res
          .status(200)
          .json(
            results.filter(recipe => recipe.title.includes(req.query.title))
          )
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
