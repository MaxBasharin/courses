const dom = {
	new: document.getElementById('new'),
	add: document.getElementById('add'),
	tasks: document.getElementById('tasks')
}

const tasks = []

// Отслеживаем клик по кнопке Добавить задачу
dom.add.onclick = () => {
	const newTaskText = dom.new.value // берет значение поля с id new
	if (newTaskText && isNotHaveTask(newTaskText, tasks)) // если в task что-то есть, то выполнять функцию addTask
	{
		addTask(newTaskText, tasks)
		dom.new.value = '' // очищет поле input
		tasksRender(tasks)
		console.log(tasks)
	}
}

// Функция добавления задачи

function addTask(text, list) {
	const timestamp = Date.now() // date.now берёт значение даты в милисекундах
	const task = {
		id: timestamp,
		text: text,
		isComplete: false
	}
	list.push(task) // push метод добавления 
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

// функция вывода списка задач на страницу
function tasksRender(list) {
	let htmlList = ''

	list.forEach((task) => {
		const cls = task.isComplete
			? // если task.isComplete = true то 
			'todo__task todo__task_complate'
			: // если task.isComplete = false то
			'todo__task'
			const checked = task.isComplete ? 'checked' : ''

		const taskHtml = `
		<div class="${cls}" id="${task.id}">
			<label  class="todo__checkbox" >
				<input type="checkbox" ${checked}><div class="todo__checkbox-div"></div>
			</label>
			<div class="todo__task-text">
				${task.text}
			</div>
			<button type="button" class="todo__task-del">
			</button>
	</div>
		`

		htmlList = htmlList + taskHtml
	})

	dom.tasks.innerHTML = htmlList
}

// Отслеживаем клик по checkbox задачи 
dom.tasks.onclick = (event) => { // определяет по какому элементу произошёл клик 
	const target = event.target
	const isCheckboxEl = target.classList.contains('todo__checkbox-div')
	const isDeleteEL = target.classList.contains('todo__task-del')
	
	if (isCheckboxEl) { //parentNode поднимает на уровень выше
		const task = target.parentElement.parentElement
		const taskId = task.getAttribute('id')
		changeTaskStatus(taskId, tasks)
		tasksRender(tasks) // перерисовка
	}
	if (isDeleteEL) {
		const task = target.parentElement
		const taskId = task.getAttribute('id')
		deleteTask(taskId, tasks)
		tasksRender(tasks) // перерисовка
	}
}

// функция изменения статуса задачи
function changeTaskStatus(id, list) {
	list.forEach((task) => {
		if (task.id == id) {
			task.isComplete = !task.isComplete
		}
	})
}

// функция удаления задачи 
function deleteTask(id, list) {
	list.forEach((task, idx) => {
		if (task.id == id) {
			list.splice(idx, 1) // вырезать эелемнт массива 
		}
	})
}