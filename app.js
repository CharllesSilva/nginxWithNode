const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
  host: 'mysql',
  user: 'root',
  password: 'node123',
  database: 'people_db',
};

app.get('/names', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  await connection.execute("INSERT INTO people (name) VALUES ('Wesley Willians')");
  await connection.execute("INSERT INTO people (name) VALUES ('Charlles Silva')");
  await connection.execute("INSERT INTO people (name) VALUES ('Steve Jobs')");

  const [rows] = await connection.execute('SELECT name FROM people');
  const names = rows.map(row => row.name);

  let htmlResponse = '<h1>Full Cycle Rocks!</h1><ul>';
  names.forEach(name => {
    htmlResponse += `<li>${name}</li>`;
  });
  htmlResponse += '</ul>';

  res.send(htmlResponse);

  connection.end();
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});