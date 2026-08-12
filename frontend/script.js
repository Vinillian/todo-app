// frontend/script.js
const list = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

// --- Укажи здесь URL твоего бэкенда на Render ---
const API_BASE = 'https://todo-backend-tjpq.onrender.com'; // без слеша в конце!

// 1. Загрузка задач с сервера
async function loadTasks() {
    try {
        const response = await fetch(`${API_BASE}/tasks`);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const tasks = await response.json();
        list.innerHTML = tasks.map(text => `<li>${text}</li>`).join('');
    } catch (error) {
        console.error('Ошибка загрузки задач:', error);
        alert('Не удалось загрузить задачи. Проверьте соединение с сервером.');
    }
}

// 2. Добавление задачи
async function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
        alert('Введите текст задачи!');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        if (!response.ok) throw new Error('Ошибка добавления');
        taskInput.value = '';
        await loadTasks(); // обновляем список
    } catch (error) {
        console.error('Ошибка добавления:', error);
        alert('Не удалось добавить задачу. Проверьте соединение с сервером.');
    }
}

// 3. Обработчики событий
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// 4. Загружаем задачи при старте
loadTasks();