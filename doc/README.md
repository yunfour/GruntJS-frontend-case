GruntJS-frontend-case
=====================

这是一个使用GruntJS构建的前端项目，这项目是在上家公司开发的一个web端的后台系统；整个项目以jQuery为底层库，以seaJS为基础的模块化开发模式。使用GruntJS对整个项目的代码进行压缩、合并、模块转化、LESS代码编译等自动化的操作。以下内容是对整个项目进行详细的说明。

##为什么这么做
1. 资源分类、分版本管理
2. CSS、JS模块化开发，降低耦合和全局冲突
3. 比较适合多人合作开发，互不干涉
4. 同一个网站可以引用多个库/框架


##目录结构
* css/            ——经过GruntJS处理（编译LESS、压缩、合并）后的CSS、LESS文件
* gallery/        ——精选的前端框架、库、插件等工具，如：jQuery、Bootstrap
* html/           ——开发的静态HTML页面
* images/         ——存放图片
* js/             ——经过GruntJS处理后的JS文件
* src/            ——未经处理的CSS、JS、LESS、图片等资源的源代码和源文件
* test/           ——一些测试用的代码文件
* Gruntfile.js    ——grunt配置文件
* README.MD       ——说明


##需要掌握哪些知识
1. 使用seajs进行模块化开发和CSS模块化概念
2. GruntJS及其常用插件的使用
3. JS面向对象开发和简单的设计模式
4. 代码规范和注释