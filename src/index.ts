#!/usr/bin/env node

// Todos App
import { title } from './messages/title.js';
import { shutDown } from './messages/shutDown.js';
import { addTodo } from './operations/addTodo.js';
import { showTodos } from './display/showTodos.js';
import { changeStatus } from './operations/changeStatus.js';
import { toggleDisplay } from './operations/toggleDisplay.js';
import { optionSelection } from './userInput/optionSelection.js';
import { removeCompleted } from './operations/removeCompleted.js';

/*******************************************/
// complete todo app
// call all operations in a sequence
async function todos() {
  // loopover check
  let todosLoop = true;
  while (todosLoop) {
    // display title
    await title();
    // list todos
    await showTodos();
    // user selection to work over
    let options = await optionSelection();
    // based on user selection perform operation
    switch (options) {
      case 'Add New Todo':
        await addTodo();
        break;
      case 'Show/Hide Completed':
        await toggleDisplay();
        break;
      case 'Change status of Todo':
        await changeStatus();
        break;
      case 'Remove Completed Todo':
        await removeCompleted();
        break;
      case 'Quit':
        todosLoop = false;
        await shutDown();
        break;
      default:
        break;
    }
  }
}

/*******************************************/
todos();
