import { rpcurl } from "./rpcurl.js";
export async function testconnect() {
    const response = await window.fetch(rpcurl, {
        headers: {
            connection: "keep-alive",

            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
        },
        referrerPolicy: "no-referrer-when-downgrade",
        body: "[]",
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(response.status + response.statusText);
    }
    const contenttype = response.headers.get("content-type");
    if ("application/json-rpc" !== contenttype) {
        throw new Error("content-type:" + contenttype);
    }
    await response.json();
}
