# mn5-cc-search-downloader

网站 https://www.mn5.cc 和 https://www.xiurenji.com 的搜索页面的批量下载图片浏览器脚本

# 使用方法

1.打开搜索页面

https://www.mn5.cc/plus/search/index.asp

或者

https://www.xiurenji.com/plus/search/index.asp

搜索框输入内容,点击搜索

3.把内容复制到浏览器控制台运行

```js
import(
    "https://cdn.jsdelivr.net/gh/masx200/mn5-cc-search-downloader@latest/src/index.js"
);
```

# 注意:

需要配合 arai2c 使用，

https://aria2.github.io/

aria2 RPC 默认调用网址为

http://localhost:6800/jsonrpc

也可以在加载脚本前,通过设置变量`window[Symbol.for("rpcurl")]`来修改,例如

```js
window[Symbol.for("rpcurl")] = "http://localhost:7000/jsonrpc";
```

aria2c RPC 配置

https://github.com/masx200/aria2c-backend-rpc-config
