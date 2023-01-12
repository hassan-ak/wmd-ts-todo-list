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
  public constructor(
    public id: number,
    public todo: string,
    public complete: boolean = false
  ) {}
}

/*******************************************/

export { TodoItem };
