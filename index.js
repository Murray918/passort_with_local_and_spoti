const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = ('express-session')
const passport = require('passport')


const PORT = 8080

const app = express()


mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

app.use(cors())
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
app.use(morgan('comdined'))


app.get('/', (req, res, next) => {
    console.log('server was hit by the client')
    res.send('you have atttacccckkkkeeeeedddd')
})

app.listen(() => {
    console.log(`Your server is running on ${PORT}`)
})

