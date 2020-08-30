import { checkurl } from "./checkurl.js";
import { retryfetch } from "./retryfetch.js";
import { start } from "./start.js";
export const fetch = retryfetch;
// @ts-ignore
const rpcparam = new URL(import.meta.url).searchParams.get("rpcurl");
const rpcurl = rpcparam ?? "http://localhost:6800/jsonrpc";
checkurl(rpcurl);
export { rpcurl };
export const urltodom = new Map();
export const domtourl = new Map();
start();
// })();
