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
router.get('/search', (req, res) => {
  connection.query('SELECT * FROM podcasts_articles', (err, results) => {
    err
      ? res.status(404).send('Error retrieving data')
      : res.json(
          results.filter(podart => podart.title.includes(req.query.title))
        )
  })
})

router.get('/article', (req, res) => {
  let sql = 'SELECT * FROM podcasts_articles WHERE isPodcast=0'
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(`An error occured : ${err}`)
    } else {
      res.status(200).json(results)
    }
  })
})

router.get('/podcast', (req, res) => {
  let sql = 'SELECT * FROM podcasts_articles WHERE isPodcast=1'
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(`An error occured : ${err}`)
    } else {
      res.status(200).json(results)
    }
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

router.get('/join/:id', (req, res) => {
  connection.query(
    'SELECT * FROM categories_podcasts_articles_has_podcasts_articles cpahpa WHERE cpahpa.podcasts_articles_id = ? ',
    [req.params.id],
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
  const { title, url_img, content, isPodcast } = req.body
  const { categories_podcasts_articles_id } = req.body
  const values = { title, url_img, content, isPodcast }
  connection.query(
    'INSERT INTO podcasts_articles SET ?',
    [values],
    (err, results) => {
      if (err) {
        res.status(500).send('Error adding data')
      } else {
        const podcasts_articles_id = results.insertId
        const values = []
        categories_podcasts_articles_id.forEach(elem => {
          let values2 = [elem, podcasts_articles_id]
          values.push(values2)
        })
        connection.query(
          'INSERT INTO `minimal`.`categories_podcasts_articles_has_podcasts_articles` (`categories_podcasts_articles_id`, `podcasts_articles_id`) VALUES ?',
          [values],
          err => {
            if (err) {
              console.log(err)
              res.status(500).send('Error joining data')
            } else {
              res
                .status(200)
                .send('successfully joining categories_podcasts_articles')
            }
          }
        )
      }
    }
  )
})

router.put('/:id', (req, res) => {
  connection.query(
    'UPDATE podcasts_articles SET ? WHERE id= ?',
    [req.body, req.params.id],
    err => {
      if (err) {
        res.status(500).send('Error retrieving data')
      } else {
        res.status(200).send('Article/Podcast successfully update')
      }
    }
  )
})
router.post('/join', (req, res) => {
  connection.query(
    'INSERT INTO categories_podcasts_articles_has_podcasts_articles SET ? ',
    [req.body],
    err => {
      if (err) {
        res.status(500).send('Error retrieving data')
      } else {
        res.status(200).send('Categorie succesfuly update')
      }
    }
  )
})
router.delete('/join/:id/:catId', (req, res) => {
  connection.query(
    'DELETE FROM categories_podcasts_articles_has_podcasts_articles cpahpa WHERE cpahpa.podcasts_articles_id = ? AND cpahpa.categories_podcasts_articles_id = ?',
    [req.params.id, req.params.catId],
    err => {
      if (err) {
        res.status(500).send('Error retrieving data')
      } else {
        res
          .status(200)
          .send('Succesfuly remove categorie from podcasts/articles')
      }
    }
  )
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'DELETE FROM categories_podcasts_articles_has_podcasts_articles cpahpa WHERE cpahpa.podcasts_articles_id = ? ',
    [id],
    err => {
      if (err) {
        res.status(500).send('Error separate data')
      } else {
        connection.query(
          'DELETE FROM podcasts_articles WHERE id = ?',
          [id],
          err => {
            if (err) {
              res.status(500).send('Error deleting data ')
            } else {
              res.status(200).send('Succesfuly deleting article/podcast')
            }
          }
        )
      }
    }
  )
})
module.exports = router
