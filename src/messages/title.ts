// App Title
import showBanner from 'node-banner';

/******************************************/
// returns a promise which resolves
// Displays title by using node-banner
async function title(): Promise<true> {
  console.clear();
  return await new Promise<true>(async (resolve) => {
    await showBanner(`Todo ' s`, '\t   CLI Todo App', 'blue', 'yellow');
    console.log('');
    resolve(true);
  });
}

/******************************************/
export { title };
