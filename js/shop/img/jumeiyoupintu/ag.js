(function() {
	var BASE64_MAPPING = [
  		'A','B','C','D','E','F','G','H',
  		'I','J','K','L','M','N','O','P',
  		'Q','R','S','T','U','V','W','X',
  		'Y','Z','a','b','c','d','e','f',
  		'g','h','i','j','k','l','m','n',
  		'o','p','q','r','s','t','u','v',
  		'w','x','y','z','0','1','2','3',
  		'4','5','6','7','8','9','-','_'
  	];

  	/**
  	 *ascii convert to binary
  	 */
  	var _toBinary = function(ascii){
  		var binary = new Array();
  		while(ascii > 0){
  			var b = ascii%2;
  			ascii = Math.floor(ascii/2);
  			binary.push(b);
  		}
  		/*
  		var len = binary.length;
  		if(6-len > 0){
  			for(var i = 6-len ; i > 0 ; --i){
  				binary.push(0);
  			}
  		}*/
  		binary.reverse();
  		return binary;
  	};

  	/**
  	 *binary convert to decimal
  	 */
  	var _toDecimal  = function(binary){
  		var dec = 0;
  		var p = 0;
  		for(var i = binary.length-1 ; i >= 0 ; --i){
  			var b = binary[i];
  			if(b == 1){
  				dec += Math.pow(2 , p);
  			}
  			++p;
  		}
  		return dec;
  	};

  	/**
  	 *unicode convert to utf-8
  	 */
  	var _toUTF8Binary = function(c , binaryArray){
  		var mustLen = (8-(c+1)) + ((c-1)*6);
  		var fatLen = binaryArray.length;
  		var diff = mustLen - fatLen;
  		while(--diff >= 0){
  			binaryArray.unshift(0);
  		}
  		var binary = [];
  		var _c = c;
  		while(--_c >= 0){
  			binary.push(1);
  		}
  		binary.push(0);
  		var i = 0 , len = 8 - (c+1);
  		for(; i < len ; ++i){
  			binary.push(binaryArray[i]);
  		}

  		for(var j = 0 ; j < c-1 ; ++j){
  			binary.push(1);
  			binary.push(0);
  			var sum = 6;
  			while(--sum >= 0){
  				binary.push(binaryArray[i++]);
  			}
  		}
  		return binary;
  	};

  	var __BASE64 = {
  			/**
  			 *BASE64 Encode
  			 */
  			encoder:function(str){
  				var base64_Index = [];
  				var binaryArray = [];
  				for(var i = 0 , len = str.length ; i < len ; ++i){
  					var unicode = str.charCodeAt(i);
  					var _tmpBinary = _toBinary(unicode);
  					if(unicode < 0x80){
  						var _tmpdiff = 8 - _tmpBinary.length;
  						while(--_tmpdiff >= 0){
  							_tmpBinary.unshift(0);
  						}
  						binaryArray = binaryArray.concat(_tmpBinary);
  					}else if(unicode >= 0x80 && unicode <= 0x7FF){
  						binaryArray = binaryArray.concat(_toUTF8Binary(2 , _tmpBinary));
  					}else if(unicode >= 0x800 && unicode <= 0xFFFF){//UTF-8 3byte
  						binaryArray = binaryArray.concat(_toUTF8Binary(3 , _tmpBinary));
  					}else if(unicode >= 0x10000 && unicode <= 0x1FFFFF){//UTF-8 4byte
  						binaryArray = binaryArray.concat(_toUTF8Binary(4 , _tmpBinary));	
  					}else if(unicode >= 0x200000 && unicode <= 0x3FFFFFF){//UTF-8 5byte
  						binaryArray = binaryArray.concat(_toUTF8Binary(5 , _tmpBinary));
  					}else if(unicode >= 4000000 && unicode <= 0x7FFFFFFF){//UTF-8 6byte
  						binaryArray = binaryArray.concat(_toUTF8Binary(6 , _tmpBinary));
  					}
  				}

  				var extra_Zero_Count = 0;
  				for(var i = 0 , len = binaryArray.length ; i < len ; i+=6){
  					var diff = (i+6)-len;
  					if(diff == 2){
  						extra_Zero_Count = 2;
  					}else if(diff == 4){
  						extra_Zero_Count = 4;
  					}
  					//if(extra_Zero_Count > 0){
  					//	len += extra_Zero_Count+1;
  					//}
  					var _tmpExtra_Zero_Count = extra_Zero_Count;
  					while(--_tmpExtra_Zero_Count >= 0){
  						binaryArray.push(0);
  					}
  					base64_Index.push(_toDecimal(binaryArray.slice(i , i+6)));
  				}

  				var base64 = '';
  				for(var i = 0 , len = base64_Index.length ; i < len ; ++i){
  					base64 += BASE64_MAPPING[base64_Index[i]];
  				}
  				
  				return base64;
  			},
  			
  	};

	ag_para = {
		getCookie : function(key) {
			var arr = document.cookie.match(new RegExp("(^| )" + key
					+ "=([^;]*)(;|$)"));
			if (arr != null)
				return unescape(arr[2]);
			return null;
		},
		from_input : function(para) {
			if (!window._agt) {
				return;
			}
			for (var i = 0; i < window._agt.length; i++) {
				if (window._agt[i][0]) {
					key = window._agt[i][0].substring(1);
					para[key] = "0";
				}
				if (window._agt[i].length > 1) {
					para[key] = window._agt[i][1];
				}
			}
			
			if (self.frameElement && "IFRAME" == self.frameElement.tagName) {
				var parentUrl = parent.location.href;
				if (parentUrl) {
					para['purl'] = parentUrl;
				}
			}
			para['agfid'] = ag_cookie.getAGFID();
		},
		from_comParams : function(para) {
			var n = navigator;
			para.atsp = n.platform;
			para.atsl = n.language ? n.language : n.browserLanguage;
			para.atsbr = document.body.clientWidth + 'x'
					+ document.body.clientHeight;
			para.atssr = window.screen.width + 'x' + window.screen.height;
			para.atsc = document.charset || document.characterSet;
			para.atsh = location.host;
		},
		from_atstd : function(para) {
			var url = "";
			try {
				url = window.top.location.search;
			} catch (e) {
				url = window.location.search;
			}
			try {
				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						if (strs[i].split("=")[0] == "ag_kwid")
							if (strs[i].split("=").length > 1) {
								para.atstd = strs[i].split("=")[1];
							}
					}
				}
			} catch (e) {
				var ss = "pass";
			}
		},
		from_referrer : function(para) {
			var referrer = '';
			try {
				referrer = window.top.document.referrer;
			} catch (e) {
				if (window.parent) {
					try {
						referrer = window.parent.document.referrer;
					} catch (e2) {
						referrer = document.referrer;
					}
				}
			}

			/* para.refer = referrer; */
			para.atsrf = referrer;
		},
		from_pv : function(para) {
			if ("tkpv" in para) {
				para.atspv = "1";
			}
		},
		from_2click : function(para) {
			if ("tkRedirect" in para) {
				var ag_count = this.getCookie(ag_cookie.rdCookieKey);
				if (ag_count == 2) {
					para.atsrd = "1";
				}
			}
		},
		from_domain : function(para) {
			if ('atsdomain' in para) {
				para.domain = para.atsdomain;
			} else {
				para.domain = window.location.host;
			}
		},
		from_2clickCookie : function(para) {
			if (para.atstd) {
				/* para.atsrf = para.refer; */
				var cookies = new Array([ ag_cookie.rdCookieKey, escape(1) ]);
				ag_cookie.setCookie(cookies, para.domain);
			} else {
				ag_count_tmp = ag_cookie.get_rdCookie();
				if (ag_count_tmp) {
					ag_count = ag_count_tmp;
					ag_count++;
					var cookies = new Array([ ag_cookie.rdCookieKey,
							escape(ag_count) ]);
					ag_cookie.setCookie(cookies, para.domain);
				}
			}
		},
		del_var : function(para) {
			var a = [ "tkpv", "tkRedirect", "domain", "refer", "atstime" ];
			for (var i = 0; i < a.length; i++) {
				delete para[a[i]];
			}
		}
	};

	var ag_cookie = {
		rdCookieKey : 'ag_count',
		AGFID_COOKIE_KEY : 'ag_fid',
		FIRST_COOKIE_SUFFIX : "F",

		get_rdCookie : function(ck) {
			var key = ck || this.rdCookieKey;
			var arr = document.cookie.match(new RegExp("(^| )" + key
					+ "=([^;]*)(;|$)"));
			if (arr != null)
				return unescape(arr[2]);
			return null;
		},
		setCookie : function(cookies, host,ttl) {
			var domain = "";
			var main_host_reg=/[-0-9a-z]+\.((com\.cn|net\.cn|org\.cn|gov\.cn)|[a-z]{2,5})($|\/)/gi;
			try{
				domain=host || window.top.location.hostname;
			}catch(err){
				domain=window.location.hostname;
			}
			domain=domain.match(main_host_reg);
			var path = '/';
			var exp = 10 * 365 * 24 * 60 * 60 * 1000;
			if(ttl){exp=ttl}
			var expires = new Date();
			expires.setTime(expires.getTime() + exp);
			var cookiestr = '';
			for (var i = 0; i < cookies.length; i++) {
				cookiestr = cookiestr + cookies[i][0] + '=' + cookies[i][1]
						+ ';';
			}
			document.cookie = cookiestr + 'expires=' + expires.toGMTString()
					+ ";path=" + path + ";" + "domain=" + domain;
		},
		randomString : function(len) {
			len = len || 32;
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var maxPos = chars.length;
			var pwd = '';
			for (i = 0; i < len; i++) {
				pwd += chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return pwd;
		},
		getAGFID : function() {
			var agfid = this.get_rdCookie(this.AGFID_COOKIE_KEY);
			if (agfid == null || agfid.length == 0) {
				agfid = this.randomString(15) + this.FIRST_COOKIE_SUFFIX;
			}
			var cookies = new Array([ this.AGFID_COOKIE_KEY, escape(agfid) ]);
			this.setCookie(cookies);
			return agfid;
		}
	};

	var ag_sender = {
		pvUrl : 't4.agrantsem.com/pv?',
		eventUrl : 't.agrantsem.com/tker.gif?',
		query : '',
		init : function(para) {
			ag_para.del_var(para);
			para.atstime = new Date().getTime();
			this.query = "";
			for ( var p in para) {
				this.query = this.query + '&' + p;
				if (para[p]) {
					this.query = this.query + "=" + encodeURIComponent(para[p]);
				}
			}
		},
		build_img : function(url) {
			var img = document.createElement('IMG');
			if (ag_sender.query.indexOf('&') == 0) {
				ag_sender.query = ag_sender.query.substring(1);
			}
			img.src = (document.location.protocol == 'https:' ? 'https://'
					: 'http://')
					+ url + ag_sender.query;
			img.style.display = 'none';
			img.style.width = '0px';
			img.style.height = '0px';
			document.body.appendChild(img);
		},
		img_query : function(para, fn, url) {
			this.init(para);
			if (document.onreadystatechange && document.readyState) {
				if (document.readyState == 'complete'
						|| document.readyState == 'loaded') {
					fn(url);
				} else {
					document.onreadystatechange = function() {
						if (document.readyState == 'complete'
								|| document.readyState == 'loaded') {
							fn(url);
						}
					};
				}
			} else {
				fn(url);
			}
		},
		send : function(para) {
			if ('atspv' in para) {
				this.img_query(para, this.build_img, this.pvUrl);
			}
			if ('atsrd' in para || 'atstd' in para || 'atsev' in para) {
				this.img_query(para, this.build_img, this.eventUrl);
			}
		}
	};
	var CookieMapping = function(ag_main_domain) {
		
        this.cm_param = [ // 百度的做两次CM
            'cm.g.doubleclick.net/pixel?google_nid=agrantcn&google_cm'+"&ext_data="+__BASE64.encoder('{"src":"pv","agfid":"'+ag_cookie.getAGFID()+'"}'),
            'cms.tanx.com/t.gif?tanx_nid=42756270&tanx_cm'+"&ext_data="+__BASE64.encoder('{"src":"pv","agfid":"'+ag_cookie.getAGFID()+'"}'),
            'cm.pos.baidu.com/pixel?dspid=6666724'+"&ext_data="+__BASE64.encoder('{"src":"pv","agfid":"'+ag_cookie.getAGFID()+'","t":"1"}'),
            'cm.pos.baidu.com/pixel?dspid=6666724'+"&ext_data="+__BASE64.encoder('{"src":"pv","agfid":"'+ag_cookie.getAGFID()+'","t":"2"}'),
            'cm.e.qq.com/cm.fcg?gdt_dspid=629594'+"&src=pv&agfid="+ag_cookie.getAGFID()
            ];
    
		this.ck = "__ag_cm_";
		this.img_query = function(fn, url) {
			if (document.onreadystatechange && document.readyState) {
				if (document.readyState == 'complete'
						|| document.readyState == 'loaded') {
					fn(url);
				} else {
					document.onreadystatechange = function() {
						if (document.readyState == 'complete'
								|| document.readyState == 'loaded') {
							fn(url);
						}
					};
				}
			} else {
				fn(url);
			}
		};
		this.build_img = function(url) {
			var img = document.createElement('IMG');
			img.src = (document.location.protocol == 'https:' ? 'https://'
					: 'http://')
					+ url;
			img.style.display = 'none';
			img.style.width = '0px';
			img.style.height = '0px';
			document.body.appendChild(img);
		};

		this.genCookieValue = function() {
			
			var cookieValue = ag_cookie.get_rdCookie(this.ck);
			if(cookieValue){return cookieValue;}else{return "0"}			
		};
		this.send = function() {
			var cv = this.genCookieValue();
			var host = "";
			try{
				host=ag_main_domain || window.top.location.host
						|| window.top.location.hostname;
			}catch(err){
				host=window.location.hostname;
			}
			host = host
					.match(/[-a-z0-9]+\.(com|cn|com\.cn|me|org|cc|info|net|net\.cn)(?=$)/gi);
			if (host && host.length > 0) {
				host = host[0];
			}
			
			if (cv != "1") 
			{
				var newcv = "1";
				ag_cookie.setCookie([ [ this.ck, newcv ] ], host,24*60*60*1000);
				var that = this;
				var docm = function(){
					for ( var i in that.cm_param) {
						that.img_query(that.build_img, that.cm_param[i]);
					}
				}
				setTimeout(docm,200);
			}
		};
	};
	var ag_main = {
		track : function() {
			var para = {};
			ag_para.from_input(para);
			ag_para.from_comParams(para);
			ag_para.from_atstd(para);
			ag_para.from_referrer(para);
			ag_para.from_pv(para);
			ag_para.from_domain(para);
			ag_para.from_2clickCookie(para);
			ag_para.from_2click(para);
			para.atspv = 1;
			var cm = new CookieMapping();
			cm.send();
			ag_sender.send(para);
			
		}
	};
	ag_main.track();
})();
