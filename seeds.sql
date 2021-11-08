INSERT INTO department (name)
VALUES ('slave'),
       ("HR"),
       ("Safety"),
       ("Manager");

INSERT INTO role (title, salary, department_id)
VALUES ('slave', 30000, 1),
       ("Safety", 35000, 2),
       ("HR", 40000, 3),
       ("Manager", 50000, 4);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Bird', 1, NULL),
       ('Shelby','Ford', 2, NULL),
       ('Adam','Yard', 3, NULL),
       ('Frank','Zappa', 4, 4);