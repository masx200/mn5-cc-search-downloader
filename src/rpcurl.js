import { checkurl } from "./checkurl.js";
import { urlsymbol, defaulturl } from "./urlsymbol.js";

// window[urlsymbol] = rpcparam ?? defaulturl;
const rpcurl = window[urlsymbol] ?? defaulturl;
console.log("rpcurl", rpcurl);
checkurl(rpcurl);
export { rpcurl };
