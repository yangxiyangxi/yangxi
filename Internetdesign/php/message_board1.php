<?php
	header("Content-Type:text/html;charset=UTF-8");
	
	$dbhost = 'localhost:3306';  // mysql服务器主机地址
	$dbuser = 'root';            // mysql用户名
	$dbpass = '';          // mysql用户名密码
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	if(! $conn )
	{
	  die('连接失败: ' . mysqli_error($conn));
	}
	echo '连接成功<br />';
	// 设置编码，防止中文乱码
	mysqli_query($conn , "set names utf8");
	 
	$name=$_POST['name'];
	$email=$_POST['email'];
	$tel=$_POST['tel'];
	$content=$_POST['content'];
	
	$name=mysqli_real_escape_string($conn,$name);
	$email=mysqli_real_escape_string($conn,$email);
	$content=mysqli_real_escape_string($conn,$content);
	
	$sql = "INSERT INTO message ".
	        "(name,email,tel,content) ".
	        "VALUES ".
	        "('$name','$email','$tel','$content')";
	
	
	
	 
	mysqli_select_db( $conn, 'weifuxin' );
	$retval = mysqli_query( $conn, $sql );
	if(! $retval )
	{
	  die('无法插入数据: ' . mysqli_error($conn));
	}
	if($retval){
		echo "<script>alert('留言提交成功！请等待回复！');
			window.location.href='../message_board.php';
			</script>";
	}
	echo "数据插入成功\n";
	mysqli_close($conn);
	
	
?>