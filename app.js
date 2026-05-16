const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

let students = [];

app.get('/', (req, res) => {
  res.send(`
    <h2>Student Registration Form</h2>
    /register
      Name: <input name="name" /><br/>
      Email: <input name="email" /><br/>
      Course: <input name="course" /><br/>
      <button type="submit">Register</button>
    </form>
    <br/>
    /students
  `);
});

app.post('/register', (req, res) => {
  const { name, email, course } = req.body;
  students.push({ name, email, course });
  res.redirect('/students');
});

app.get('/students', (req, res) => {
  let list = students.map(s => `<li>${s.name} - ${s.email} - ${s.course}</li>`).join('');
  res.send(`<h2>Registered Students</h2><ul>${list}</ul>/Go Back</a>`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
