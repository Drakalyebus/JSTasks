const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')

const PORT = 3000
const app = express()

// функция получения пути
const getPath = filename => path.join(__dirname, 'public', `${filename}.html`)

// миддлвейр для подключения статических файлов (css, js, изображения и т.д.)
app.use(express.static(path.join(__dirname, 'public')))
// логирующий morgan миддлвейр
app.use(morgan(':method :url :status'))
// миддлвейр для парсинга входящего запроса
app.use(express.json())
// cors
const allowedOrigins = ['http://127.0.0.1:5500']
app.use(
	cors({
		methods: ['GET', 'POST'],
		origin: allowedOrigins
	})
)

// роутинг
app.get('/', (req, res) => {
	res.sendFile(getPath(`index`))
})
app.get('/about', (req, res) => {
	res.sendFile(getPath(`about`))
})
app.get('/data', (req, res) => {
	res.json({ message: 'Это json-ответ от сервера' })
})
app.get('/home', (req, res) => {
	res.redirect('/')
})

// параметрический роут
app.get('/user-info/:id', (req, res) => {
	const userId = parseInt(req.params.id)
	if (userId === 1) {
		res.send(`
			Пользователь с id :${userId}, Иван
			`)
	} else if (userId === 2) {
		res.send(`
			Пользователь с id :${userId}, Ибрагим
			`)
	} else {
		res.status(404).send('Пользователь не найден')
	}
})

// query роут
// /search?query=...
app.get('/search', (req, res) => {
	const query = req.query.query.toLowerCase()
	const words = ['яблоко', 'банан', 'апельсин', 'ананас']

	const result = words.filter(word => word.includes(query))

	res.json({ result })
})

//! Работа с пользователями
app.get('/getUsers', (req, res) => {
	try {
		const users = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
		res.json(users)
	} catch (error) {
		console.log('Ошибка при получении пользователей', error)
		res.send('Ошибка при получении пользователей', error)
	}
})
app.get('/getUsers/:id', (req, res) => {
	try {
		const { id } = req.params
		const users = JSON.parse(
			fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
		)
		const user = users.find(user => user.id == id)
		res.json(user)
	} catch (error) {
		console.log('Ошибка при получении пользователя', error)
		res.send('Ошибка при получении пользователя', error)
	}
})
app.post('/addUser', (req, res) => {
	try {
		const user = req.body
		const users = JSON.parse(
			fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
		)
		users.push(user)
		fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(users))
		res.send(`Пользователь ${user} успешно добавлен`)
	} catch (error) {
		console.log('Ошибка при добавлении пользователя', error)
		res.send('Ошибка при добавлении пользователя', error)
	}
})

// обработка ошибки 404
app.use((req, res) => {
	res.status(404).sendFile(getPath('404'))
})

app.listen(PORT, () => {
	console.log(`server is listening port: ${PORT}`)
})
