const express = require('express')
const connection = require('../src/config')
const router = express.Router()

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

router.get('/search', (req, res) => {
  connection.query('SELECT * FROM aliments', (err, results) => {
    err
      ? res.status(404).send('Error retrieving data')
      : res
          .status(200)
          .json(results.filter(alim => alim.name.includes(req.query.name)))
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'SELECT * FROM aliments WHERE id = ?',
    id,
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`)
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'UPDATE aliments SET ? WHERE id=?',
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
  connection.query('DELETE FROM aliments WHERE id=?', id, (err, results) => {
    if (err) {
      res.status(500).send('Error deleting data')
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
