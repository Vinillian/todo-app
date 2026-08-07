
const list = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');

// Стартовые задачи
list.innerHTML = '<li>Первая задача</li><li>Вторая задача</li>';
list.innerHTML += '<li>Третья задача</li>';


// Общая функция для добавления

function addTask() {
    const text = taskInput.value.trim(); //убираем пробелы в начале и в конце
    if(text === '') {
        alert('Введите текст задачи!');
        return; // выходим из функции, ничего не добавляем
    }
    list.innerHTML += '<li>' + text + '</li>';
    taskInput.value = ''; // очищаем поле после добавления
}

// Обработчик клика на кнопку
addBtn.addEventListener('click', addTask);

// Обработчик нажатия на Enter в поле ввода
taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
       addTask();
    }
});
