// new todo
import inquirer from 'inquirer';
import { collection } from '../dataModules/collections.js';
/******************************************/
// ask user for a new todo
// add todo to the list while validating input
async function addTodo() {
    console.log('');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'add',
            message: 'Enter new Todo:',
            validate(input) {
                if (input !== '') {
                    collection.addTodo(input);
                    return true;
                }
                else {
                    return 'Enter some valid todo';
                }
            },
        },
    ]);
}
/******************************************/
export { addTodo };
