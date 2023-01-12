// remove completed
import { collection } from '../dataModules/collections.js';

/******************************************/
// remove completed tasks
async function removeCompleted(): Promise<void> {
  collection.removeComplete();
}

/******************************************/
export { removeCompleted };
