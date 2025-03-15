const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	age: { type: Number },
	isVerified: { type: Boolean }
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel
