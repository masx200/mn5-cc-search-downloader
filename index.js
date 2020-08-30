import { callaria2cdown } from "./callaria2cdown.js";
import { checkurl } from "./checkurl.js";
import { getdirectoryname } from "./getdirectoryname.js";
import { retryfetch } from "./retryfetch.js";
import { selectimagesfromdom } from "./selectimagesfromdom";
import { selectpagehtmlurls } from "./selectpagehtmlurls";
import { selectsearchresults } from "./selectsearchresults.js";
import { start } from "./start.js";
export const fetch = retryfetch;
// @ts-ignore
const rpcparam = new URL(import.meta.url).searchParams.get("rpc");
const rpcurl = rpcparam ?? "http://localhost:6800/jsonrpc";
checkurl(rpcurl);
export { rpcurl };
export const urltodom = new Map();
export const domtourl = new Map();
// ~(() => {

//window.fetch

//提取秀人网搜索页的网址并aria2c下载全部图片

//https://www.xiurenji.com/plus/search/index.asp?keyword=no.171&searchtype=title

//https://www.xiurenji.com/plus/search/index.asp?keyword=no.1&searchtype=title&p=1

//选择搜索的结果的网址

//下载相册所有页的图片
async function downloadallpagesfromdom(document) {
    const docs = [];
    const allpageurls = selectpagehtmlurls(document);
    await downloadonepageallimages(document);

    await Promise.all(
        allpageurls.map(async (url) => {
            let dom = await resolvedomfromurl(url);
            docs.push(dom);
            return await downloadonepageallimages(dom);
        })
    );

    console.log(
        "all\xA0images\xA0download\xA0done" + ":" + domtourl.get(document)

        //document.documentURI
    );

    urltodom.delete(document.documentURI);
    allpageurls.forEach((url) => urltodom.delete(url));
    //垃圾回收，删除
    domtourl.delete(document);
    docs.forEach((doc) => domtourl.delete(doc));
}

//调用aria2c批量下载文件

//选择文档中的所有图片并去重

//下载相册一页中的图片
async function downloadonepageallimages(document) {
    const directoryname = getdirectoryname(document);
    let fileurls = selectimagesfromdom(document);
    await callaria2cdown(fileurls, directoryname);
    console.log(
        "one page\xA0images\xA0download\xA0done " + domtourl.get(document)
        //
        //document.documentURI
    );
}
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

//下载搜索一页的网址图片
export async function downloadsearchonepageallimages(document) {
    for (let url of selectsearchresults(document)) {
        let doc = await resolvedomfromurl(url);
        await downloadallpagesfromdom(doc);
    }
    console.log(
        "all\xA0images\xA0download\xA0done" + ":" + domtourl.get(document)

        ////document.documentURI
    );
    //删除无用
    urltodom.delete(domtourl.get(document));

    domtourl.delete(document);
}

start();
// })();
