/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// ESM
import { onRequest} from "firebase-functions/v2/https";

type Indexable = { [key: string]: any };

export const helloWorld = onRequest((request, response) => {
    // debugger;
    const name = request.params[0];
    const items: Indexable = { lamp: 'This is a lamp', chair: 'Good chair' };
    const message = items[name];
    response.send(`<h1>${message}</h1>`);
});
