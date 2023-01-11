// Show shutdown animation
import chalk from 'chalk';
import ora, { Ora } from 'ora';

/**********************************************************************/
// Animation to shutdown app
function shutDown(): Promise<true> {
  return new Promise<true>((resolve) => {
    console.log('');
    // use ora to display an animation with a text
    const spinner: Ora = ora(chalk.red(' Shutting Down '));
    spinner.spinner = 'triangle';
    spinner.color = 'red';
    spinner.start();
    // stop anmation and clear console
    setTimeout(() => {
      spinner.stop();
      console.clear();
      resolve(true);
    }, 1000);
  });
}

/**********************************************************************/
export { shutDown };
