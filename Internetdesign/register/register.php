<?php
	header("Content-type: text/html; charset=utf-8"); 
	//查看提交的表单
//	var_dump($_POST);
//	$arr=array(
//	 'username' => 'aadmin',
//	  'email' => '123456',
//	  'password' =>'123456'
//	);
//	
//	echo '<h1>接收到用户的注册信息如下：</h1>';
//	echo '<p>用户名是：'.$_POST['username'].'</p>';
//	echo '<p>密码是：'.$_POST['password'].'</p>';
//	echo '<p>邮箱是：'.$_POST['email'].'</p>';
//	echo '<p>IP地址是：'.$_SERVER['REMOTE_ADDR'].'</p>';
//	echo '<p>浏览器环境是：'.$_SERVER['HTTP_USER_AGENT'].'</p>';
//	echo '<p>请求来源是：'.$_SERVER['HTTP_REFERER'].'</p>';

	//当没有表单提交时 退出程序
	if(empty($_POST)){
		die('没有提交表单，程序退出');
	}
	
	//判断表单中各字段是否都填写
	$check_fields=array('username','password','email');
	//var_dump($check_fields);
	foreach($check_fields as $v){
		if(empty($_POST[$v])){
			die('错误：'.$v.'字段不能为空！');
		}
	}
	
	//接收需要处理的表单字段
	$username=$_POST['username'];
	$password=$_POST['password'];
	$email=$_POST['email'];
	
	//连接数据库，设置字符集，选择数据库
	
	$conn=mysqli_connect('localhost', 'root','');
	if(!$conn)die('数据库连接错误'.mysql_error());
	mysqli_query($conn, 'set names utf8');
	mysqli_query($conn, 'use php2') or die('php2数据库不存在');
	//echo $username,$email;
	
	//防止SQL注入
	$username=mysqli_real_escape_string($conn,$username);
	$email=mysqli_real_escape_string($conn,$email);
	//echo $username,$email;
	
	//判断用户名是否存在
	//$sql="select * from `user` where `username`='$username'";
	$sql="select `id`,`username` from `user` where `username`='$username'";
	//echo $sql;
	$result=mysqli_query($conn, $sql);
	if(mysqli_fetch_row($result)){
		die('用户名已经存在，请换个用户名。');
	}
	//使用MD5增强密码的安全性
	$password=md5($password);
	
	//拼接SQL语句
	$sql="INSERT INTO `user`(`username`, `password`, `email`) VALUES ('$username','$password','$email')";
	echo $sql;
	//执行SQL语句
	$res=mysqli_query($conn, $sql);
	//输出执行SQL语句和执行结果，
	if($res){
		echo "注册成功";
	}else{
		echo "注册失败".mysql_error();
	}
	
?>