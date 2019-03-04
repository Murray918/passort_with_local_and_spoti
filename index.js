const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const session = "express-session"
const passport = require("passport")

const PORT = process.env.NODE_ENV || 8080
const isProduction = process.env.NODE_ENV === 'production'
const app = express()

mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, "public")))
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
)


app.get("/", (req, res, next) => {
  console.log("server was hit by the client")
  res.send("you have atttacccckkkkeeeeedddd")
})

app.listen(() => {
  console.log(`Your server is running on ${PORT}`)
})