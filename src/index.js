import { checkurl } from "./checkurl.js";
import { retryfetch } from "./retryfetch.js";
import { start } from "./start.js";
export const fetch = retryfetch;
// @ts-ignore
// const params = new URL(import.meta.url).searchParams;
// @ts-ignore
// console.log(Object.fromEntries(params));
// @ts-ignore
// const rpcparam = params.get("rpcurl");
// console.log(rpcparam);
const urlsymbol = Symbol.for("rpcurl");
const defaulturl = "http://localhost:6800/jsonrpc";
// window[urlsymbol] = rpcparam ?? defaulturl;
const rpcurl = window[urlsymbol] ?? defaulturl;
console.log("rpcurl", rpcurl);
checkurl(rpcurl);
export { rpcurl };
export const urltodom = new Map();
export const domtourl = new Map();
// import("./start.js").then(({ start }) => {

start();
// });

// })();
