import { retry } from "./retry.js";
import { sleep } from "./sleep.js";

export async function retryfetch(url, opt = {}) {
    return await retry(
        () => {
            //   onrequest(url, opt);
            return window.fetch(url, opt);
        },
        {
            times: 7,
            onFailedAttempt: async (e) => {
                console.warn(e);
                console.warn("网络错误，4秒后重试");
                await sleep(4000);
            },
        }
    );
}
