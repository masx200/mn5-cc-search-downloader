// @ts-ignore
// const params = new URL(import.meta.url).searchParams;
// @ts-ignore
// console.log(Object.fromEntries(params));
// @ts-ignore
// const rpcparam = params.get("rpcurl");
// console.log(rpcparam);
export const urlsymbol = Symbol.for("rpcurl");
export const defaulturl = "http://localhost:6800/jsonrpc";
