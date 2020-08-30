import { downloadonepageallimages } from "./downloadonepageallimages.js";
import { resolvedomfromurl } from "./resolvedomfromurl.js";
import { selectpagehtmlurls } from "./selectpagehtmlurls.js";
import { domtourl, urltodom } from "./index.js";

// ~(() => {
//window.fetch
//提取秀人网搜索页的网址并aria2c下载全部图片
//https://www.xiurenji.com/plus/search/index.asp?keyword=no.171&searchtype=title
//https://www.xiurenji.com/plus/search/index.asp?keyword=no.1&searchtype=title&p=1
//选择搜索的结果的网址
//下载相册所有页的图片
export async function downloadallpagesfromdom(document) {
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
