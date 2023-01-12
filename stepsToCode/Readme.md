# Steps to code CLI Todo List

### 1. Project initiation

- Create and navigate to project directory using following commands

  ```cmd
  mkdir wmd-ts-todo-list
  cd wmd-ts-todo-list
  ```

- Intilize a node project in the newly created directory using following command, this will create a `package.json` file.

  ```cmd
  npm init -y
  ```

- Create a `tsconfig.json` file to define typescript configration using following command

  ```cmd
  tsc --init
  ```

- Create two more directories to be used as root and out directory using

  ```cmd
  mkdir src
  mkdir dist
  ```

- Update `tsconfig.json` to include above directories and also change module and moduleResolution

  ```json
  "target": "ES2022",
  "module": "NodeNext",
  "rootDir": "./src",
  "moduleResolution": "NodeNext",
  "outDir": "./dist",
  ```

- Update `package.json` and add following content to it

  ```json
  "main": "./dist/index.js",
  "type": "module",
  "scripts": {
      "start": "node ."
  },
  "bin": "./dist/index.js",
  ```

### 2. Install dependencies

- Multiple third-party packages to be used in this project so install different dependacies using following commands

  ```cmd
  npm install ora
  npm install chalk
  npm install inquirer
  npm install cli-table
  npm install node-banner
  npm install lowdb@1.0.0
  ```

- Install types for the installed dependancies for the development using following set of commands

  ```cmd
  npm install --save-dev @types/ora
  npm install --save-dev @types/lowdb
  npm install --save-dev @types/chalk
  npm install --save-dev @types/inquirer
  npm install --save-dev @types/cli-table
  ```

- After installation `package.json` file will be updated and `package-lock.json` file along with `node_modules` folder will be created. We don't need git to track newly created files and folders so create a `.gitignore` file with the following content

  ```gitignore
  node_modules
  package-lock.json
  Todos.json
  ```

### 3. Create Hello World

- To check if everything is setup properly first create a hello world. All the typescript files should be created in `./src` directory. Create a `index.ts` file with the following content

  ```ts
  console.log('Hello World!');
  ```

- To transpile the code to javascript we can use any of the following command, one thing to rember we need to use first command every time we make a change and the second one automatically create js files on every change. So we are going to use the latter one. All the js files will be stored in the `./dist` folder as we declared in our `tsconfig.json` file earlier.

  ```cmd
  tsc
  tsc -w
  ```

- to run the js file we can use any of the following commands

  ```cmd
  node .\dist\index.js
  node .
  npm start
  ```

- If everything is right we will have a console output.

### 4. Create App title and ShutDown Animation

- create `./message/title.ts` to display app title

  ```ts
  import showBanner from 'node-banner';
  async function title(): Promise<true> {
    console.clear();
    return await new Promise<true>(async (resolve) => {
      await showBanner(`Todo ' s`, '\t   CLI Todo App', 'blue', 'yellow');
      console.log('');
      resolve(true);
    });
  }
  export { title };
  ```

- create `./message/shutDown.ts` to create an animation before quiting the app

  ```ts
  import chalk from 'chalk';
  import ora, { Ora } from 'ora';
  function shutDown(): Promise<true> {
    return new Promise<true>((resolve) => {
      console.log('');
      const spinner: Ora = ora(chalk.red(' Shutting Down '));
      spinner.spinner = 'triangle';
      spinner.color = 'red';
      spinner.start();
      setTimeout(() => {
        spinner.stop();
        console.clear();
        resolve(true);
      }, 1000);
    });
  }
  export { shutDown };
  ```

### 5. Create selection options

- create `./userInput/optionSelection.ts` to ask user form list of opertions to perform

  ```ts
  import inquirer from 'inquirer';
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
  export { optionSelection };
  ```

### 6. Create data Modules

- create `./dataModules/todoItem.ts` to create a todo item class

  ```ts
  class TodoItem {
    public constructor(
      public id: number,
      public todo: string,
      public complete: boolean = false
    ) {}
  }
  export { TodoItem };
  ```

- create `./dataModules/todoCollection.ts` to create a todo collection

  ```ts
  import { TodoItem } from './todoItem.js';
  type ItemCounts = {
    total: number;
    incomplete: number;
    complete: number;
  };
  class TodoCollection {
    private nextId: number = 1;
    protected itemMap = new Map<number, TodoItem>();
    constructor(public todoItems: TodoItem[] = []) {
      todoItems.forEach((item) => this.itemMap.set(item.id, item));
    }
    getTodoById(id: number): TodoItem | undefined {
      return this.itemMap.get(id);
    }
    addTodo(todo: string): number {
      while (this.getTodoById(this.nextId)) {
        this.nextId++;
      }
      this.itemMap.set(this.nextId, new TodoItem(this.nextId, todo));
      return this.nextId;
    }
    getTodoItems(includeComplete: boolean): TodoItem[] {
      return [...this.itemMap.values()].filter(
        (item) => includeComplete || !item.complete
      );
    }
    changeStatus(id: number, complete: boolean): void {
      const todoItem = this.getTodoById(id);
      if (todoItem) {
        todoItem.complete = complete;
      }
    }
    removeComplete(): void {
      this.itemMap.forEach((item) => {
        if (item.complete) {
          this.itemMap.delete(item.id);
        }
      });
    }
    getItemCounts(): ItemCounts {
      return {
        total: this.itemMap.size,
        incomplete: this.getTodoItems(false).length,
        complete: this.itemMap.size - this.getTodoItems(false).length,
      };
    }
  }
  export { TodoCollection };
  ```

- create `./dataModules/jsonTodoCollection.ts` to intract with the database

  ```ts
  import * as lowdb from 'lowdb';
  import { TodoItem } from './todoItem.js';
  import { TodoCollection } from './todoCollection.js';
  import * as FileSync from 'lowdb/adapters/FileSync.js';
  type schemaType = {
    todos: { id: number; todo: string; complete: boolean }[];
  };
  class JsonTodoCollection extends TodoCollection {
    private database: lowdb.LowdbSync<schemaType>;
    constructor(todoItems: TodoItem[] = []) {
      super([]);
      this.database = lowdb.default(new FileSync.default('Todo.json'));
      if (this.database.has('todos').value()) {
        let dbItems = this.database.get('todos').value();
        dbItems.forEach((item) =>
          this.itemMap.set(
            item.id,
            new TodoItem(item.id, item.todo, item.complete)
          )
        );
      } else {
        this.database.set('todos', todoItems).write();
        todoItems.forEach((item) => this.itemMap.set(item.id, item));
      }
    }
    private storetodos() {
      this.database.set('todos', [...this.itemMap.values()]).write();
    }
    addTodo(todo: string): number {
      let result = super.addTodo(todo);
      this.storetodos();
      return result;
    }
    changeStatus(id: number, complete: boolean): void {
      super.changeStatus(id, complete);
      this.storetodos();
    }
    removeComplete(): void {
      super.removeComplete();
      this.storetodos();
    }
  }
  export { JsonTodoCollection };
  ```

- create `./dataModules/status.ts` to define status class

  ```ts
  class ShowCompleted {
    show: boolean = true;
  }
  export { ShowCompleted };
  ```

- create `./dataModules/collectios.ts` to create instances of classes to be used in the app

  ```ts
  import { TodoItem } from './todoItem.js';
  import { ShowCompleted } from './status.js';
  import { TodoCollection } from './todoCollection.js';
  import { JsonTodoCollection } from './jsonTodoCollection.js';
  let todos: TodoItem[] = [];
  let collection: TodoCollection = new JsonTodoCollection(todos);
  let showCompleted = new ShowCompleted();
  export { collection, showCompleted };
  ```

### 7. Create Operations

- Create `operations/addTodos.ts` to call function for adding todos to the list

  ```ts
  import inquirer from 'inquirer';
  import { collection } from '../dataModules/collections.js';
  async function addTodo(): Promise<void> {
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
          } else {
            return 'Enter some valid todo';
          }
        },
      },
    ]);
  }
  export { addTodo };
  ```

- Create `operations/changeStatus.ts` to call function for changing status of a todo

  ```ts
  import inquirer from 'inquirer';
  import { collection } from '../dataModules/collections.js';
  async function changeStatus(): Promise<void> {
    console.log('');
    await inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'status',
          message: 'Toggle todo status',
          choices: collection.getTodoItems(true).map((item) => ({
            name: item.todo,
            value: item.id,
            checked: item.complete,
          })),
        },
      ])
      .then((answers) => {
        let selectedTasks = answers['status'] as number[];
        collection
          .getTodoItems(true)
          .forEach((item) =>
            collection.changeStatus(
              item.id,
              selectedTasks.find((id) => id === item.id) != undefined
            )
          );
      });
  }
  export { changeStatus };
  ```

- Create `operations/removeCompleted.ts` to call function for removing completed todos

  ```ts
  import { collection } from '../dataModules/collections.js';
  async function removeCompleted(): Promise<void> {
    collection.removeComplete();
  }
  export { removeCompleted };
  ```

- Create `operations/toggleDisplay.ts` to call function for toggling display

  ```ts
  import { showCompleted } from '../dataModules/collections.js';
  async function toggleDisplay(): Promise<void> {
    showCompleted.show = !showCompleted.show;
  }
  export { toggleDisplay };
  ```

### 8. Create display table

- Create `display/showTodos.ts` to display todos table

  ```ts
  import Table from 'cli-table';
  import chalk from 'chalk';
  import { collection, showCompleted } from '../dataModules/collections.js';
  async function showTodos(): Promise<true> {
    return new Promise<true>((resolve) => {
      const todosTable = new Table({
        head: [
          chalk.blueBright('Id'),
          chalk.blueBright('Todo'),
          chalk.blueBright('Completed'),
        ],
      });
      if (collection.getItemCounts().total == 0) {
        console.log(chalk.bgMagentaBright(`Todos's list (complete)`));
        todosTable.push(['NA', 'There is no Todo in the List', 'NA']);
      } else {
        if (showCompleted.show) {
          console.log(chalk.bgMagentaBright(`Todos's list (complete)`));
          collection
            .getTodoItems(true)
            .forEach((item) =>
              todosTable.push([
                item.id.toString(),
                item.todo,
                item.complete ? chalk.green('Yes') : chalk.red('No'),
              ])
            );
        } else {
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
      console.log(todosTable.toString());
      resolve(true);
    });
  }
  export { showTodos };
  ```
