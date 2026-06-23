import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRouter from './routes/auth.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB подключена'))
  .catch(err => console.error('❌ Ошибка MongoDB:', err.message));

// --- Модели ---
const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
});
const Skill = mongoose.model('Skill', skillSchema);

const seedSkills = [
  { title: 'Программирование', desc: 'Python, JavaScript, Java', category: 'languages' },
  { title: 'Веб-разработка', desc: 'React, Django', category: 'frameworks' },
  { title: 'Системное администрирование', desc: 'Linux, Docker', category: 'tools' },
  { title: 'Базы данных', desc: 'MySQL, MongoDB', category: 'tools' },
  { title: 'Контроль версий', desc: 'Git', category: 'tools' },
  { title: 'API', desc: 'REST, GraphQL', category: 'frameworks' },
];

Skill.countDocuments().then(count => {
  if (count === 0) {
    Skill.insertMany(seedSkills).then(() => console.log('📦 Начальные данные добавлены'));
  }
});

// --- Auth routes (публичные) ---
app.use('/api/auth', authRouter);

// --- Public routes ---
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Навык не найден' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Protected routes (нужен токен!) ---
app.post('/api/skills', authMiddleware, async (req, res) => {
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

app.put('/api/skills/:id', authMiddleware, async (req, res) => {
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

app.delete('/api/skills/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Навык не найден' });
    res.json({ message: 'Навык удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});