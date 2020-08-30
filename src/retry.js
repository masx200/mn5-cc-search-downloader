import { AbortError } from "./AbortError.js";

///*exports.AbortError = AbortError;*/
export async function retry(
    run,
    { times = 10, onFailedAttempt = (e) => {} } = {}
) {
    //https://unpkg.com/browse/@shanyue/promise-utils@2.0.4/dist/lib/sleep.js
    //https://unpkg.com/@shanyue/promise-utils@2.0.4/dist/lib/retry.js
    ("use strict");
    ///*Object.defineProperty(exports, "__esModule", { value: true });
    //exports.retry = exports.AbortError = void 0;*/
    let count = 1;
    async function exec() {
        try {
            const result = await run(count);
            return result;
        } catch (e) {
            if (count > times || e instanceof AbortError) {
                throw e;
            }
            count++;
            await onFailedAttempt(e);
            return exec();
        }
    }
    return exec();
}
