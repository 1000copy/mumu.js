# fullstack.js - 大纲

升级JS急速教程的目标和WBS任务分解

    
## 目标

不变的是数据和操作的原始需求

其中的CRD指的是Create、Read、Delete。针对的数据对象，就是一个Todo对象，看起来是这样的：

    {id:1,subject:"Loving"}

如果是多个数据对象，看起来是这样的：

    [
      {id:1,subject:"Loving"}，
      {id:1,subject:"Writing"}，
      {id:1,subject:"Preying"}
    ]

这个看起来很简单平实的JS对象，会在一组组函数、模块和对象之间流动，甚至跨越网络边界，从内存到硬盘。它会被存储在Mongodb内，也会从Mongodb提取出来，在用户界面、HTTP客户端，HTTP服务器传递。整个App看起来就是一台机器，可以说代码在运，转这个机器，但是也不妨说是数据在驱动这个它。

## 过往的实现方法
    
        使用Vuejs脚手架，快速搭建一个CRD用户界面。会使用vuex管理状态，使用vue-router管理路由。
        使用Mongodb存储和提供后端CRD服务。
        使用Nodejs搭建后端CRD服务。
        使用Fecth|Axios访问后端CRD服务
        使用bulfy的美化组件的方法
        整合全栈服务

## 现在的实现方法

目标是更多的减少依赖

客户端UI
- 使用纯粹的HTML+Vanila.js ,而不是vue.js
- 使用无class的CSS，比如Water.css，而不是bulfy这样的美化组件的方法

Service层
- 使用Fecth访问后端CRD服务，自己解析Body，而不是使用body-parser
- 自己搭建Web，而不是使用express.js
- 使用object post，而不是区分get／post方法

存储
- 使用JSON文件。测试JSON文件的CRD。


## WBS

客户端UI
- 使用纯粹的HTML+Vanila.js ,而不是vue.js
- 使用无class的CSS，比如Water.css，而不是bulfy这样的美化组件的方法

Service层
- 使用Fecth访问后端CRD服务，自己解析Body，而不是使用body-parser
- 自己搭建Web，而不是使用express.js。资源：https://www.30secondsofcode.org/js/s/nodejs-static-file-server/
- 使用object post。可以资源https://github.com/1000copy/JsonDispatch

测试和开发变量
- checkjs https://github.com/1000copy/checkjs
- matrixreloadjs https://github.com/1000copy/matrixreloadjs

## 目录结构

	index.js 
	web 静态文件包括html，css，js等
	test 测试文件
		jsonfile.js
	src  源代码目录
	lib 
		check.js
		dispatch.js
		jsonparser.js
		reload.js

- 
## 动机

我想要弄一个简化的应用，去验证下目前的免费云可以做的事情。好几个需要验证的，服务状况各不相同，因此这个简化的应用当然最好不要那么多的依赖，否则不好测试验证。

https://blog.51cto.com/u_15060545/2641343

# mumu.js
