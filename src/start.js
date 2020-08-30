import { domtourl, urltodom } from "./urltodom.js";
import { alldownloadsearchpageallimages } from "./alldownloadsearchpageallimages.js";
import { testconnect } from "./testconnect.js";

export async function start() {
    await testconnect();
    //下载所有搜索页的相册
    await alldownloadsearchpageallimages(document).then(() => {
        domtourl.clear();
        urltodom.clear();
        console.log("全部处理完成");
        alert("全部处理完成");
    });
}
