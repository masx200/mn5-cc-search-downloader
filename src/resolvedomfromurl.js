import { fetch } from "./fetch.js";
import { urltodom, domtourl } from "./urltodom.js";

//选择所有页选择按钮的网址链接
// const urltodom = new Map();
// const domtourl = new Map();
//从网址解析出文档
export async function resolvedomfromurl(url) {
    if (urltodom.get(url)) {
        return urltodom.get(url);
    }
    let parser = new DOMParser();
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.status + response.statusText);
    }
    const contenttype = response.headers.get("content-type");
    //Content-Type: text/html; Charset=GB2312
    if (!contenttype.startsWith("text/html")) {
        throw new Error("content-type:" + contenttype);
    }
    let buffer = await response.arrayBuffer();
    const text = new TextDecoder("gb2312").decode(buffer);
    let dom = parser.parseFromString(text, "text/html");
    urltodom.set(url, dom);

    domtourl.set(dom, url);
    return dom;
}
