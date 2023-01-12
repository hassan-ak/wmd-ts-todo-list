// remove completed
import { collection } from '../dataModules/collections.js';
/******************************************/
// remove completed tasks
async function removeCompleted() {
    collection.removeComplete();
}
/******************************************/
export { removeCompleted };
