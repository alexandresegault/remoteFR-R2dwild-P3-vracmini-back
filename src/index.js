const express = require('express')
const cors = require('cors')
const app = express()

const authRouter = require('../routes/auth.js')
const connection = require('../src/config')
const routes = require('../routes/index')
const port = 4242

app.use(cors('*'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use('/auth', authRouter)

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

app.use('/api/about_us', routes.aboutUs, function (req, res, next) {
  next()
})

app.use(
  '/api/aux_fourneaux/aliments',
  routes.aliments,
  function (req, res, next) {
    next()
  }
)

app.use('/api/aux_fourneaux', routes.auxFourneaux, function (req, res, next) {
  next()
})

app.use(
  '/api/aux_fourneaux/categories_aliments',
  routes.categoriesAliments,
  function (req, res, next) {
    next()
  }
)

app.use(
  '/api/aux_fourneaux/categories_recipes',
  routes.categoriesRecipes,
  function (req, res, next) {
    next()
  }
)

app.use(
  '/api/aux_fourneaux/recipes',
  routes.recipes,
  function (req, res, next) {
    next()
  }
)

app.use(
  '/api/categories_podcasts_articles',
  routes.categoriesPodcastsArticles,
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
  '/api/podcasts_articles',
  routes.podcastsArticles,
  function (req, res, next) {
    next()
  }
)

app.use('/api/vracn_co', routes.vracNCo, function (req, res, next) {
  next()
})

app.listen(port, () => {
  console.log(`Server is runing on ${port}`)
})
