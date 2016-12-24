function createHttpRequest(){
	try{
		return new XMLHttpRequest();
	}catch(e){
		try{
			return new ActiveXObject("MSXML2.XMLHTTP.6.0");
		}catch(e){
			try{
				return new ActiveXObject("MSXML2.XMLHTTP.3.0");
			}catch(e){
				try{
					return new ActiveXObject("MSXML2.XMLHTTP");
				}catch(e){
					if(confirm("尊敬的用户您好，浏览器版本太低，请更新")){
						window.location.href="Firefox-full-latest.exe"
					}
				}
			}
		}
	}
}

function ajaxRequest(_method,_url,_async,_parameter,_fn){
	var _ajax=createHttpRequest();
	//console.log(_ajax);
	if(_ajax){
		_ajax.onreadystatechange=function(){
			if(_ajax.readyState==4){
				_fn(_ajax.responseText);		//abcJson(data);
			}
		}
		_ajax.open(_method,_url,_async);
		//所有的文本文件都可以正常请求到，二进制文件或多媒体文件是不可以请求的
		_ajax.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8");
		//发送数据时此设置必须注明
		_ajax.send(_parameter);//_parameter的格式严格遵循第37行设置的格式
		
	}
}

		

