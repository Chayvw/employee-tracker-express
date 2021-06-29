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
                ],
            }
        ])
        .then((response) => {
            console.log(response);
            if(response.choice === "VIEW"){
            orm.viewAll();
            } else if (response.choice === "VIEW_ROLES"){
                orm.viewRoles();
            }
        });

}

const orm = {
    viewAll: () => {
        connection.query("select * from employee", (err, allEmployees) => {
            if (err) throw err;
            console.table(allEmployees);
            // run init again
            // init();
        });
    },
    viewRoles: ()=>{
        connection.query("select * from role", (err, allRoles) => {
            if (err) throw err;
            console.table(allRoles);
        });

    }
}



init()