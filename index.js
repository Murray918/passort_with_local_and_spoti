const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
const login = require("./auth/routes")
const PORT = process.env.NODE_ENV || 8080
const isProduction = process.env.NODE_ENV === "production"
const app = express()

mongoose.connect(
  "mongodb://localhost:27017/myapp",
  { useNewUrlParser: true },
  () => {
    console.log("connected to mongodb")
  }
)

app.use(cors())
app.use(require("cookie-parser")())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(passport.initialize())
app.use(passport.session())

app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave : true
  })
)

app.use("/login", login)



app.listen(PORT, () => {
  console.log(`Your server is running on ${PORT}`)
})
