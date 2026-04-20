const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/add-student', async (req, res) => {
  console.log(req.body);   // 👈 এখানে দেখবে কী আসছে

  const { name, email, course } = req.body;

  try {
    await pool.query(
      'INSERT INTO students (name, email, course) VALUES ($1, $2, $3)',
      [name, email, course]
    );
    res.send('Student added');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all students
app.get('/students', async (req, res) => {
  const result = await pool.query('SELECT * FROM students ORDER BY id DESC');
  res.json(result.rows);
});

app.listen(3000, () =>
  console.log('Server running at http://localhost:3000')
//console.log(req.body);
);