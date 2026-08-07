const list = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

// 1. При загрузке страницы – загружаем задачи с сервера
async function loadTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    list.innerHTML = tasks.map(text => `<li>${text}</li>`).join('');
}

// 2. Функция добавления задачи через сервер
async function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Введите текст задачи!');
        return;
    }

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    if (response.ok) {
        taskInput.value = '';
        await loadTasks(); // перезагружаем список с сервера
    } else {
        alert('Ошибка при добавлении задачи');
    }
}

// 3. Навешиваем обработчики
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// 4. Загружаем задачи при старте
loadTasks();