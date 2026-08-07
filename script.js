const list = document.getElementById('taskList');
console.log(list.innerHTML); // выведет: "<li>Купить молоко</li>"
list.innerHTML = '<li>Первая задача</li><li>Вторая задача</li>';
list.innerHTML += '<li>Третья задача</li>';

// Добавляем задачу в консоли (пустая строка)
const taskInput = document.getElementById('taskInput');
const text = taskInput.value;
list.innerHTML += '<li>' + text + '</li>';