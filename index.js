//提取秀人网搜索页的网址并aria2c下载全部图片

//https://www.xiurenji.com/plus/search/index.asp?keyword=no.171&searchtype=title




//https://www.xiurenji.com/plus/search/index.asp?keyword=no.1&searchtype=title&p=1

//选择搜索的结果的网址
function selectsearchresults(document) {
  return Array.from(document.querySelectorAll(".node  .title1 a")).map(
    (a) => a.href
  );
}
//获得相册文件夹名
function getdirectoryname(document) {
  let directoryname =
  //  document.title +
  //  "\xA0" +
    document.querySelectorAll(`.ina > p > b:nth-child(2)`)[0]?.textContent ??document.title ;
  return directoryname;
}
//下载相册所有页的图片
async function downloadallpagesfromdom(document) {
  return downloadonepageallimages(document).then(() => {
    return Promise.all(
      selectpagehtmlurls(document).map(async (url) => {
        let dom = await resolvedomfromurl(url);
        return await downloadonepageallimages(dom);
      })
    ).then(() => {
      console.log("all\xA0images\xA0download\xA0done"+":"+document.documentURI);
    });
  });
}

//调用aria2c批量下载文件
async function callaria2cdown(fileurls, directoryname) {
  
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
  }
  }
  );
  let response = await fetch("http://localhost:6800/jsonrpc", {
    headers: {
      accept: "application/json,\xA0text/javascript,\xA0*/*;\xA0q=0.01",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json;\xA0charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
    },
    referrer: "http://aria2c.com/",
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
//选择文档中的所有图片并去重
function selectimagesfromdom(document) {
  var fileurls = Array.from(
    new Set(
      Array.from(document.querySelectorAll("img"))
        .map((e) => e.src)
        .filter((a) => !!a)
        .filter((a) => a.startsWith("http"))
    )
  );
  return fileurls;
}
//下载相册一页中的图片
async function downloadonepageallimages(document) {
  const directoryname = getdirectoryname(document);
  let fileurls = selectimagesfromdom(document);
  return callaria2cdown(fileurls, directoryname);
}
//选择所有页选择按钮的网址链接
function selectpagehtmlurls(document) {
 // console.log(document)
  return Array.from(
    new Set(
      Array.from(
        document.querySelectorAll(".page a")
      ).map((a) => a.href)
    )
  );
}
//从网址解析出文档
async function resolvedomfromurl(url) {
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
  return dom;
}

//下载搜索一页的网址图片
async function downloadsearchonepageallimages(document) {
  for (let url of selectsearchresults(document)) {
    let doc = await resolvedomfromurl(url);
    await downloadallpagesfromdom(doc);
  }
  console.log("all\xA0images\xA0download\xA0done"+":"+document.documentURI);
}

//下载搜索一页的相册

//下载所有搜索页的相册的图片
async function alldownloadsearchpageallimages(document) {
 // console.log(document)
  for (let url of selectpagehtmlurls(document)) {
    let doc = await resolvedomfromurl(url);
    await downloadsearchonepageallimages(doc);
  }
  console.log("all\xA0images\xA0download\xA0done"+":"+document.documentURI);
}
//下载所有搜索页的相册
alldownloadsearchpageallimages(document).then(()=>{console.log('全部处理完成')});