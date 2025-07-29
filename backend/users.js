const express = require('express');
const router = express.Router();
const { users, tokens } = require('./db');

// Middleware: Check Auth
router.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(' ')[1];

  if (!token || !tokens[token]) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
});

router.get('/', (req, res) => {
  res.json(users.map(({ password, ...u }) => u));
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Exclude the password field
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.post('/create', (req, res) => {
  const { username, password, role } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  if (username?.includes('test')) {
    return res.status(400).json({ message: 'Username must be a real name' });
  }

  const newUser = {
    id: Date.now(),
    username,
    password,
    role,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const id = +req.params.id;
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});



// Group delete: /api/users/delete?ids=1,2,3
router.delete('/delete', (req, res) => {
  const idsParam = req.query.ids;
  if (!idsParam) return res.status(400).json({ message: 'No ids provided' });
  const ids = idsParam.split(',').map(Number);
  let deleted = 0;
  ids.forEach((id) => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      delete tokens[id];
      deleted++;
    }
  });
  return res.json({ message: `Deleted ${deleted} users` });
});

router.delete('/:id', (req, res) => {
  const id = +req.params.id;
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(index, 1);
  delete tokens[id];
  res.json({ message: 'User deleted successfully'});
});

module.exports = router;
