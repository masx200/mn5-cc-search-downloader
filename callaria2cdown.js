import { fetch, rpcurl } from "./index.js";

export async function callaria2cdown(fileurls, directoryname) {
    var data = fileurls.map((url) => {
        const origin = new URL(url).origin + "/";
        return {
            jsonrpc: "2.0",
            method: "aria2.addUri",
            id: 1,
            params: [
                [url],
                {
                    header: [
                        "Referer: " + origin,
                        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                    ].join("\n"),
                    dir: directoryname,
                    split: "16",
                    "max-connection-per-server": "16",
                    "seed-ratio": "1.0",
                },
            ],
        };
    });
    let response = await fetch(rpcurl, {
        headers: {
            accept: "application/json,\xA0text/javascript,\xA0*/*;\xA0q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json;\xA0charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
        },
        //  referrer: "http://aria2c.com/",
        referrerPolicy: "no-referrer-when-downgrade",
        body: JSON.stringify(data),
        method: "POST",
        mode: "cors",
    });
    if (!response.ok) {
        throw new Error(response.status + response.statusText);
    }
    const contenttype = response.headers.get("content-type");
    if ("application/json-rpc" !== contenttype) {
        throw new Error("content-type:" + contenttype);
    }
}
