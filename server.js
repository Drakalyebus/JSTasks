import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

const app = express();

function pathToFile(pathToFile) {
    return path.join(__dirname, pathToFile);
}

app.use(async (req, res) => {await fs.appendFile(pathToFile('pages/requests.log'), `${new Date().toLocaleDateString('ru-RU')} ${req.method} ${req.url}\n`, 'utf-8'); req.next();});

app.use(express.static(path.join(__dirname, 'pages')));

app.use(async (req, res) => {await fs.appendFile(pathToFile('pages/requests.log'), `${new Date().toLocaleDateString('ru-RU')} ${req.method} ${req.url}\n`, 'utf-8'); req.next();});

app.get('/', async (req, res) => {
    await fs.writeFile(pathToFile('pages/visits.txt'), (+(await fs.readFile(pathToFile('pages/visits.txt'), 'utf-8')) + 1).toString(), 'utf-8');
    await res.sendFile(pathToFile('pages/main.html'));
});

app.get('/about', async (req, res) => {
    await res.sendFile(pathToFile('pages/about.html'));
});

app.get('/contact', async (req, res) => {
    await res.sendFile(pathToFile('pages/contact.html'));
});

app.get('/data', async (req, res) => {
    await res.sendFile(pathToFile('pages/data.json'));
});

app.get('/stats', async (req, res) => {
    await res.sendFile(pathToFile('pages/visits.txt'));
});

app.use(async (req, res) => {
    await res.status(404).sendFile(pathToFile('pages/404.html'));
});

app.listen(3000, () => {});