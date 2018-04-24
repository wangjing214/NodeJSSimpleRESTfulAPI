/**
 * 路由分发
 * @param object param 参数
 * @param string request URL的路径(path)部分
 * @param string method get|post|put|delete
 * @time 2018-4-19 10:09
 */
// 引入 querystring 模块
const querystring = require('querystring');
function route(param, method, request) {
    console.log('route +');
    console.log('  route.js: GET param is:' + param.get + '___methd is:' + method);
    // 路径解析:去掉第一个字符/，如/user_info变成user_info
    const newpathname = param.get.substring(1);
    if(newpathname === '') {
        console.log('i am ' + param.get);
    }
    // 路径解析:获取模块和事件名称，如get方法/user_info/123中user是模块名info是事件名称123是参数id
    const getdata = newpathname.split("/");
    const eventpath = getdata[0];
    const eventpathsplid = eventpath.split("_");
    // 模块名
    const eventname = eventpathsplid[0];
    // 事件名
    const handlername = eventpathsplid[1];
    // 事件名全称
    const handlernamefull = handlername + method.substring(0, 1).toUpperCase() + method.substring(1);
    // 引入模块
    const eventobj = require('./script/' + eventname);
    // 解析请求body体
    if(param.post.length != 0) {
        var postdata = querystring.parse(param.post);
    }
    // get是数组,post是对象
    const data = {'get':getdata, 'post':postdata};
    console.log('route -');
    // 执行模块中的函数
    return eval('eventobj' + '.' +  handlernamefull + "(data, request)");
}
exports.route = route;