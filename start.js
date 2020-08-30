import { domtourl, urltodom } from "./index.js";
import { alldownloadsearchpageallimages } from "./alldownloadsearchpageallimages";

export async function start() {
    //下载所有搜索页的相册
    alldownloadsearchpageallimages(document).then(() => {
        domtourl.clear();
        urltodom.clear();
        console.log("全部处理完成");
        alert("全部处理完成");
    });
}
