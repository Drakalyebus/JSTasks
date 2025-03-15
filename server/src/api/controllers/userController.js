const UserModel = require('../models/user.model')

class UserController {
	static async getUsers(req, res) {
		try {
			const users = await UserModel.find()
			res.send(users)
		} catch (err) {
			console.log('Произошла ошибка при получении пользователей', err)
			res.send({ message: 'Произошла ошибка при получении пользователей', err })
		}
	}

	static async getUser(req, res) {
		const { id } = req.params
		try {
			const user = await UserModel.findById(id)
			res.send(user)
		} catch (err) {
			console.log('Произошла ошибка при получении пользователя по id', err)
			res.send({ message: 'Произошла ошибка при получении пользователя по id', err })
		}
	}

	static async updateUser(req, res) {
		const { id } = req.params
		const { name } = req.body

		try {
			const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { name } })
			res.send('Пользоватеь успешно обновлён')
		} catch (err) {
			console.log('Произошла ошибка при изменении пользователя по id', err)
			res.send({ message: 'Произошла ошибка при изменении пользователя по id', err })
		}
	}

	static async addUser(req, res) {
		const { name, age, isVerified } = req.body
		try {
			const newUser = new UserModel({
				name,
				age,
				isVerified
			})

			const savedUser = await newUser.save()
			res.status(201).send(savedUser)
		} catch (err) {
			console.log('Ошибка при создании пользователя', err)
			res
				.status(500)
				.send({ message: `Ошибка при создании пользователя: ${err.message}` })
		}
	}
	static async deleteUser(req, res) {
		const { id } = req.params
		try {
			await UserModel.findByIdAndDelete(id)
			res.send('Пользователь успешно удалён')
		} catch (err) {
			console.log('Произошла ошибка при удалении пользователя по id', err)
			res.send({ message: 'Произошла ошибка при удалении пользователя по id', err })
		}
	}
}

module.exports = UserController
