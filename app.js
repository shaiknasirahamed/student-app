const express = require('express');
const app = express();

// ✅ Use environment variable (important for Docker/K8s)
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

let students = [];

// ✅ Home Page
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
  width: 420px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
}

h2, h4 {
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
  cursor: pointer;
}

a {
  display: block;
  text-align: center;
  margin-top: 10px;
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

<a href="/students">View Students</a>

</div>
</body>
</html>
  `);
});

// ✅ Register Student
app.post('/register', (req, res) => {
  const { name, email, course } = req.body;

  // ✅ Basic validation
  if (!name || !email || !course) {
    return res.send("All fields are required!");
  }

  students.push({ name, email, course });
  res.redirect('/students');
});

// ✅ View Students
app.get('/students', (req, res) => {
  let list = students.map(s =>
    `<li>${s.name} - ${s.email} - ${s.course}</li>`
  ).join('');

  res.send(`
    <h2>Registered Students</h2>
    <ul>${list}</ul>
    <a href="/">Go Back</a>
  `);
});

// ✅ Start server
app.listen(port, () => {
  console.log(\`App running on port ${port}\`);
});

console.log("New version deployed ✅");

