import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  // Получаем токен из заголовка
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;   // Добавляем userId в запрос
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Неверный токен' });
  }
}