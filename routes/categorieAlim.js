const express = require('express')
const connection = require('../src/config')
const router = express.Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

router.get('/api/aux_fourneaux/categorie_aliments', (req, res) => {
    connection.query("SELECT * FROM categorie_aliments", (err, results) => {
        if (err) {
          res.status(500).send("Error retrieving data");
        } else {
          res.status(200).json(results);
        }
    })
  })

  module.exports = router