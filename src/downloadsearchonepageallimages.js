import { selectsearchresults } from "./selectsearchresults.js";
import { domtourl, urltodom } from "./urltodom.js";
import { downloadallpagesfromdom } from "./downloadallpagesfromdom.js";
import { resolvedomfromurl } from "./resolvedomfromurl.js";

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
