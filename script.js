
const list = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');

// Стартовые задачи
list.innerHTML = '<li>Первая задача</li><li>Вторая задача</li>';
list.innerHTML += '<li>Третья задача</li>';



// Добавляем взаимодействие с кнопкой


// Обработчик клика на кнопку
addBtn.addEventListener('click', function () {
    const text = taskInput.value.trim(); //убираем пробелы в начале и в конце
    if(text === '') {
        alert('Введите текст задачи!');
        return; // выходим из функции, ничего не добавляем
    }
    list.innerHTML += '<li>' + text + '</li>';
    taskInput.value = ''; // очищаем поле после добавления
});

// Обработчик нажатия на Enter в поле ввода
taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const text = taskInput.value.trim();
        if (text === '') {
            alert('Введите текст задачи!');
            return;
        }
        list.innerHTML += '<li>' + text + '</li>';
        taskInput.value = '';
    }
});
