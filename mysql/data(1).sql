
-- 用户信息表
create table `userinfo`(
    `id` int unsigned primary key auto_increment,
    `nickname` varchar(10) not null,
    `gender` enum('男','女') not null,
    `email` varchar(40) not null,
    `qq` varchar(20) not null,
    `url` varchar(200) not null,
    `city` varchar(10) not null,
    `skill` text not null,
    `description` text not null
)charset=utf8;

-- 插入测试数据
insert into `userinfo` values (1,'小明','男','test@123.com','12345678',
'http://www.baidu.com','上海','JavaScript,PHP','大家好！');



