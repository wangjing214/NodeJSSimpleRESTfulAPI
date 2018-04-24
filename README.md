# 简介simpleRESTfulNodeJSAPI
是基于RESTful风格的nodejsAPI。用于服务器间的接口调用，比如做为中间层的nodejs调用java接口，将基于RESTful风格的nodejs数据吐给接口调用方。好处是公认RESTful规范利于server-client双方理解，无需再约定私有规范。

# 版本要求：nodejs软件版本大于 v0.3.6，否则不支持http模块

# 目录结构：
.
├── ./index.js　　　　　　入口文件
├── ./log.txt             log文件，用于接收console.log()输出
├── ./route.js　　　　　　解析路由
├── ./script              目录，用于存储业务模块
│   └── ./script/user.js  
└── ./server.js           创建服务器

# 使用：
    遵循RESTful风格的nodejs的服务端接口调用框架
    路由分发原理：模块指向函数
    RESTful接口使用举例：
        安利 What is RESTful and how to use?
            1. method=GET, http://i.com:8888/user_info/100，获取id=100的文章内容，无body体
            2. method=POST, http://i.com:8888/user_info，body体是文章标题、缩略图等信息，添加一篇文章
            3. method=PUT, http://i.com:8888/user_info/100，修改id=100的文章 or 添加一个id=100的文章，body体是文章标题、缩略图等信息
            4. method=DELETE, http://i.com:8888/user_info/100，删除id=100的文章，无body体

        index.js同级目录的/script目录下user.js模块中的info+Method函数。
            示例代码/script/user.js：
            请求http://i.com:8888/user_info (PS:user_info直译用户信息)
            post数据username=wangjing, age=18
            const infoPost = function infoPostHandler(data, request) {
                return {'code':200, 'body':'success.username=' + data.post.username + '_firstgetparam=' + data.get[0]}
                //返回 {'code':200, 'body':'success.username=wangjing_firstgetparam=user_info'}
            }
            exports.infoPost = infoPost;
            PS：一目了然记住每一个接口，比如get获取用户信息、post新增用户信息、put修改用户信息、delete删除用户信息。
			
            GET ,请求http://i.com:8888/user_info/id时，访问的是/script目录下user.js模块下的infoGET，infoGET=info+GET
            POST,请求http://i.com:8888/user_info/id时，访问的是/script目录下user.js模块下的infoPost，infoPost=info+POST
    infoMethod()函数返回对象格式：return {'code':200, 'body':'success.'}

# 开启nodejs服务命令：nohap node index.js > log.txt &

# log.txt
suci@ubuntu001:/var/www/nodeframe$ tailf log.txt
this is server.js
server +
  server.js: POST param is: username=iamusernam&password=iampassword
route +
  route.js: GET param is:/user_info/123___methd is:post
route -
  server.js: r={"code":200,"body":"infoPost success.postparam:iamusernam_getparam:stringuser_info"}
server -