// class Instances
import { TodoItem } from './todoItem.js';
import { ShowCompleted } from './status.js';
import { TodoCollection } from './todoCollection.js';
import { JsonTodoCollection } from './jsonTodoCollection.js';

/*******************************************/
// create instances of different classes
// List of Todos
let todos: TodoItem[] = [];
// Collection of todos
let collection: TodoCollection = new JsonTodoCollection(todos);
// For displaying completed todos
let showCompleted = new ShowCompleted();

/*******************************************/
export { collection, showCompleted };
