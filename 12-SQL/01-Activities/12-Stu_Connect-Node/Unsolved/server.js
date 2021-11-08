const express = require('express');
//pulls mySQL2 into the project
const mysql = require('mysql2');

//creates the local server for us to use
const PORT = process.env.PORT || 3001;
//Initialize app using express
const app = express();

//Expresses middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connects to a database
const db = mysql.createConnection(
  {
    //identifies the host
    host: 'localhost',
    //mysql username
    user: 'root',
    //creates a password
    password: '',
    //stores the information in this db
    database: 'classlist_db'
  },
  console.log(`Connected to the classlist_db database.`)
);


//query database
//selecting * from students table to get data as results
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

//default response for any other request
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
