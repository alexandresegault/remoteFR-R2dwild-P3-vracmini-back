const express = require('express')
const connection = require('../src/config')
const aboutUs = require('./aboutUs')
const aliments = require('./aliments')
const auxFourneaux = require('./aboutUs')
const categorieAlim = require('./categorieAlim')
const categorieRecettes = require('./categorieRecettes')
const categoriePodcastArticle = require('./categoriePodcastArticle')
const connexionAdmin = require('./connexionAdmin')
const contact = require('./connexionAdmin')
const interCategoriePodcastArticle = require('./interCategoriePodcastArticle')
const podcastArticle = require('./podcastsArticle')
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
    podcastArticle,
    recettes,
    vracEnsemble,
    vracNCo
}