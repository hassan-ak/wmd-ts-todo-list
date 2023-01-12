// toggle display
import { showCompleted } from '../dataModules/collections.js';
/******************************************/
// toggle display
// toggle between displaying completed todos or not
async function toggleDisplay() {
    showCompleted.show = !showCompleted.show;
}
/******************************************/
export { toggleDisplay };
