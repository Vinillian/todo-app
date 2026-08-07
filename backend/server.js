const express = require('express');
const app = express();

// Разрешаем запросы с фронта (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Позволяем серверу читать JSON в теле запроса
app.use(express.json());

// Хранилище задач (в памяти)
let tasks = [
    'Купить молоко',
    'Выучить JavaScript'
];

// GET /tasks – возвращает список задач
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks – добавляет новую задачу
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Текст задачи обязателен' });
    }
    tasks.push(text.trim());
    res.status(201).json({ message: 'Задача добавлена', tasks });
});

// Запускаем сервер на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});