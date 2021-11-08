const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thejman202$',
    database: 'job_db'
});

function setUp() {
   

    inquirer
        .prompt([
            {
                name: "menu",
                type: "list",
                message: "What would you like to do?",
                choices: ['View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'exit']
            }

        ])
        .then((data) => {
            if (data.menu === "View all departments") {
                connection.query(
                    'SELECT * FROM department', (err, results) => {
                        console.table(results)

                        setUp();
                    })


            } else if (data.menu === "View all roles") {
                connection.query(
                    'SELECT * FROM role', (err, results) => {
                        console.table(results)

                        setUp();
                    })

            } else if (data.menu === "View all employees") {
                connection.query(
                    'SELECT * FROM employee', (err, results) => {
                        console.table(results)

                        setUp();
                    })

            } else if (data.menu === "Add a department") {
                addDepartment();

            } else if (data.menu === "Add a role") {
                addRole();

            } else if (data.menu === "Add an employee") {
                addEmployee();

            } else if (data.menu === "Update an employee role") {
                updateEmployee();
            } else {
                connection.end()
            }
        });
}

setUp();






function addEmployee() {
    const titlesArr = [];
    const managerArr = getManagers()
    console.log(managerArr)
    connection.query(
        'SELECT role.title AS title, role.id, department.name AS Department_name FROM role JOIN department ON role.department_id = department.id',
        function (err, results) {
            const yo = results.map((ya) => {
                const titleGrab = ya.title
                titlesArr.push(titleGrab)
            });
        },
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is your first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is your last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is your role?",
                choices: titlesArr
            },
            {
                name: "mani",
                type: 'list',
                message: 'assign a manager.',
                choices: managerArr
            },
            {
                name: "isManager",
                type: "list",
                message: "Is this employee a manager?",
                choices: ["yes", "no"]
            }
        ])
            .then(answers => {

                connection.query(
                    `SELECT * FROM role WHERE title = '${answers.role}'`, (err, results) => {

                        const idNum = results.map((ya) => {
                            const idGrab = ya.id

                            connection.query(
                                `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.first_name}', '${answers.last_name}', ${idGrab})`
                            )
                            if(answers.isManager === "yes"){
                                connection.query(
                                        `SELECT * FROM employee WHERE last_name = '${answers.last_name}'`, (err, res) =>{
                                          const manID = res.map((yi) =>{
                                            const manIdGrab = yi.id
                                              
                                              connection.query(
                                                  `UPDATE employee SET manager_id = ${manIdGrab} WHERE id = ${manIdGrab}`
                                                  )
                                                })  
                                        }
                                )
                            }
                        })
                    })

                setUp();
            })
    )
}

function addRole() {
    const depArray = []
    connection.query(
        'SELECT * FROM department',
        function (err, results) {
            const yo = results.map((ya) => {
                const depName = ya.name

                depArray.push(depName)
            });
        },
        inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the role you would like to add?"

            },
            {
                name: "salary",
                type: "number",
                message: "What is the salary of this role?"

            },
            {
                name: "dep",
                type: "list",
                message: "which department will this belong to?",
                choices: depArray
            },

        ])
            .then(answers => {


                connection.query(
                    `SELECT * FROM  department WHERE name = '${answers.dep}'`, (err, results) => {
                        const yo = results.map((ya) => {
                            const depId = ya.id

                            connection.query(
                                `INSERT INTO role (title, salary, department_id) VALUES ('${answers.name}', ${answers.salary}, ${depId})`
                            )
                            if (answers.dep === "Manager") {
                                `INSERT INTO employee (manager_id) VALUES ()`
                            }
                        });
                    })

                setUp();
            })
    )
}




function addDepartment() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of this new department?"

        },

    ])
        .then(answers => {
            connection.query(
                `INSERT INTO department (name) VALUES('${answers.name}')`
            )

            setUp();
        });
}




function updateEmployee() {
    const titlesArray = [];
    const nameArray = [];

    connection.query(
        'SELECT* FROM employee', (err, results) => {
            const yo = results.map((ya) => {
                const nameGrab = ya.last_name
                nameArray.push(nameGrab)
            })
            connection.query(
                'SELECT role.title AS title, role.id, department.name AS Department_name FROM role JOIN department ON role.department_id = department.id',
                function (err, results) {
                    const yo = results.map((ya) => {
                        const titleGrab = ya.title
                        titlesArray.push(titleGrab)
                    });
                    inquirer.prompt([
                        {
                            name: "ename",
                            type: "list",
                            message: "please select the employee.",
                            choices: nameArray
                        },
                        {
                            name: "role",
                            type: "list",
                            message: "What would you like to update their role to?",
                            choices: titlesArray
                        }
                    ])
                        .then(answers => {
                            console.log(answers)
                            connection.query(
                                `SELECT *  FROM role WHERE title = '${answers.role}'`, (err, results) => {
                                    const yo = results.map((ya) => {

                                        const idGrab = ya.id;
                                        connection.query(
                                            `UPDATE employee SET role_id = ${idGrab} WHERE last_name = '${answers.ename}'`
                                        )

                                    })

                                })

                            setUp();

                        })



                })

            // console.log(nameArray)
        })

}

function getManagers() {
    const manIdArr = [];
    connection.query(
        `SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE role_id = 4`, (err, results) => {
            const yo = results.map((ya) =>{
                manIdArr.push(ya.id)
            })
            
        }
    )
    return manIdArr
}

