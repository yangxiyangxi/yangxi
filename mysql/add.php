<?php
	header("Content-type: text/html; charset=utf-8"); 
	if(empty($_POST)){
		die("没有提交表单，程序退出");
	}
	//判断表单中各字段是否都填写
	$check_field=array('nickname','gender','email','qq','url','city','skill','description');
	foreach($check_field as $v){
		if(empty($_POST[$v])){
			die('错误：'.$v.'字段不能为空');
		}
	}
	
	$nickname=$_POST['nickname'];
	$gender=$_POST['gender'];
	$email=$_POST['email'];
	$qq=$_POST['qq'];
	$url=$_POST['url'];
	$city=$_POST['city'];
	$skill=implode(',',$_POST['skill']) ;//原来的多选框是数组，转成字符串
	$description=$_POST['description'];
	
	//连接数据库，设置字符集，选择数据库
	$conn=mysqli_connect('bdm266102535.my3w.com', 'bdm266102535', '886645886645yx');
	if(!$conn)die('数据库连接错误'.mysqli_error());
	mysqli_query($conn, 'set names utf8');
	mysqli_query($conn, 'use bdm266102535_db') or die('bdm266102535_db数据库不存在');
	
	//防止SQL注入
	$nickname=mysqli_real_escape_string($conn,$nickname);
	$email=mysqli_real_escape_string($conn,$email);
	$qq=mysqli_real_escape_string($conn,$qq);
	$url=mysqli_real_escape_string($conn,$url);
	$description=mysqli_real_escape_string($conn,$description);
	
	//判断昵称是否存在
	//$sql="select * from `user` where `username`='$username'";
	$sql="select `nickname` from `userinfo` where `nickname`='$nickname'";
	//echo $sql;
	$result=mysqli_query($conn, $sql);
	if(mysqli_fetch_row($result)){
		die('昵称已经存在，请换个昵称。');
	}
	
	//拼接SQL语句
//	$sql="INSERT INTO `user`(`username`, `password`, `email`) VALUES ('$username','$password','$email')";
	$sql="INSERT INTO `userinfo`(`nickname`,`gender`,`email`,`qq`,`url`,`city`,`skill`,`description`) VALUES ('$nickname','$gender','$email','$qq','$url','$city','$skill','$description')";
//	echo $sql;
	//执行SQL语句
	$res=mysqli_query($conn, $sql);
	//输出执行SQL语句和执行结果，
	if($res){
		echo "个人资料编辑成功";
	}else{
		echo "个人资料编辑失败".mysql_error();
	}
?>