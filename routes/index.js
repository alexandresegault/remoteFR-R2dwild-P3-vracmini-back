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