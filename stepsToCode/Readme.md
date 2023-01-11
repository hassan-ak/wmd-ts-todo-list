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
  npm install lowdb
  npm install chalk
  npm install inquirer
  npm install cli-table
  npm install node-banner
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
