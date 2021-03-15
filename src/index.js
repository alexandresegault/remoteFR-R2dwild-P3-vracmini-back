const express = require('express')
const cors = require('cors')
const connection = require('../src/config')
const routes = require('../routes/index')
const port = 4242
const app = express()

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

app.use(cors('*'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/api/about_us', routes.aboutUs, function (req, res, next) {
  next()
})
app.use(
  '/api/aux_fourneaux/categorie_aliments/aliments',
  routes.aliments,
  function (req, res, next) {
    next()
  }
)
app.use('/api/aux_fourneaux', routes.auxFourneaux, function (req, res, next) {
  next()
})
app.use(
  '/api/aux_fourneaux/categorie_aliments',
  routes.categorieAlim,
  function (req, res, next) {
    next()
  }
)
app.use(
  '/api/aux_fourneaux/categorie_recettes',
  routes.categorieRecettes,
  function (req, res, next) {
    next()
  }
)
app.use(
  '/api/categorie_podcast_article',
  routes.categoriePodcastArticle,
  function (req, res, next) {
    next()
  }
)
app.use(
  '/api/connexion_admin',
  routes.connexionAdmin,
  function (req, res, next) {
    next()
  }
)
app.use('/api/contact', routes.contact, function (req, res, next) {
  next()
})
app.use(
  '/api/inter_categorie_pod_art',
  routes.interCategoriePodcastArticle,
  function (req, res, next) {
    next()
  }
)
app.use(
  '/api/categorie_podcast_article/podcasts_article',
  routes.podcastArticle,
  function (req, res, next) {
    next()
  }
)
app.use(
  '/api/aux_fourneaux/categorie_recettes/recettes',
  routes.recettes,
  function (req, res, next) {
    next()
  }
)
app.use('/api/vrac-ensemble', routes.vracEnsemble, function (req, res, next) {
  next()
})
app.use('/api/vracn_co', routes.vracNCo, function (req, res, next) {
  next()
})

app.get('/', (req, res) => {
  res.send('Chicken World!')
})

app.listen(port, () => {
  console.log(`Server is runing on 4242`)
})
