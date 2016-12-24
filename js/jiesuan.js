
$(document).ready(function(){
	$(".zeng").click(function(){
		$(".suoping").show().css("z-index","55");
		$(".jmotai").show().css("z-index","55");
	})
	
	
	$(".close").click(function(){   //关闭这个北京的
		$(".suoping").hide();
		$(".jmotai").hide();
	})
	$(".baocun").click(function(){  //关闭页面，出现结算页面
		$(".suoping").hide();
		$(".jmotai").hide();
		$(".jbody").hide();
		$(".jbody1").show().css("z-index","55");
	})
	
	var _zz=JSON.parse(getCookie("zongjia") || "[]");
	$(".ee").text(_zz);
	
	/*var _user=JSON.parse(getCookie("user")||"[]")*/
	var name=window.location.search.replace("?name=","");
	$(".hhide").hide();
	//console.log(_user);
	//console.log(_user[0]["name"]);
	$(".carbef").before("<span class=\"hihi\"><a href='#' style='color:red;'>"+/*_user[0]["name"]*/name+" </a></span> <a class=\"tuichu\" href=\"#\">退出</a>");
	$(".tiding").click(function(){
		alert("购买成功！等待发货吧！")
		
	})
	
})
