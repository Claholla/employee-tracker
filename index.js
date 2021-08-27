// Document dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const util = require("util");
const dotenv = require("dotenv");
dotenv.config();


// MySQL schema connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    assembleTeam();
});

// Inquirer user prompt for team member additions and assembly
const assembleTeam = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View departments",
                "View employee roles",
                "Add an employee",
                "Add a department",
                "Add an employee role",
                "Update employee roles"
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all employees":
                    viewEmployees();
                    break;

                case "View departments":
                    viewDepartments();
                    break;

                case "View employee roles":
                    viewRoles();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;

                case "Add a department":
                    addDepartment();
                    break;

                case "Add an employee role":
                    addRole();
                    break;

                case "Update employee roles":
                    updateRoles();
                    break;
            }
        });
};

// Queries a table of all employees
const viewEmployees = () => {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("All employees:");
        console.table(res);
        assembleTeam();
    });
};

// Queries a table of all departments
const viewDepartments = () => {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("All departments:");
        console.table(res);
        assembleTeam();
    });
};

// Queries a table of all roles
const viewRoles = () => {
    const query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("All roles:");
        console.table(res);
        assembleTeam();
    });
};

// Adds an employee to the database
const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the employees role ID number?"
            },
            {
                name: "managerId",
                type: "input",
                message: "What is the ID number of the employee's direct supervisor?"
            }
        ]).then((answers) => {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${answers.firstName}","${answers.lastName}", "${answers.roleId}","${answers.managerId}")`;
            connection.query(query, (err, req) => {
                if (err) throw err
            });
            console.log("Employee added to database.");
            assembleTeam();
        });
};

// Adds a department to the database
const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
                message: "What is the name of the department you would like to add?"
            }
        ]).then((answers) => {
            const query = `INSERT INTO department (name)
            VALUES ("${answers.deptName}")`;
            connection.query(query, (err, req) => {
                if (err) throw err
            });
            console.log("Department added to database.");
            assembleTeam();
        });
};

// Adds an employee role to the database
const addRole = () => {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role you would like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role you would like to add?"
            },
            {
                name: "departmentId",
                type: "input",
                message: "What is the ID number of the department to which this role belongs?"
            }
        ]).then((answers) => {
            const query = `INSERT INTO role (title, salary, department_id)
            VALUES ("${answers.title}","${answers.salary}", "${answers.departmentId}")`;
            connection.query(query, (err, req) => {
                if (err) throw err
            });
            console.log("Role added to database.");
            assembleTeam();
        });
};

// Allows the user to edit employee roles
const updateRoles = () => {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee to be updated?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee to be updated?"
            },
            {
                name: "role",
                type: "input",
                message: "What role ID number would you like to assign this employee?"
            }
        ]).then((answers) => {
            connection.query(
                "UPDATE employee SET ? WHERE ? AND ?",
                [
                    {
                        role_id: answers.role
                    },
                    {
                        first_name: answers.firstName
                    },
                    {
                        last_name: answers.lastName
                    }
                ])
            console.log("Employee's role ID number has been updated.");
            assembleTeam();
        });
    };