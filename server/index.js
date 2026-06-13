import express from 'express';
import cors from 'cors';

const app = express();

// Мидлвары
app.use(cors());                    // Разрешить запросы с фронтенда
app.use(express.json());            // Парсить JSON в теле запроса

// Данные (позже будут в MongoDB)
const skills = [
  { id: 1, title: 'Программирование', desc: 'Python, JavaScript, Java', category: 'languages' },
  { id: 2, title: 'Веб-разработка', desc: 'React, Django', category: 'frameworks' },
  { id: 3, title: 'Системное администрирование', desc: 'Linux, Docker', category: 'tools' },
  { id: 4, title: 'Базы данных', desc: 'MySQL, MongoDB', category: 'tools' },
  { id: 5, title: 'Контроль версий', desc: 'Git', category: 'tools' },
  { id: 6, title: 'API', desc: 'REST, GraphQL', category: 'frameworks' },
];

// --- Маршруты API ---

// GET /api/skills — получить все навыки
app.get('/api/skills', (req, res) => {
  res.json(skills);
});

// GET /api/skills/:id — получить один навык
app.get('/api/skills/:id', (req, res) => {
  const id = Number(req.params.id);
  const skill = skills.find(s => s.id === id);
  if (!skill) {
    return res.status(404).json({ error: 'Навык не найден' });
  }
  res.json(skill);
});

// POST /api/skills — создать навык
app.post('/api/skills', (req, res) => {
  const { title, desc, category } = req.body;
  if (!title || !desc || !category) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }
  const newSkill = {
    id: skills.length + 1,
    title,
    desc,
    category,
  };
  skills.push(newSkill);
  res.status(201).json(newSkill);
});

// Запуск сервера
const PORT = 3001;

// DELETE /api/skills/:id — удалить навык
app.delete('/api/skills/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = skills.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Навык не найден' });
  }
  skills.splice(index, 1);
  res.json({ message: 'Навык удалён' });
});

// PUT /api/skills/:id — обновить навык
app.put('/api/skills/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, desc, category } = req.body;
  const skill = skills.find(s => s.id === id);
  if (!skill) {
    return res.status(404).json({ error: 'Навык не найден' });
  }
  if (title) skill.title = title;
  if (desc) skill.desc = desc;
  if (category) skill.category = category;
  res.json(skill);
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});