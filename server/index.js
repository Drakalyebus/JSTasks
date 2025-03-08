const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./api/models/user.model')
require('dotenv').config()

const app = express()

// получение порта из .env
const PORT = process.env.PORT || 3000
// получение строки подключения к MongoDB
const MONGO_URI = process.env.MONGO_URI

// логирующий morgan миддлвейр
app.use(morgan(':method :url :status'))
// миддлвейр для парсинга входящего запроса
app.use(express.json())
// cors
const allowedOrigins = ['http://127.0.0.1:5500']
app.use(
	cors({
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
		origin: allowedOrigins
	})
)

// роуты
app.delete('/deleteUser/:id', async (req, res) => {
	try {
		await UserModel.findByIdAndDelete(req.params.id);
	} catch (error) {}
	res.sendStatus(200);
});
app.get('/verifiedQuantity', async (req, res) => {
	try {
		const data = await UserModel.find({ verified: true });
		res.send(data.length.toString());
	} catch (error) {}
});
app.get('/allUsersOlder/:age', async (req, res) => {
	try {
		const data = await UserModel.find({ age: { $gt: +req.params.age } });
		res.json(data);
	} catch (error) {}
});
app.delete('/deleteUnverified', async (req, res) => {
	try {
		await UserModel.deleteMany({ verified: false });
		res.sendStatus(200);
	} catch (error) {}
});

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch(err => {
		console.error('Connection to MongoDB failed', err)
	})

app.listen(PORT, () => {
	console.log(`server is listening port: ${PORT}`)
})
