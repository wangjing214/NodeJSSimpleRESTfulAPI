/** nodejs入口 **/
const server = require('./server');
const router = require('./route');
server.start(router.route);