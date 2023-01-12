// User Selection
import inquirer from 'inquirer';

/******************************************/
// User Selection
// list avaialble operations to the user
// return user selection
async function optionSelection(): Promise<string> {
  console.log('');
  enum Commands {
    Add = 'Add New Todo',
    Toggle = 'Show/Hide Completed',
    Complete = 'Change status of Todo',
    Purge = 'Remove Completed Todo',
    Quit = 'Quit',
  }
  const response: { response: string } = await inquirer.prompt([
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
