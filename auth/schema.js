const mongoose = require('mongoose')
Schema = mongoose.Schema

const Users = new Schema({
    username : String,
    password : String
})

module.exports = Users