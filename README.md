# koa-nunjucks
koa-nunjucks

基础的koa项目

包含静态资源映射
模板引擎koa-nunjucks
controller

# 1.0 新增
实现登陆验证
添加数据库表
添加 jsonwebtoken 到cookie，实现登录过期

```
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(13) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `creat_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `phone` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

```

