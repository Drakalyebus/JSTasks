const getAllBtn = document.querySelector('.c1-button')
const getUserByIdBtn = document.querySelector('.c2-button')
const addUserBtn = document.querySelector('.c3-button')
const c1Container = document.querySelector('.c1-container')
const c2Container = document.querySelector('.c2-container')
const c3Container = document.querySelector('.c3-container')
const inputId = document.querySelector('#id')
const searchId = document.querySelector('#searchId')
const inputName = document.querySelector('#name')
const inputAge = document.querySelector('#age')

let got = false;
// inputAge.value

// Получение пользователей
const getDataFunction = async url => {
	const getData = async url => {
		const res = await fetch(url)
		const json = await res.json()
		return json
	}

	try {
		const data = await getData(url)
		return data
	} catch (error) {
		console.log(`Произошла ошибка в getData, ${error.message}`)
	}
}

// Добавление пользователя
const postDataFunction = async (url, obj) => {
	const postData = async (url, obj) => {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		const json = await res.json()
		return json
	}

	try {
		const data = await postData(url, obj)
		return data
	} catch (error) {
		console.log(`Произошла ошибка в postData, ${error.message}`)
	}
}

getAllBtn.addEventListener('click', async () => {
	if (!got) {
		const data = JSON.parse(await getDataFunction('http://localhost:3000/getUsers'))
		data.forEach(user => {
			c1Container.insertAdjacentHTML(
				`beforeend`,
				`<p>${user.id}:${user.name}, ${user.age}</p>`
			)
		})
		got = true
		console.log(data)
	}
})

getUserByIdBtn.addEventListener('click', async () => {
	const user = await getDataFunction(`http://localhost:3000/getUsers/${searchId.value}`)
	c2Container.innerHTML = ''
	c2Container.insertAdjacentHTML(
		`beforeend`,
		`<p>${user.id}:${user.name}, ${user.age}</p>`
	)
})

addUserBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	const user = {
		id: inputId.value,
		name: inputName.value,
		age: inputAge.value
	}
	await postDataFunction('http://localhost:3000/addUser', user)
	got = false
})