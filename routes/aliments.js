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
  connection.query('SELECT * FROM aliments', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

// router.post('/', (req, res) => {
//   const { content, name, url_img } = req.body
//   connection.query(
//     'INSERT INTO aliments(content, name, url_img) VALUES(?,?,?)',
//     [content, name, url_img],
//     (err, results) => {
//       if (err) {
//         console.log(err)
//         res.status(500).send('Error adding data')
//       } else {
//         res.status(200).send('Success adding data !')
//       }
//     }
//   )
// })

module.exports = router
