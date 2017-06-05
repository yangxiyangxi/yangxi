	var Obtn=document.getElementById('btn');
	Obtn.onclick=function(){
		var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //创建XMLHTTP对象，考虑兼容性。XHR
	    xmlhttp.open("POST", 'land.php', true); //“准备”向服务器的GetDate1.ashx发出Post请求（GET可能会有缓存问题）。这里还没有发出请求
		xmlhttp.send(); 
	    //AJAX是异步的，并不是等到服务器端返回才继续执行
	    xmlhttp.onreadystatechange = function ()
	    {
	        if (xmlhttp.readyState == 4) //readyState == 4 表示服务器返回完成数据了。之前可能会经历2（请求已发送，正在处理中）、3（响应中已有部分数据可用了，但是服务器还没有完成响应的生成）
	        {
	            if (xmlhttp.status == 200) //如果Http状态码为200则是成功
	            {
	                alert(xmlhttp.responseText);
	            }
	            else
	            {
	                alert("AJAX服务器返回错误！");
	            }
	        }
	    }
	}
   
	
    
    
