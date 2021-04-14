require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connection = require('../src/config')

const Router = express.Router()

const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

Router.get('/', (req, res, next) => {
  res.send('you are in get authentification')
})

Router.post('/signin', (req, res) => {
  connection.query('SELECT * from connexion_admin', (err, result) => {
    if (err) {
      res.status(400).send('Impossible car :' + err)
    } else {
      if (
        req.body.email === result[0].username &&
        bcrypt.compareSync(req.body.password, result[0].password)
      ) {
        const tokenUserinfo = {
          username: req.body.email
        }
        const token = jwt.sign(tokenUserinfo, process.env.JWT_SECRET)
        res.header('Access-Control-Expose-Headers', 'x-access-token')
        res.set('x-access-token', token)
        res.status(200).send({ details: 'user connected' })
      } else {
        res.status(400).send('Failed')
      }
    }
  })
})

Router.post('/protected', (req, res, next) => {
  const token = getToken(req)
  const objectTests = {
    //data appeler par la bdd
    test: 'ok'
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(200).send({ mess: token })
    }
    console.log('decode', decoded)
    return res.status(200).send({ mess: 'Donne du user', objectTests })
  })
})

module.exports = Router
