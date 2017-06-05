            window.onload=function(){
            var owrap=document.getElementsByClassName("up1")[0];
		    var obox=owrap.getElementsByClassName("box")[0];
			var oul1=document.getElementsByClassName("myfocus")[0];
			var ocicle=document.getElementsByClassName("cicle")[0];
			var ali=ocicle.getElementsByTagName("li");
			var a=["#99D4F2","#41E99C","#EEADB1","#6FA3DB","#A6DE94" ];
			
			var timer1=null;
			function move(obj,ispeed,target){
				 clearInterval(timer1);
				 //注意不能用left=offsetleft,下面直接用.left 因为这样left不变
				  timer1=setInterval(function(){
				  		if(obj.offsetLeft==target*k){
				  			//错。没有*k
				  			clearInterval(timer1);
//				  			obj.style.left=obj.offsetLeft+0+"px";
				  		}else{
				  			obj.style.left=obj.offsetLeft+ispeed+"px";
				  		}
				  },30)
			}
			var timer=null;
			var k=0;
			//			错,放在外面
			function autoplay(){
				timer=setInterval(function(){
					k++;
					if(k>4){
						k=0;
					}
				   move(oul1,-78,-780);
                   for(var j=0;j<ali.length;j++){
				    ali[j].className="";
			        }
					ali[k].className="spot";
					owrap.style.background=a[k];
					oul1.style.left=-k*780+"px";
				},2000)
			}
			//点击
			for(var i=0;i<ali.length;i++){
				ali[i].index=i;
				ali[i].onclick=function(){
					for(var j=0;j<ali.length;j++){
				    ali[j].className="";
			}
					ali[this.index].className="spot";
					owrap.style.background=a[this.index];
					//					oul1.style.left=-k*780+"px";
					oul1.style.left=-this.index*780+"px";
					
				}
				
			}
			autoplay();
			obox.onmouseover=function(){
				clearInterval(timer);
				clearInterval(timer1);
				//				错,只清除了一个
			}
			obox.onmouseout=function(){
				autoplay();
			}
			   
			   //分享到的模块设计
			   
			   var oshare=document.getElementById("share");
			var oshare1=document.getElementById("share1");
			var timer=null;
			var s=-120;
			function startmove(itarget){
				 
			clearInterval(timer);
			timer=setInterval(function(){
				var iSpeed=0;
				if(s<itarget){
					iSpeed=10;
			    }else{
				    iSpeed=-10;	
				}
			    if(s==itarget){
					clearInterval(timer);
				}else{
					
					s+=iSpeed; 
				}
				oshare.style.right=s+"px";
				console.log(oshare.style.right)
			},100) 
		}
		oshare.onmouseover=function(){
			startmove(0);
		}
		oshare.onmouseout=function(){
			startmove(-120);
		}
		
			   
            }
           