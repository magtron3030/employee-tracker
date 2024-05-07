-- Inserting data into department
INSERT INTO department (name) 
VALUES ('Engineering'),
       ('Legal'),
       ('Sales'),
       ('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 95000, 3),
       ('Sales Person', 70000, 3),
       ('Lead Engineer', 160000, 1),
       ('Software Engineer', 130000, 1),
       ('Account Manager', 110000, 4),
       ('Accountant', 100000, 4),
       ('Legal Team Lead', 210000, 2),
       ('Lawyer' 190000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gerod', 'Roth', 1, NULL),
       ('Kelsey', 'Riley', 2, 1),
       ('Karen', 'Dierks', 3, NULL),
       ('Tom', 'McNiel', 4, 3),
       ('Jamie' , 'MyReynolds', 5, NULL),
       ('Jason', 'Fooks', 6, 5),
       ('James', 'Thornton', 7, NULL),
       ('Julie', 'Kissler', 8, 7);







