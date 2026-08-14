const http = require('http');

const server = http.createServer((req, res) => {
    // Устанавливаем правильную кодировку для всех ответов
    // (но в зависимости от типа контента можно варьировать)
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Главная страница</h1>');
    } 
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>О нас</h1><p>Это учебный сервер</p>');
    }
    else if (req.url === '/tasks') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Здесь будет список задач');
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 — Страница не найдена');
    }
});

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});