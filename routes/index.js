const express = require('express')
const connection = require('../src/config')
const aboutUs = require('./aboutUs')
const aliments = require('./aliments')
const auxFourneaux = require('./auxFourneaux')
const categorieAlim = require('./categorieAlim')
const categorieRecettes = require('./categorieRecettes')
const categoriePodcastArticle = require('./categoriePodcastArticle')
const connexionAdmin = require('./connexionAdmin')
const contact = require('./contact')
const interCategoriePodcastArticle = require('./interCategoriePodcastArticle')
const podcastsArticle = require('./podcastsArticle')
const recettes = require('./recettes')
const vracEnsemble = require('./vracEnsemble')
const vracNCo = require('./vracNCo')

module.exports = {
  aboutUs,
  aliments,
  auxFourneaux,
  categorieAlim,
  categorieRecettes,
  categoriePodcastArticle,
  connexionAdmin,
  contact,
  interCategoriePodcastArticle,
  podcastsArticle,
  recettes,
  vracEnsemble,
  vracNCo
}
