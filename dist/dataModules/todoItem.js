// Todo Item
// class definanton to be used as interface
/*******************************************/
// Todo Item
/*
  properties
    id
    todo
    complete
*/
class TodoItem {
    id;
    todo;
    complete;
    constructor(id, todo, complete = false) {
        this.id = id;
        this.todo = todo;
        this.complete = complete;
    }
}
/*******************************************/
export { TodoItem };
