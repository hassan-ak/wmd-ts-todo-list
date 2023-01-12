// Todo collection
import { TodoItem } from './todoItem.js';

/*******************************************/
// Type defination for Item Counts
type ItemCounts = {
  total: number;
  incomplete: number;
  complete: number;
};

/*******************************************/
// Todo Collecton
/*
  properties
    nextid
    itemMap
    todo items
  methods
    get todo by id
    add todo
    get todo items
    change status
    remove complete
    get item count

*/

class TodoCollection {
  // to define todo id
  private nextId: number = 1;

  // by this way we can store a todo item in the form of key value pair
  // itemMap have keys in form of number and values are of TodoItem type
  // property to be accessed by class and sub Class only
  protected itemMap = new Map<number, TodoItem>();

  constructor(public todoItems: TodoItem[] = []) {
    // any array of todos
    // loop over items and set values
    todoItems.forEach((item) => this.itemMap.set(item.id, item));
  }

  // get a todo by specific id
  getTodoById(id: number): TodoItem | undefined {
    return this.itemMap.get(id);
  }

  // adding a new todo and get ID of the added todo
  addTodo(todo: string): number {
    // increment in the todo id in case same id already exist
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, todo));
    return this.nextId;
  }

  // get items based on complete status (default to get all items)
  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeComplete || !item.complete
    );
  }

  // mark a todo as completed or back to uncomplete
  changeStatus(id: number, complete: boolean): void {
    const todoItem = this.getTodoById(id);
    // acts only in case if the todo exist with specific id
    if (todoItem) {
      todoItem.complete = complete;
    }
  }

  // Remove Completed Itmes
  removeComplete(): void {
    this.itemMap.forEach((item) => {
      if (item.complete) {
        this.itemMap.delete(item.id);
      }
    });
  }

  // Count items in the collection
  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
      complete: this.itemMap.size - this.getTodoItems(false).length,
    };
  }
}

/*******************************************/
export { TodoCollection };
