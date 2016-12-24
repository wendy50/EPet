

$(document).ready(function(){
	
	$("#logBtn").click(function(){
		//获取所有用户数据
		
		
		//console.log(JSON.parse(getCookie("userid")));
		//使用 浏览器提供的 JSON.parse 方法 将字符串转为对象
		var userlist = JSON.parse(getCookie("userid") ||"[]");
		if(!userlist) {
			$("#uname").val(userlist[0].username);
			$("#upasswd").val(userlist[0].password);
		};
		$.ajax({
			dataType:"json",
			type:"post",
			data:{"username":$("#uname").val(),"password":$("#upasswd").val()},
			url:"http://10000phone.applinzi.com/HQNews/user/userlogin.php",
			success:function (res) {
				if(res.code == 200) {
					userlist = {"username":$("#uname").val(),"password":$("upasswd").val()};
					setCookie("userid",JSON.stringify(userlist),1000*60*60*24*7);
					window.location.href="jiesuan.html?name="+$("#uname").val();
				} else {
					alert("用户名或密码不存在,请重新输入或注册");
				}
			},
			error:function () {
				alert("请检查网络！");
			}
		})
		/*//console.log(userlist);
		var status = true; // 先假设 cookie 中没有这个用户名
		//循环遍历 cookie 中的数据
		var sucess=null;
		for(var i=0; i<userlist.length;i++){
			var item = userlist[i]; //一个用户名信息
			//判断 cookie 中单个用户的用户名 与 登录的用户名是否相同
			//console.log(userlist);
			if(item.name == $("#uname").val()&& item.pwd == $("#upasswd").val()){
				sucess=1;
				//break;
			}
		}
		if(sucess==1){
			window.location.href="jiesuan.html?name="+$("#uname").val();
		}else{
			alert("用户名或密码不存在,请重新输入或注册");
		}*/
	})
	
})

