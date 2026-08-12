// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Подключение к MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('Ошибка: MONGODB_URI не задана в переменных окружения');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Подключено к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Схема и модель
const taskSchema = new mongoose.Schema({
    text: { type: String, required: true, trim: true }
});
const Task = mongoose.model('Task', taskSchema);

// GET /tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks.map(t => t.text));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /tasks
app.post('/tasks', async (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Текст задачи обязателен' });
    }
    try {
        const newTask = new Task({ text: text.trim() });
        await newTask.save();
        const allTasks = await Task.find();
        res.status(201).json({ message: 'Задача добавлена', tasks: allTasks.map(t => t.text) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});