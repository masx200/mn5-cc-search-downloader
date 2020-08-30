//获得相册文件夹名
export function getdirectoryname(document) {
    let directoryname =
        //  document.title +
        //  "\xA0" +
        document.querySelectorAll(`.ina > p > b:nth-child(2)`)[0]
            ?.textContent ?? document.title;
    return directoryname;
}
