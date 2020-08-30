import { callaria2cdown } from "./callaria2cdown.js";
import { getdirectoryname } from "./getdirectoryname.js";
import { selectimagesfromdom } from "./selectimagesfromdom.js";
import { domtourl } from "./index.js";

//调用aria2c批量下载文件
//选择文档中的所有图片并去重
//下载相册一页中的图片
export async function downloadonepageallimages(document) {
    const directoryname = getdirectoryname(document);
    let fileurls = selectimagesfromdom(document);
    await callaria2cdown(fileurls, directoryname);
    console.log(
        "one page\xA0images\xA0download\xA0done " + domtourl.get(document)
        //
        //document.documentURI
    );
}
