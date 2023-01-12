import { ShowCompleted } from './status.js';
import { JsonTodoCollection } from './jsonTodoCollection.js';
/*******************************************/
// create instances of different classes
// List of Todos
let todos = [];
// Collection of todos
let collection = new JsonTodoCollection(todos);
// For displaying completed todos
let showCompleted = new ShowCompleted();
/*******************************************/
export { collection, showCompleted };
