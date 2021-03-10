const express = require('express')
const connection = require('../src/config')
const app = express()
const routes = require('././routes/index')
const port = 3000

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
app.listen(port, () => {
  console.log(`Server is runing on 3000`);
});

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/about_us', routes.aboutUs)
app.use('/api/aux_fourneaux/categorie_aliments/aliments', routes.aliments)
app.use('/api/aux_fourneaux', routes.auxFourneaux)
app.use('/api/aux_fourneaux/categorie_aliments', routes.categorieAlim)
app.use('/api/aux_fourneaux/categorie_recettes', routes.categorieRecettes)
app.use('/api/categorie_podcast_article', routes.catPodArticle)
app.use('/api/connexion_admin', routes.connexionAdmin)
app.use('/api/contact', routes.contact)
app.use('/api/inter_categorie_pod_art', routes.interCategoriePodArt)
app.use('/api/categorie_podcast_article/podcasts_article', routes.podcastsArticle)
app.use('/api/aux_fourneaux/categorie_recettes/recettes', routes.recettes)
app.use('/api/vrac-ensemble', routes.vracEnsemble)
app.use('/api/vracn_co', routes.vracNCo)

app.get('/', (req, res) => {
  res.send('Chicken World!')
})


app.listen(4242, () => console.log('Express server is running'))