import { selectpagehtmlurls } from "./selectpagehtmlurls.js";
import { domtourl } from "./index.js";
import { resolvedomfromurl } from "./resolvedomfromurl.js";
import { downloadsearchonepageallimages } from "./downloadsearchonepageallimages.js";

//下载搜索一页的相册
//下载所有搜索页的相册的图片

export async function alldownloadsearchpageallimages(document) {
    // console.log(document)
    for (let url of selectpagehtmlurls(document)) {
        let doc = await resolvedomfromurl(url);
        await downloadsearchonepageallimages(doc);
    }
    console.log(
        "all\xA0images\xA0download\xA0done" + ":" + domtourl.get(document) ||
            document.documentURI
        //document.documentURI
    );
}
