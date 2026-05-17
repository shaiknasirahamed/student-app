const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

let students = [];

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Inevitable Computer Education</title>

<style>
body {
  font-family: Arial;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
}

h2 {
  text-align: center;
}

input, select {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
}

button {
  width: 100%;
  padding: 10px;
  background: #4facfe;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>

</head>

<body>

<div class="container">
<h2>Student Registration</h2>
<h4>Inevitable Computer Education</h4>

<form action="/register" method="POST">
  <input type="text" name="name" placeholder="Full Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="tel" name="phone" placeholder="Phone Number">
  
  <select name="course" required>
    <option value="">Select Course</option>
    <option>AWS DevOps</option>
    <option>Linux Administration</option>
    <option>Docker & Jenkins</option>
  </select>

  <button type="submit">Register</button>
</form>

<br>
<a href="/students">View Students</a>

</div>

</body>
</html>
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
console.log("New version deployed!");
