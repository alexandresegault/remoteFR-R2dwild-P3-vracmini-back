const express = require('express')
const connection = require('../../../../other/quest-express-01/src/config')
const app = express()
const aboutUs = require('./aboutUs')
const aliments = require('./aliments')
const auxFourneaux = require('./aboutUs')
const categorieAlim = require('./categorieAlim')
const categorieRecettes = require('./categorieRecettes')
const catPodArticle = require('./catPodArticle')
const connexionAdmin = require('./connexionAdmin')
const contact = require('./connexionAdmin')
const interCategoriePodArt = require('./interCategoriePodArt')
const podcastArticle = require('./podcastsArticle')
const recettes = require('./recettes')
const vracEnsemble = require('./vracEnsemble')
const vracNCo = require('./vracNCo')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send('Chicken World!')
})

module.exports = {
    aboutUs,
    aliments,
    auxFourneaux,
    categorieAlim,
    categorieRecettes,
    catPodArticle,
    connexionAdmin,
    contact,
    interCategoriePodArt,
    podcastArticle,
    recettes,
    vracEnsemble,
    vracNCo
}