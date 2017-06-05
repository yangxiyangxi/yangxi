<?php 
	header("Content-Type:text/html;charset=utf-8");
	$conn=mysqli_connect('localhost', 'root','');
	if(!$conn)die('数据库连接错误'.mysql_error());
	mysqli_query($conn, 'set names utf8');
	mysqli_query($conn, 'use weifuxin') or die('php2数据库不存在');
	$sql='select * from message';
	$res=mysqli_query($conn,$sql);
	if(!$res)die(mysql_error());
	$user_info=array();
	while($row =mysqli_fetch_assoc($res)){
		$user_info[]=$row;
	}
	var_dump($user_info);
?>	
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<meta charset="utf-8">
   		<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="bootstrap/dist/css/bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="css/message_board.css"/>
		<script type="text/javascript" src="jquery-1.12.4.min.js"></script>
		<script type="text/javascript" src="bootstrap/dist/js/bootstrap.js"></script>
		 <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    	<!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	</head>
	<body>
		<!--header-nav-->
		<div class="header navbar-fixed-top">
			<div class="container">
				<nav class="navbar ">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse"
								data-target="#example-navbar-collapse">
			
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="message_board.php">留言板</a>
					</div>
					<div class="collapse navbar-collapse" id="example-navbar-collapse">
						<ul class="nav navbar-nav">
							<li ><a href="news.html">新闻动态</a></li>
							<li><a href="about.html">关于我们</a></li>
							<li><a href="contact.html">联系我们</a></li>
							<li><a href="business_culture.html">企业文化</a></li>
							<li><a href="Product _service .html">产品服务</a></li>
							<li><a href="index.html">首页</a></li>
							<li>
								<a href="land/land.html">登录</a>
							</li>
							<li><a href="register/register.html">注册</a></li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
		<!--轮播-->
		<div class="row" id="Carousel">
			<div class="col-lg-12">
				<div id="myCarousel" class="carousel slide">
					<!-- 轮播（Carousel）指标 -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
				
					</ol>   
					<!-- 轮播（Carousel）项目 -->
					<div class="carousel-inner">
						<div class="item active">
							<img src="img/AD0In8v4BRACGAAgkZucwwUo3fn_yAIwgA841gI.jpg" alt="First slide" class="img">
							
						</div>
						<div class="item">
							<img src="img/AD0In8v4BRACGAAgkZucwwUogset9QcwgA841gI.jpg" alt="Second slide" class="img">
							
						</div>
					</div>
				
				</div> 
			</div>
		</div>
		<!--content-->
		<div class="container content">
			<h3>发表你的留言</h3>
			<form action="php/message_board1.php" method="post" id="message">
				<div class="ipt">
					<span>姓名：</span>
					<input type="text" name="name" value=""/>
				</div>
				<div class="ipt">
					<span>邮箱：</span>
					<input type="email" name="email" id="" value="" />
				</div>
				<div class="ipt">
					<span>电话：</span>
					<input type="text" name="tel" id="" value="" />
				</div>
				<div class="ipt">
					<span style="float: left;">内容：</span>
					<textarea name="content" rows="5" cols="70"></textarea>
				</div>
				<div class="ipt">
					<span>验证码：</span>
					
				</div>
				<div class="ipt">
					<input type="submit" value="提交留言" class="btn btn-success"/>
				</div>
				<div class="message">
					<?php foreach($user_info as $row){?>	
					<div class="user_mes">
						<h3>
							<span><?php echo "姓名:".$row['name']; ?></span>
							<span><?php echo "发表时间:".$row['date']; ?></span>
						</h3>
						<p><?php echo "留言内容:".$row['content']; ?></p>
					</div>
					<?php } ?>
				</div>
				
			</form>
		</div>
		<!--footer-->
		<div class="footer">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<a href="index.html">首页</a>
						<a href="business_culture.html">企业文化</a>
						<a href="about.html">关于我们</a>
						<a href="contact.html">联系我们</a>
						<a href="news.html">新闻动态</a>
						<a href="Product _service .html">产品服务</a>
						<a href="message_board.php">留言板</a>
					</div>
					<div class="col-xs-12">
						<span>Copyright © Ghost中文网</span>
						<span>|</span>
						<span>京ICP备11008151号</span>
						<span>|</span>
						<span>京公网安备11010802014853</span>
					</div>
				</div>	
			</div>
		</div>
	</body>
	<script type="text/javascript" src="js/message_board.js"></script>
</html>
