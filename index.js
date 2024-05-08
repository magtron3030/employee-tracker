/*
Whenever you do a query look at what the output is supossed to be.
Then I have to think about where that data is going to come from
ex.

*/
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require('inquirer');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');
// const table = require("console.table");

// Connect to database
const pool = new Pool(
  {
    // Enter PostgreSQL username
    user: 'maggiemcdowell',
    // Enter PostgreSQL password
    password: 'maggie123',
    host: 'localhost',
    database: 'employee_tracker_db'
},
console.log('Connected to the employee_tracker_db database!')
)

const mainMenu= () => inquirer.prompt([
   {
   type: "list",
   name: "question",
   message: "What would you like to do?",
   choices: ["Update an Employee Role", "Add a Role", "View All Roles", "View All Departments", "Add a Department", "View All Employees", "Add an Employee", "Quit"]
   }
])

//switch case for main menu
.then((results) => {
   const {question} = results;

   switch(question){
      case "Update an Employee Role":
            updateEmployeeRole();
      break;
      case "Add a Role":
            addARole();
      break; 
      case "View All Roles":
            viewAllRoles();
      break;
      case "View All Departments":
            viewAllDepartments();
      break;
      case "Add a Department":
            addADepartment();
      break;
      case "View All Employees":
            viewAllEmployees();
      break;
      case "Add an Employee":
            addAnEmployee();
      break;
      case "Quit":
         pool.end();
      break;
   }
});

const viewAllRoles = () => {
      pool.query('SELECT * FROM roles', (err, {rows}) => {
            if (err) {
                  console.log (err);
            }
                  console.table(rows);
            mainMenu()
      })
}

const viewAllDepartments = () => {
      pool.query('SELECT * FROM department', (err, {rows}) => {
            if (err) {
                  console.log (err);
            }
                  console.table(rows);
            mainMenu()
      })
}


const viewAllEmployees = () => {
      pool.query('SELECT * FROM employee', (err, {rows}) => {
            if (err) {
                  console.log (err);
            }
                  console.table(rows);
            mainMenu()
      })
}


const addADepartment = () => { 
      inquirer.prompt([
      {
      type: "input",
      name: "department",
      message: "What is the name of the department?"
      }
   ]).then((answers)=> {
      const departmentName = answers.department;
      pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName], (err, res) => {
            if (err) {
                  console.error( 'Error adding department:', err);
                  return;
                }
                console.log(`Department ${departmentName} added successfully!`)
                });
                mainMenu()
   });
};

const addARole = () => { 
      inquirer.prompt([
      {
            type: "input",
            name: "roles",
            message: "What is the name of the role?"
      },
      {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
      },
      {
            type: 'list',
            name: 'department_id',
            message: 'Which department does the role belong to?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
      },
   ])
   
   .then((answers)=> {
      const roleName = answers.roles;
      pool.query('INSERT INTO roles (title) VALUES ($1)', [roleName], (err, res) => {
            if (err) {
                  console.error( 'Error adding roles:', err);
                  return;
                }
                console.log(`roles ${roleName} added successfully!`)
      }); 
      pool.query('INSERT INTO roles (salary) VALUES ($1)', [roleName], (err, res) => {
            if (err) {
                  console.error( 'Error adding salary:', err);
                    return;
                   }
                   console.log(`roles ${roleName} added successfully!`)
       }); 
       pool.query('INSERT INTO roles (department_id) VALUES ($1)', [roleName], (err, res) => {
            if (err) {
                  console.error( 'Error adding department:', err);
                    return;
                   }
                   console.log(`roles ${roleName} added successfully!`)
   });
});
};

// // Hardcoded query: DELETE FROM course_names WHERE id = 3;
// pool.query(`DELETE FROM deparment WHERE id = $1`, [3], (err, {rows}) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });

// // Query database
// pool.query('SELECT * FROM department', function (err, {rows}) {
//   console.log(rows);
// });



mainMenu()










