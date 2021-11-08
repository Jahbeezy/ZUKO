DROP DATABASE IF EXISTS job_db;
CREATE DATABASE job_db;

USE job_db;

DROP TABLE IF EXISTS department;
CREATE TABLE  department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);


DROP TABLE IF EXISTS role;
CREATE TABLE  role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE  employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)   
);

-- .then(answers => {
--         console.log(answers)
--         connection.query(
--             `SELECT * FROM department where name = ${answers.name}`, (err, results) => {
--                 console.log(results)
--                 const idNum = results.map((ya) => {
--                     const idGrab = ya.id
--                     console.log(idGrab)
--                     connection.query(
--                         `INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${idGrab})`
--                         )
--                     })
--                 })
--             })