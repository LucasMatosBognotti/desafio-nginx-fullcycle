const mysql = require('mysql')
const express = require('express')

const PORT = 8080

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'docker',
  database: 'fullcycle',
  port: '3306',
})

connection.query(`INSERT INTO people(name) VALUES('Lucas Matos Bognotti')`)

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', function (err, rows, fields) {
    if (err) throw err;
  
    let html = '<h1>Full Cycle</h1>';
    rows.forEach((row) => {
      html = html + '<h3>' + row.name + '</h3>';
    });
   
    return res.send(html)
  });
})

app.listen(PORT, () => {
  return console.log(`Server is runing at port ${PORT}`)
})
