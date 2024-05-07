// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require('inquirer');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');
const table = require("console.table");

// Connect to database
const pool = new Pool(
  {
    // Enter PostgreSQL username
    user: 'maggiemcdowell',
    // Enter PostgreSQL password
    password: 'Pilotmag678!',
    host: 'postgres',
    database: 'employee_tracker_db'
},
console.log('Connected to the employee_tracker_db database!')
)

const eTracker = () => inquirer.prompt([
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




// Hardcoded query: DELETE FROM course_names WHERE id = 3;
pool.query(`DELETE FROM deparment WHERE id = $1`, [3], (err, {rows}) => {
  if (err) {
    console.log(err);
  }
  console.log(rows);
});

// Query database
pool.query('SELECT * FROM department', function (err, {rows}) {
  console.log(rows);
});










// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




