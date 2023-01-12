// User Selection
import inquirer from 'inquirer';
/******************************************/
// User Selection
// list avaialble operations to the user
// return user selection
async function optionSelection() {
    console.log('');
    let Commands;
    (function (Commands) {
        Commands["Add"] = "Add New Todo";
        Commands["Toggle"] = "Show/Hide Completed";
        Commands["Complete"] = "Change status of Todo";
        Commands["Purge"] = "Remove Completed Todo";
        Commands["Quit"] = "Quit";
    })(Commands || (Commands = {}));
    const response = await inquirer.prompt([
        {
            message: 'What you want to do ?',
            name: 'response',
            type: 'list',
            choices: Object.values(Commands),
        },
    ]);
    return response.response;
}
/******************************************/
export { optionSelection };
