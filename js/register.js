// JavaScript Document
var regs = {
	userNameReg:/^([a-zA-Z])(([\u4e00-\u9fa5])|([a-zA-Z0-9_-]))+$/,
	numReg:/\d/, //数字
	strReg:/\w/, //字母符
	emailReg:/^\w+@\w+(\.\w+)+$/,
	mobileReg:/(^1[34578][0-9]{1})([0-9]{5})([0-9]{3})/	
};
var isReg = null;
$(function(){
	//用户名验证
	var userName = $("#userName");
	userName.on({
		//后面使用方便一点
		focus:function(e){
			checkuserName(e) ; 
		},
		blur:function(e){
			checkuserName(e)
		},
	})
	var _flag=0;
	function checkuserName(le){
		var v=userName.val();  //判断输没输入
		var span = userName.parent().next(".tip").find("span"); //当前对应的提示框
		var type;
		if(le){
			 type = le.type; //事件类型
		}
		//为获取焦点事件添加提示信息
		if(type=="focus"){
			span.removeClass("error");  //让错误提示去掉~
			userName.parent().addClass("focus")  //让边框变颜色
			span.text("只能包含英文和数字并以英文开头，4-16位").css({padding:"0 10px",border:"1px solid #ffce9b"});  //提示信息
			return false;
		}else{
			//失去焦点事件
			userName.parent().removeClass("focus");//输入框样式
			if(v.length==0){
				span.addClass("error");  //添加错误提示
				span.text("请输入用户名，英文或数字且必须以英文开头，4-16位").css({padding:"0 10px",border:"1px solid #ffce9b"})
				//span.text("").css({padding:"0",border:"0"}); //提示信息成空
				return false;
			}else{
				if(v.length<4||v.length>12){
					span.addClass("error"); //不是4-16位提示"只能包含英文和数字并以英文开头，4-16位“
					return false;	
				}else {  
					//如果长度不为0并且是4--16位的话，那么匹配符不符合正则表达式
					if(regs.userNameReg.test(v)){
						span.text("").css({padding:"0",border:"0"}); //提示信息成空
						//alert("用户名对");
						_flag+=1;
						return true;
					}else{
						span.addClass("error");
						return false;
					}
				}
			}						
		}		
	}
	
	//手机验证
	var mobile = $("#mobile");
	mobile.on({
		focus:function(e){checkMobile(e)},
		blur:function(e){checkMobile(e)}
		});
	function checkMobile(le){
		var mobile = $("#mobile")
		var v=mobile.val();
		var mobile_span = mobile.parent().next(".tip").find("span");
		var type;
		if(le){
			 type = le.type; //事件类型
		}
		if(type=="focus"){
			mobile_span.removeClass("error");
			mobile.parent().addClass("focus");
			mobile_span.text("请输入手机号码").css({padding:"0 10px",border:"1px solid #ffce9b"});
			return false;
		}
		if(type=="blur"){
			mobile.parent().removeClass("focus");
			if(v.length==0){
				//mobile_span.text("").css({padding:"0",border:"0"});
				mobile_span .addClass("error");  //添加错误提示
				mobile_span.text("请输入正确的手机号码").css({padding:"0 10px",border:"1px solid #ffce9b"})
				return false;
			}else{
				if(regs.mobileReg.test(v)){
					mobile_span.empty().css({padding:"0",border:"0"})
					//alert("shoujidui");

					isReg = $.ajax({
						type:"post",
						async:false,
						dataType:"json",
						url:"http://10000phone.applinzi.com/HQNews/user/checkRegister.php ",
						data:{username:mobile.val()},
						success:function (res) {
							if (res.code == 200){
								alert("可以注册！");

							} else {
								alert("用户已存在！");

							}
						},
						error: function () {
							alert("请检查网络！");

						}
					});
					//console.log(isReg.status);
					if(isReg.status == 200) {
						_flag+=1;
						return true;
					} else {
						return false;
					}

					
				}else{
					mobile_span.text("请输入正确的手机号码").css({padding:"0 10px",border:"1px solid #ffce9b"});
					mobile_span.addClass("error");
					return false;
				}
			}
		}
		
	}
			
	//邮箱验证
	var email = $("#email")
	email.on({
		focus:function(e){checkEmail(e)},
		blur:function(e){checkEmail(e)}
		})
	function checkEmail(le){
		var v=email.val();
	    var email_span = email.parent().next(".tip").find("span");
		var type;
		if(le){
			 type = le.type; //事件类型
		}
		if(type=="focus"){
			email_span.removeClass("error")
			email.parent().addClass("focus")
			email_span.text("请输入邮箱，邮箱作为登录和找回密码的凭证").css({padding:"0 10px",border:"1px solid #ffce9b"})	
			return false;
		}
		if(type=="blur"){
			email.parent().removeClass("focus");
			if(v.length==0){
				//email_span.text("").css({padding:"0",border:"0"});
				email_span.addClass("error");  //添加错误提示
				email_span.text("请输入邮箱，邮箱作为登录和找回密码的凭证").css({padding:"0 10px",border:"1px solid #ffce9b"})
				return false;
			}else{
				if(regs.emailReg.test(v)){
					email_span.text("").css({padding:"0",border:"0"});
					//alert("youxiang");
					_flag+=1;
					return true;
					
				}else{
					email_span.text("请输入正确的邮箱号码").css({padding:"0 10px",border:"1px solid #ffce9b"});
					email_span.addClass("error");
					return false;
				}
			}
		}
	}
	//设置密码
	var pwd = $("#pwd")
	pwd.on({
		focus:function(e){checkpwd(e)},
		blur:function(e){checkpwd(e)},
		keyup:function(e){checkpwd(e)}
		})
	$(".case1").addClass("active");
	function checkpwd(le){
		var v=pwd.val();
	    var pwd_span = pwd.parent().next(".tip").find("span");
		var type;
		if(le){
			 type = le.type; //事件类型
		}		
		if(type=="focus"){
			pwd_span.removeClass("error");
			pwd.parent().addClass("focus");
			pwd_span.text("6-20位字符，建议英文、数字、符号的组合").css({padding:"0 10px",border:"1px solid #ffce9b"})	
		}
		if(type=="blur"){
			pwd.parent().removeClass("focus");
			if(v.length==0){
				pwd_span.addClass("error");  //添加错误提示
				//pwd_span.text("").css({padding:"0",border:"0"});
				pwd_span.text("6-20位字符，建议英文、数字、符号的组合").css({padding:"0 10px",border:"1px solid #ffce9b"})
				return false;
			}else{
				if(v.length<6||v.length>20){
					pwd_span.text("密码长度错误").css({padding:"0 10px",border:"1px solid #ffce9b"});
					pwd_span.addClass("error");
					return false;
				}else{
					pwd_span.text("").css({padding:"0",border:"0"});
					//alert("mima");
					_flag+=1;
					return true;
					
				}
			}
		}	
	}
//确认密码
	var pwd2 = $("#pwd2")
	pwd2.on({
		focus:function(e){checkpwd2(e)},
		blur:function(e){checkpwd2(e)}
	})
	function checkpwd2(_e){
		var v2=pwd2.val();
		var v = $("#pwd").val();
	    var pwd2_span = pwd2.parent().next(".tip").find("span");
		var type;
		if(_e){
			 type = _e.type; //事件类型
		}
		if(type=="focus"){
			pwd2_span.removeClass("error")
			pwd2.parent().addClass("focus")
			pwd2_span.text("请再次输入密码").css({padding:"0 10px",border:"1px solid #ffce9b"})	
			return false;
		}
		if(type=="blur"){
			pwd2.parent().removeClass("focus");
			var v = $("#pwd").val();
		    //pwd2.parent().removeClass("focus")
			if(v2.length==0){
				pwd2_span.addClass("error");  //添加错误提示
				//pwd2_span.text("").css({padding:"0",border:"0"})
				pwd2_span.text("请再次输入密码").css({padding:"0 10px",border:"1px solid #ffce9b"})	
				return false;
			}else{
				if(v==v2){
					pwd2.parent().removeClass("focus")
					pwd2_span.text("").css({padding:"0",border:"0"})
					//alert("5");
					_flag+=1;
					return true;
					
				}else{
					pwd2.parent().removeClass("focus")
					pwd2_span.text("密码不一致").css({padding:"0 10px",border:"1px solid #ffce9b"})
					pwd2_span.addClass("error");
					return false;
				}
			}
		}
	}	
//点击注册按钮				
	$("#btn").click(function(){
		//alert("点击事件");
		var ck = $("#ck");
		var ck_span = ck.parent().next(".tip").find("span");	
		if(ck.get(0).checked){
			ck_span.text("").css({padding:"0",border:"0"});
			//alert("hei");
			//if(checkuserName(e)&&checkMobile(e)&&checkEmail(e)&&checkpwd(e)&&checkpwd2(e)){
				if(_flag>=5){
					//将用户信息保存为一个对象
					/*console.log(checkuserName());
					console.log(checkMobile());
					console.log(checkEmail());
					console.log(checkpwd());
					console.log(checkpwd2());*/
					/*alert("heill");//成功*/
					var user = {
						"username": $("#mobile").val(),
						/*"mobile":$("#mobile").val(),
						"email":$("#email").val,*/
						"password" : $("#pwd").val()
					};
					//console.log(user);
					//获取所有用户数据
					//使用 浏览器提供的 JSON.parse 方法 将字符串转为对象
					var userlist = JSON.parse(getCookie("user") ||"[]");//??
					console.log(userlist)
					 /*var status = true; // 假设 cookie 中没有注册过这个用户名
					//循环遍历 cookie 中的数据
					for(var i=0; i<userlist.length;i++){
						var item = userlist[i]; //一个用户名信息
						//判断 cookie 中单个用户的用户名 与 注册的用户名是否相同
						if(item.name == user.name){
							status = false;
							break;
						}
					}
					//如果为 false 就表示用户名已经存在了
					if(status == false){
						alert("亲，用户名已经存在,换个名字吧！");
						window.location.reload();
					}
					else{
						alert("注册成功");
						//将新注册的用户数据添加到 对象中
						userlist.push(user);
						//将所有用户数据转换为字符串，存入cookie
						setCookie("user",JSON.stringify(userlist),1000*60*60*24*7);
						//console.log('user : ',userlist);
						//console.log("新注册的 ： ",user);
						window.location.href="login.html?name="+user["name"];//方便记住后面登陆的时候等个不一样的~
					}
				}else{
					ck_span.text("请勾选协议").css({padding:"0 10px",border:"1px solid #ffce9b"})
					ck_span.addClass("error");*/
					$.ajax({
						type:"post",
						dataType:"json",
						url:"http://10000phone.applinzi.com/HQNews/user/userregister.php",
						data:{
							"username": $("#mobile").val(),

							"password" : $("#pwd").val()
						},
						success:function (res) {
							if (res.code == 200) {
								alert("注册成功！");
								//将新注册的用户数据添加到 对象中
								userlist.push(user);
								//将所有用户数据转换为字符串，存入cookie
								setCookie("user",JSON.stringify(userlist),1000*60*60*24*7);
								//console.log('user : ',userlist);
								//console.log("新注册的 ： ",user);
								window.location.href="login.html?name="+user["username"];//方便记住后面登陆的时候等个不一样的~
							} else {
								alert("注册失败！");
								window.location.reload();
							}
						},
						error:function () {
							alert("请检查网络！");
						}
					});
			}
		} else{
			ck_span.text("请勾选协议").css({padding:"0 10px",border:"1px solid #ffce9b"});
			ck_span.addClass("error");
		}
	//注册成功后将信息存储在本地	
})
})