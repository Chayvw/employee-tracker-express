const connection = require("./config/connection");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");


function init() {
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
    // inquirer.prompt takes an array as an argument
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "what would you like to do?",
                choices: [
                    {
                        name: "View All Employees",
                        value: "VIEW"
                    },

                    {
                        name: "View All Roles",
                        value: "VIEW_ROLES"
                    },

                    {
                        name: "View All Departments",
                        value: "VIEW_DEPARTMENTS"
                    },
                ],
            }
        ])
        .then((response) => {
            console.log(response);
            if (response.choice === "VIEW") {
                orm.viewAll();
            } else if (response.choice === "VIEW_ROLES") {
                orm.viewRoles();
            } else if (response.choice === "VIEW_DEPARTMENTS") {
                orm.viewDepartments();
                //get a list of departments 
                connection.query("select * from department", (err, allDepartments) => {
                    console.table(allDepartments);
                    // departmentChoice is a way for me to map through the department table and return back name and id in an array
                    const departmentChoices = allDepartments.map((department) => {
                        const newChoice = {
                            name: department.name,
                            value: department.id
                        };
                        return newChoice
                    })
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "choice",
                                message: "what would you like to view?",
                                choices: departmentChoices
                            }
                        ]).then((secondResponse) => {
                            console.log(secondResponse);
                        })

                });

                // display the list to the user 
                // all the user to select value 
            }
        });

}

const orm = {
    findAll: function (tableName) {
        connection.query("select * from ??", [tableName], (err, allEmployees) => {
            if (err) throw err;
            console.table(allEmployees);
        });

    },

    viewAll: function () {
        this.findAll("employee");
    },

    viewRoles: function () {
        this.findAll("role");

    },

    viewDepartments: function () {
        this.findAll("department");

    },
};


init()