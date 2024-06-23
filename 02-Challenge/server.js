const inquirer = require("inquirer");
const db = require("./config/connection.js");

const addDepartmentQuestions = [
  {
    type: "input",
    name: "departmentName",
    message: "What is the name of the department you would like to add?",
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    name: "first_name",
    message: "What is the first name of the employee you would like to add?",
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the last name of the employee you would like to add?",
  },
  {
    type: "input",
    name: "role_id",
    message: "What is the role_id of the employee you would like to add?",
  },
  {
    type: "input",
    name: "department_id",
    message: "What is the department ID that the employee is part of?",
  },
  {
    type: "input",
    name: "manager_id",
    message: "What is the ID of the employee's Manager?",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    name: "title",
    message: "What is the job title of the role you would like to add?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role you would like to add?",
  },
  {
    type: "input",
    name: "department_id",
    message: "What is the department id the role is part of?",
  },
];

const menuQuestions = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "Add a Department",
      "View All Employees",
      "Add New Employee",
      "View All Roles",
      "Add a Role",
      "Exit",``
    ],
  },
];

const viewAllDepartments = () => {
  db.promise()
    .query("SELECT * FROM department;")
    .then((res) => {
      console.table(res[0]);
      menu();
    })
}

const viewEmployees = () => {
  db.promise()
   .query("SELECT * FROM employee LEFT JOIN role ON employee.role_id= role.id LEFT JOIN department ON role.department_id= department.id;")
   .then((res) => {
      console.table(res[0]);
      menu();
    })
}

const viewAllRoles = () => {
  db.promise()
    .query("SELECT * FROM role LEFT JOIN department ON role.department_id= department.id;")
    .then((res) => {
      console.table(res[0]);
      menu();
    })
}

const addDepartment = () => {
  inquirer.prompt(addDepartmentQuestions)
    .then(({departmentName}) => {
      db.promise()
        .query(`INSERT INTO department(name) VALUE ('${departmentName}'); `)
        .then((res) => {
          console.log(`added ${departmentName} to department`);
          menu();
        })
    })
}

const addEmployee = () => {
  inquirer.prompt(addEmployeeQuestions)
    .then(({first_name, last_name, role_id, department_id, manager_id}) => {
      db.promise()
        .query(`INSERT INTO employee(first_name, last_name, role_id, department_id, manager_id) VALUE ('${first_name}', '${last_name}', ${role_id}, ${department_id}, ${manager_id}); `)
        .then((res) => {
          console.log(`added ${first_name} ${last_name} to employee`);
          menu();
        })
    })
}

const addRole = () => {
  inquirer.prompt(addRoleQuestions)
    .then(({title, salary, department_id}) => {
      db.promise()
        .query(`INSERT INTO role(title, salary, department_id) VALUE ('${title}', ${salary}, ${department_id}); `)
        .then((res) => {
          console.log(`added ${title} to role`);
          menu();
        })
    })
}

const listOptions = (res) => {
  switch (res.action) {
    case "View All Departments":
      viewAllDepartments();
      break;
    case "Add a Department":
      addDepartment();
      break;
    case "View All Employees":
      viewEmployees();
      break;
    case "Add New Employee":
      addEmployee();
      break;
    case "View All Roles":
      viewAllRoles();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Exit":
      db.end();
      break;
      default:
        console.log("please select a valid option");
        menu();
        break;
  }}

  const menu = () => {
    inquirer.prompt(menuQuestions)
      .then((res) => {
        listOptions(res);
      })
  }
  
  menu();