const dom = {
	new: document.getElementById('new'),
	add: document.getElementById('add'),
	tasks: document.getElementById('tasks')
}

const tasks = []

// Отслеживаем клик по кнопке Добавить задачу
dom.add.onclick = () => {
	const newTaskText = dom.new.value // берет значение поля с id new
	if (newTaskText && isNotHaveTask(newTaskText, tasks)) { // если в task что-то есть, то выполнять функцию addTask
		addTask(newTaskText, tasks)
		dom.new.value = '' // очищет поле input
	}
}

// Функция добавления задачи

function addTask(textValue) {
	const timestamp = Date.now() // date.now берёт значение даты в милисекундах
	const task = {
		id: timestamp,
		text: textValue,
		isComplate: false
	}
	tasks.push(task) // push метод добавления 
	console.log(tasks)
}

// проверка существования задачи в массиве задач

function isNotHaveTask(text, list) {
	let isNotHave = true

	list.forEach((task) => { // если текст равен тексту полученому из Input
		if (task.text === text) {
			alert('задача уже существует')
			isNotHave = false
		}
	});

	return isNotHave
}
