import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// --- Подключение к MongoDB ---

const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB подключена'))
  .catch(err => console.error('❌ Ошибка MongoDB:', err.message));

// --- Схема и Модель ---
const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
});

const Skill = mongoose.model('Skill', skillSchema);

// --- Начальные данные (заполняются один раз) ---
const seedSkills = [
  { title: 'Программирование', desc: 'Python, JavaScript, Java', category: 'languages' },
  { title: 'Веб-разработка', desc: 'React, Django', category: 'frameworks' },
  { title: 'Системное администрирование', desc: 'Linux, Docker', category: 'tools' },
  { title: 'Базы данных', desc: 'MySQL, MongoDB', category: 'tools' },
  { title: 'Контроль версий', desc: 'Git', category: 'tools' },
  { title: 'API', desc: 'REST, GraphQL', category: 'frameworks' },
];

// Заполнить БД если пустая
Skill.countDocuments().then(count => {
  if (count === 0) {
    Skill.insertMany(seedSkills).then(() => console.log('📦 Начальные данные добавлены'));
  }
});

// --- Маршруты API ---

// GET /api/skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/skills/:id
app.get('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Навык не найден' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/skills
app.post('/api/skills', async (req, res) => {
  try {
    const { title, desc, category } = req.body;
    if (!title || !desc || !category) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }
    const newSkill = new Skill({ title, desc, category });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/skills/:id
app.put('/api/skills/:id', async (req, res) => {
  try {
    const { title, desc, category } = req.body;
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Навык не найден' });
    if (title) skill.title = title;
    if (desc) skill.desc = desc;
    if (category) skill.category = category;
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/skills/:id
app.delete('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Навык не найден' });
    res.json({ message: 'Навык удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Запуск сервера ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});