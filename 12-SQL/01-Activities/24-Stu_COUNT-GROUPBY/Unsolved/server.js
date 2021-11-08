const express = require('express');
const mysql = require('mysql2');

//the local port we use
const PORT = process.env.PORT || 3001;
//initializing express as a variable
const app = express();

//parses urlencoded bodies
app.use(express.urlencoded({ extended: false }));
//allows json function to work
app.use(express.json());

//connects to specific db 
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

//this takes counts the total stock from favorite_books and groups them into in_stock
db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
  console.log(results);
});

//gets the sum of quantity and puts it in total_in_section
//Max grabs largest quantity, MIN grabs least
//AVG gets the average value from the list
//group by section
db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
  console.log(results);
});

//error listeners
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
