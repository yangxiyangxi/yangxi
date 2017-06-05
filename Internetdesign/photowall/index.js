var aImg=document.querySelectorAll('img');
var btn=document.getElementById('btn');
var start=0;
var on=true;

btn.onclick=function(){
	if(!on){
		console.log(on);
		return;
	}
	on=false;
	console.log(on);
	
	for(var i=0;i<aImg.length;i++){
		(function(i){
			setTimeout(function(){
				sport(aImg[i],'100ms',function(){
					this.style.transform='scale(0)';
					
				},function(){
					//第二步运动
					sport(this,'1s',function(){
						this.style.transform='scale(1)';
						this.style.opacity=0;
					},function(){
						start++;
						if(start==aImg.length){
							diSan();
							setTimeout(function(){
								parent.document.location.reload();//相当于F5 
							},3000);
						}
						
					})
				})
			},Math.random()*1000)
		})(i)
	}
}
//sport的传参，对象，时间，运动的属性函数，回调函数
function sport(obj,time,doFn,callBack){
	obj.style.transition=time;
	doFn.call(obj);//调用函数，并把this指向obj
	var called=false;//解决transitonend的调用多次的BUG
	obj.addEventListener('transitionend',function(){
		if(!called){
			callBack&&callBack.call(obj);
			called=true;
		}
	},false)
}
var allEnd=0;
function diSan(){
	
	for(var i=0;i<aImg.length;i++){
		aImg[i].style.transition='';
		aImg[i].style.transform='translateZ(-'+Math.random()*900+'px) rotateY(0deg)';
		(function(i){
			setTimeout(function(){
				sport(aImg[i],'2s',function(){
					this.style.transform='translateZ(0) rotateY(-360deg)';
					this.style.opacity=1;
					
				},function(){
					allEnd++;
					if(allEnd==aImg.length){
						on=true;
					}
				})
			},Math.random()*1000)
		})(i)
	}
	console.log(i);
	
}
