// Display todos List
import Table from 'cli-table';
import chalk from 'chalk';
import { collection, showCompleted } from '../dataModules/collections.js';

/******************************************/
// Display todos list
// if no todo display empty list
// when showcompleted marked display full list
// when showcompleted not-marked display masked list
async function showTodos(): Promise<true> {
  return new Promise<true>((resolve) => {
    // Initilize table
    const todosTable = new Table({
      // Table Heading
      head: [
        chalk.blueBright('Id'),
        chalk.blueBright('Todo'),
        chalk.blueBright('Completed'),
      ],
    });
    // Check if there are any todos in the storage
    // If no todos in the list
    if (collection.getItemCounts().total == 0) {
      // Title
      console.log(chalk.bgMagentaBright(`Todos's list (complete)`));
      todosTable.push(['NA', 'There is no Todo in the List', 'NA']);
    }
    // if todos in the list
    else {
      // Check for user choice to show all todos
      // complete and in-complete
      // If completed list to be displayed
      if (showCompleted.show) {
        // Title
        console.log(chalk.bgMagentaBright(`Todos's list (complete)`));
        // loop over collection and push entries to the table
        collection
          .getTodoItems(true)
          .forEach((item) =>
            todosTable.push([
              item.id.toString(),
              item.todo,
              item.complete ? chalk.green('Yes') : chalk.red('No'),
            ])
          );
      } // list todos after hiding completed
      else {
        console.log(chalk.bgMagentaBright(`Todos's list (masked)`));
        collection
          .getTodoItems(false)
          .forEach((item) =>
            todosTable.push([
              item.id.toString(),
              item.todo,
              item.complete ? chalk.green('Yes') : chalk.red('No'),
            ])
          );
      }
    }
    // Display table
    console.log(todosTable.toString());
    // resolve promise
    resolve(true);
  });
}

/******************************************/
export { showTodos };
