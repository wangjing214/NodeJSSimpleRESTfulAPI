/**
 * user模块
 * 业务层：用户增、查、改、删
 * @time 2018-4/19 14:00
 * */

/**
 * POST:新建
 * @param object data.post
 * @param array data.get
 * @param object request 请求报文
 * @return json
 * */
const infoPost = function infoPostHandler(data, request) {
    return {'code':200, 'body':'infoPost success.postparam:' + data.post.username + '_getparam:' + typeof(data.get[0]) + data.get[0]};
}

/** GET:查询 **/
const infoGet = function infoGetHandler(data, request) {
    return {'code':200, 'body':'infoGet success.'};
}

/** PUT:修改 **/
const infoPut = function infoPutHandler(data, request) {
    return {'code':200, 'body':'infoPut success.'};
}

/** DELETE:删除  **/
const infoDelete = function infoDeleteHandler(data, request) {
    return {'code':200, 'body':'infoDelete success.'};
}

exports.infoPost = infoPost;
exports.infoGet = infoGet;
exports.infoPut = infoPut;
exports.infoDelete = infoDelete;