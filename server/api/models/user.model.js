const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: { type: String },
	age: { type: Number },
	verified: { type: Boolean }
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel
