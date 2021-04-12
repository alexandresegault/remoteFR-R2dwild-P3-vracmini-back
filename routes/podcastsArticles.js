const express = require('express')
const connection = require('../src/config')
const router = express.Router()

router.get('/', (req, res) => {
  let sql =
    'SELECT * FROM podcasts_articles pa JOIN categories_podcasts_articles_has_podcasts_articles cap ON cap.podcasts_articles_id = pa.id'
  const sqlValues = []
  if (req.query.id != null) {
    sql += ' WHERE categories_podcasts_articles_id = ?'
    sqlValues.push(req.query.id)
  }
  connection.query(sql, sqlValues, (err, results) => {
    err
      ? res.status(500).send('Error retrieving data')
      : res.status(200).json(results)
  })
})

router.get('/:id', (req, res) => {
  const articleId = req.params.id
  connection.query(
    'SELECT * FROM podcasts_articles WHERE id = ?',
    [articleId],
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`)
      }
      if (results.length === 0) {
        return res.status(404).send('Article not found')
      }
      return res.json(results[0])
    }
  )
})
router.post('/', (req, res) => {
  connection.query('INSERT INTO podcasts_articles SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error adding data')
    } else {
      res.status(200).send('data successfully added')
    }
  })
})

router.post('/join', (req, res) => {
  connection.query(
    'INSERT INTO categories_podcasts_articles_has_podcasts_articles SET ?',
    req.body,
    err => {
      if (err) {
        res.status(500).send('Error joining data')
      } else {
        res
          .status(200)
          .send('successfully joining categories_podcasts_articles')
      }
    }
  )
})

module.exports = router
