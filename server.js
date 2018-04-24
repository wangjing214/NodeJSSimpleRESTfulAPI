/**
 * 服务端：基于RESTful
 * @time 2018-4-19 10:09
 */
// 引入 http 模块
const http = require("http");
// 引入 url 模块
const url = require("url");
function server(route) {
    /** 1.解析url 2.路由分发 **/
    function onRequest(request, response) {
        var post = new Array();
        // 接收POST/PUT参数，nodejs默认不解析请求，因为恶意的post请求会大大消耗服务器的资源
        request.on('data', function (chunk) {
            post += chunk;
            post = post.replace(/[\r\n]/g,"");// 除去回车换行符
        });
        request.on('end', function () {
            console.log('server +');
            var r = {'code':404, 'body':'NOT FIND'};
            try {
                // 请求方法数组
                const localmethod = new Array('get', 'post', 'put', 'delete');
                // 获取请求方法
                const method = request.method.toLocaleLowerCase();// GET:查询|POST:新建|PUT:修改|DELETE:删除
                // 请求方法不在localmethod中，认为不是RESTful
                if(localmethod.indexOf(method)<0) {// -1是不在数组中
                    throw new Error('wrong:' + request.method);
                }
                // 解析请求
                const pathname = url.parse(request.url).pathname;
                ///
                console.log('  server.js: POST param is: ' + post);
                ///
                if(pathname!=="/favicon.ico") {
                    // 路由分发
                    const param = {'get':pathname, 'post':post};
                    r = route(param, method, request);
                    console.log('  server.js: r='+ JSON.stringify(r));
                }
            // 注：cache中不要使用response.end()，因为它会结束nodejs进程
            } catch (error) {
                console.log('catch +' + error);
                r.code = 404;
                r.body = error;
            }
            console.log('server -');
            response.writeHead(r.code, {"Content-Type": "text/plain; charset=utf-8'"});
            // 响应文件内容
            response.write("welcome!" + r.body);
            // 发送响应数据
            response.end();
        });
    }
    console.log('this is server.js');
    // 创建服务器
    const server = http.createServer(onRequest).listen(8888);
}
exports.start = server;