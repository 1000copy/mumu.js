# mumu.js
    
## 目标

1. 记录奶量

奶量的JSON对象

    {id:1,q:120,date:"2023-08-18","09:10"}

多个对象，看起来是这样的：

    [
      {id:1,q:120,date:"2023-08-18","05:10"},
      {id:1,q:120,date:"2023-08-18","09:10"}
      {id:1,q:120,date:"2023-08-18","15:10"}
      {id:1,q:120,date:"2023-08-18","18:00"}
    ]

数据库表格
	
	create table meta (build integer)
	insert into meta values(1)
	create table milk (id integer,q integer,d text,t text)

## WBS

1. 数据库的创建和升级
- 数据库不存在就执行sql/c.sql
- 数据库存在,就检查build，执行此build number之后的就执行sql/a.{version}.sql

## 实现方法

目标是更多的减少依赖

客户端UI
- 使用纯粹的HTML+Webcomponents
- 使用无class的CSS，比如Water.css

Service层
- 使用Fecth访问后端CRD服务，自己解析Body，而不是使用body-parser
- 自己搭建Web，而不是使用express.js
- 使用object post，而不是区分get／post方法

存储
- 使用JSON文件。测试JSON文件的CRD。


## 细分

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

完成带娃的流水账app


