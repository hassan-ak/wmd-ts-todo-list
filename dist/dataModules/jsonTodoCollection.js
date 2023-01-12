// connect with db
import * as lowdb from 'lowdb';
import { TodoItem } from './todoItem.js';
import { TodoCollection } from './todoCollection.js';
import * as FileSync from 'lowdb/adapters/FileSync.js';
/*******************************************/
// JSON todo collection to interact with lowdb
/*
  properties
    private database
    list of todo items
  methods
    add todo
    change status
    remove complete
*/
class JsonTodoCollection extends TodoCollection {
    // create new lowdb database
    database;
    constructor(todoItems = []) {
        // refers to TodoCollection class
        super([]);
        // intiize databse and set file name
        this.database = lowdb.default(new FileSync.default('Todo.json'));
        // check if the data base has already stored todos in it
        if (this.database.has('todos').value()) {
            // returns the todos with id, todo and complete status
            let dbItems = this.database.get('todos').value();
            // set values in the itemmap
            dbItems.forEach((item) => this.itemMap.set(item.id, new TodoItem(item.id, item.todo, item.complete)));
        }
        // in-case when no todo in the file write data to file
        // it can be a value on class instance creation or empty data
        else {
            this.database.set('todos', todoItems).write();
            todoItems.forEach((item) => this.itemMap.set(item.id, item));
        }
    }
    // Store Data in the fie
    // from itemmap of todos collection insert values in file
    storetodos() {
        this.database.set('todos', [...this.itemMap.values()]).write();
    }
    // Add new todo to the collection
    addTodo(todo) {
        let result = super.addTodo(todo);
        this.storetodos();
        return result;
    }
    // mark status of a said todo in the collection
    // update file
    changeStatus(id, complete) {
        super.changeStatus(id, complete);
        this.storetodos();
    }
    // remove completed todos from collection
    // update file
    removeComplete() {
        super.removeComplete();
        this.storetodos();
    }
}
/*******************************************/
export { JsonTodoCollection };
