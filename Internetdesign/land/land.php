<?php	
	header("Content-type: text/html; charset=utf-8");
	//当没有表单提交时 退出程序
	if(empty($_POST)){
		die('没有提交表单，程序退出');
	}
	//连接数据库
	$conn=mysqli_connect('localhost', 'root','');
	if(!$conn)die('数据库连接错误'.mysql_error());
	mysqli_query($conn, 'set names utf8');
	mysqli_query($conn, 'use land') or die('land数据库不存在');
	
	//获取数据
	$name=$_POST['name'];
	$password=$_POST['password'];
	//防止SQL注入
	$name=mysqli_real_escape_string($conn,$name);
	$password=mysqli_real_escape_string($conn,$password);
	
	$sql="select * from land_tab where name={$name}";
	$result = mysqli_query($conn,$sql);
	while($row = mysqli_fetch_assoc($result))
	{
		 $arr[]=$row;
		 if($arr[0]['password']==$_POST['password'])
			{
				echo 'success';
//				$url = "../index.html";  
//				header( "Location: $url" ); 
			}
			else
			{
				echo 'error';
			}
	}
?>	