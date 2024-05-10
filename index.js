
const { exec } = require('child_process');

// Run the shell script
exec('./ascii.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Shell script error: ${stderr}`);
        return;
    }
    console.log(`Shell script output: ${stdout}`);
});


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

const mainMenu = () => inquirer.prompt([
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
      pool.query (`SELECT roles.id, roles.title, roles.salary, department.name
      FROM roles
      JOIN department ON roles.department_id = department.id;`, (err, {rows}) => {
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
      pool.query (`SELECT e.id, e.first_name, e.last_name, roles.title, department.name as department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager
      FROM employee e 
      JOIN roles ON e.roles_id = roles.id 
      JOIN department ON roles.department_id = department.id 
      LEFT JOIN employee manager ON e.manager_id = manager.id`, (err, {rows}) => {
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

      pool.query('SELECT * FROM department', (err, {rows}) => {
            const deptChoices = rows.map( dept => ({
                  name: dept.name, 
                  value: dept.id
            }))
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
                        choices: deptChoices
                  },
            ])
            .then((answers)=> {
                  const roleName = answers.roles;
                  pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [roleName, answers.salary, answers.department_id ], (err, res) => {
                        if (err) {
                              console.error( 'Error adding roles:', err);
                              return;
                        }
                        console.log(`roles ${roleName} added successfully!`)
                        mainMenu()
                  }); 

            });
      })
}

const addAnEmployee = () => { 

      pool.query('SELECT * FROM roles', (err, {rows}) => {
            const roleChoices = rows.map( roles => ({
                  name: roles.title, 
                  value: roles.id
            }))
      pool.query('SELECT * FROM employee', (err, {rows}) => {
            const managerChoices = rows.map( employee => ({
                  name: [employee.first_name + " " + employee.last_name],
                  value: employee.id
            }))
            inquirer.prompt([
                  {
                        type: "input",
                        name: "first_name",
                        message: "What is the employees first name?"
                  },
                  {
                        type: "input",
                        name: "last_name",
                        message: "What is the employees last name?"
                  },
                  {
                        type: "list",
                        name: "roles_id",
                        message: "What is the employees role?",
                        choices: roleChoices
                  },
                  {
                        type: 'list',
                        name: 'manager_id',
                        message: "Who is the employees manager?",
                        choices: managerChoices
                  },
            ])
            .then((answers)=> {
                  const employeeName = `${answers.first_name} ${answers.last_name}`;
                  pool.query('INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ($1, $2, $3, $4)', [ answers.first_name, answers.last_name, answers.roles_id, answers.manager_id ], (err, res) => {
                        if (err) {
                              console.error( 'Error adding employee:', err);
                              return;
                        }
                        console.log(`employee ${employeeName} added successfully!`)
                        mainMenu()
                  }); 
            });
      })
      })
}

const updateEmployeeRole = () => {
      pool.query('SELECT * FROM employee', (err, {rows}) => {
            const employeeChoices = rows.map( employee => ({
                  name: [employee.first_name + " " + employee.last_name],
                  value: employee.id
            }))
            pool.query('SELECT * FROM roles', (err, {rows}) => {
                  const roleChoices = rows.map( roles => ({
                        name: roles.title, 
                        value: roles.id
                  }))
            inquirer.prompt([
                  {
                        type: 'list',
                        name: 'employee_id',
                        message: "Which employee's role do you want to update?",
                        choices: employeeChoices
                  },
                  {
                        type: 'list',
                        name: 'roles_id',
                        message: "Which role do you want to assign the selected employee?",
                        choices: roleChoices
                  },
            ])
            .then((answers) => {
                  const updatedRoleId = answers.roles_id;
                  const employeeId = answers.employee_id;
  
                  pool.query('UPDATE employee SET roles_id = $1 WHERE id = $2', [updatedRoleId, employeeId], (err, res) => {
                      if (err) {
                          console.error('Error updating employee role:', err);
                          return;
                      }
                      console.log(`Employee's role updated successfully`);
                      mainMenu();
                  }); 
            });
      })
   })
}
mainMenu()














