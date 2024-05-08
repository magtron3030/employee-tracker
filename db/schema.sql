\c postgres;

DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

\c employee_tracker_db;


CREATE TABLE department (
  -- Creates a numeric column called "id" --
  id SERIAL PRIMARY KEY,
  -- Creates a string column called "name" which can hold up to 100 characters --
  name VARCHAR(100) NOT NULL
);


INSERT INTO department (name)
  VALUES
    ('Engineering'),
    ('Legal'),
    ('Sales'),
    ('Finance');

CREATE TABLE roles (
   id SERIAL PRIMARY KEY,
   title VARCHAR(50) NOT NULL,
   salary INTEGER NOT NULL,
   department_id INTEGER NOT NULL,
   FOREIGN KEY (department_id) 
   REFERENCES department(id) -- referencing the department table and want specifically the id
   ON DELETE SET NULL
);

INSERT INTO roles (id, title, salary, department_id)
   VALUES 
          (1, 'Sales Lead', 95000, 3),
          (2, 'Sales Person', 70000, 3),
          (3, 'Lead Engineer', 160000, 1),
          (4, 'Software Engineer', 130000, 1),
          (5, 'Account Manager', 110000, 4),
          (6, 'Accountant', 100000, 4),
          (7, 'Legal Team Lead', 210000, 2),
          (8, 'Lawyer', 190000, 2);

CREATE TABLE employee (
   id SERIAL PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   roles_id INTEGER NOT NULL,
   manager_id INTEGER,
   FOREIGN KEY (roles_id)
   REFERENCES roles(id)
   ON DELETE SET NULL,
   FOREIGN KEY (manager_id)
   REFERENCES employee(id)
   ON DELETE SET NULL
);



INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ('Gerod', 'Roth', 1, NULL),
       ('Kelsey', 'Riley', 2, 1),
       ('Karen', 'Dierks', 3, NULL),
       ('Tom', 'McNiel', 4, 3),
       ('Jamie' , 'MyReynolds', 5, NULL),
       ('Jason', 'Fooks', 6, 5),
       ('James', 'Thornton', 7, NULL),
       ('Julie', 'Kissler', 8, 7);



--foriegn keys are an indicator that those tables will be joined.         
SELECT * FROM department;
SELECT * FROM roles;

SELECT roles.title, department.name
   FROM roles
   JOIN department ON roles.department_id = department.id;

--putting "AS" in it makes it so the output on the table what you want
SELECT e.id, e.first_name, e.last_name, roles.title, department.name as department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager
FROM employee e 
JOIN roles ON e.roles_id = roles.id 
JOIN department ON roles.department_id = department.id 
LEFT JOIN employee manager ON e.manager_id = manager.id