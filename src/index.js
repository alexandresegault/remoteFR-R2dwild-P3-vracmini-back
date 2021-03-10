const express = require('express')
const connection = require('../../../../other/quest-express-01/src/config')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.send('Chicken World!')
})

// route aliments
app.get('/api/aux_fourneaux/categorie_aliments/aliments', (req, res) => {
  connection.query("SELECT * FROM Aliments", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route aux_fourneaux
app.get('/api/aux_fourneaux', (req, res) => {
  connection.query("SELECT * FROM Aux_fourneaux", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route categorie_aliments
app.get('/api/aux_fourneaux/categorie_aliments', (req, res) => {
  connection.query("SELECT * FROM Categorie_aliments", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route categorie_recettes
app.get('/api/aux_fourneaux/categorie_recettes', (req, res) => {
  connection.query("SELECT * FROM categorie_recettes", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route recettes
app.get('/api/aux_fourneaux/categorie_recettes/recettes', (req, res) => {
  connection.query("SELECT * FROM recettes", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route connexion_admin
app.get('/api/connexion_admin', (req, res) => {
  connection.query("SELECT * FROM Connexion_admin", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route contact
app.get('/api/contact', (req, res) => {
  connection.query("SELECT * FROM Contact ", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route vracn_co
app.get('/api/vracn_co', (req, res) => {
  connection.query("SELECT * FROM Vracn_co ", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route vrac_ensemble
app.get('/api/vrac-ensemble', (req, res) => {
  connection.query("SELECT * FROM Vrac-ensemble ", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

// route about_us
app.get('/api/about_us', (req, res) => {
  connection.query("SELECT * FROM about_us ", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})

app.get('/api/categorie_podcast_article', (req, res) => {
  connection.query("SELECT * FROM categorie_podcast_article ", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})
app.get('/api/categorie_podcast_article/podcasts_article', (req, res) => {
  connection.query("SELECT * FROM podcasts_article ", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})
app.get('/api/categorie_podacts', (req, res) => {
  connection.query("SELECT * FROM categorie_podcast_article_has_podcasts_article ", (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
  })
})




app.listen(4242, () => console.log('Express server is running'))