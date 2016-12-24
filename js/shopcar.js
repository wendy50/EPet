$(function(){
	
	
    /*我的订单收藏等滑过效果 **/
	   $(".glist").find("li").hover(function(){
	   		$(this).siblings(".gborder").animate({
	   			left:125*($(this).index())
	   		},100);
	   });
           
       
       //构建中间购物车菜单默认状态下从cookie下
        var _car=JSON.parse(getCookie("car") || "[]");   //数组对象		
		var nums=0,xiaoji=0;
		var last=0;
		var _str="";
		for(var i=0;i<_car.length;i++){
			last=_car[i].length-1;
			nums=_car[i][last]-0;
			xiaoji=_car[i][last]*_car[i][10];//单项产品的总价和数量
			
			//设置内容图片等
			_str+="<tr class=\"cart-order\">"+			
				"<td width=\"50\" align=\"center\">"+
					"<input type=\"checkbox\" class=\"onecheck\">"+
				"</td>"+
				"<td width=\"500\" valign=\"middle\">"+
					"<div class=\"div1\"><a href=\"#\"><img src=\""+_car[i][4]+"\"	width=\"80\"></a>"+
					"</div>"+
					"<div class=\"div2\" style=\"margin-top: 30px;\">"+
						"<a href=\"#\" class=\"c333\">"+_car[i][7]+
						"</a>"+
						"<div class=\"div21\">"+
							"<font class=\"c999\">	关税：￥0.00<span class=\"through\" style=\"padding-left: 5px;\">￥89.54</span><i>	</i></font>"+
						"</div>"+
					"</div>"+
					"<div class=\"clear\">"+
					"</div>"+
				"</td>"+
				"<td width=\"150\" align=\"center\" style=\"padding-top:20px;\">"+
				    "<div class=\"div3 clearfix\">"+
						"<span  class=\"ft18 fl less1\"> - </span>"+
						"<input type=\"text\" class=\"text\" value=\""+nums+"\" id=\"bnum\" size=\"2\">"+
						"<span  class=\"fl add1\"> + </span>"+
					"</div>"+
					"<p class=\"fcolor mtneg10\"> 仅剩2袋 </p>"+
				"</td>"+
				"<td width=\"200\" align=\"center\" class=\"c000 bold ft14\">"+
					"￥"+"<em class=\"xj\">"+xiaoji+"</em>"+
					"<p class=\"c89\">￥"+
						"<em class=\"danjia\">"+_car[i][10]+"</em>"+
					"/件</p>"+
				"</td>"+
				"<td width=\"200\" align=\"center\">"+
					"<a href=\"#\" class=\"c666 shoucang\">[收藏]</a>"+
					"<a class=\"c666 del\">[删除]</a>"+	
				"</td>"+
			"</tr>"				
		}
		$(".checkbox").html(_str);
		//console.log(_car);
	
	/***减的时候***/			
		$(".less1").click(function(){	  
		   //修改数量
		   var val = parseInt($(this).parent().find("input").eq(0).val()) ;//获取当前文本框里的值
		    if(val<=0){
		    	val=0;
		    }else{
		    	val--;
		    }
			$(this).parent().find("input").eq(0).val(val)//给文本框赋值
			
			//修改小计值
			var danjia=$(this).parent().parent().siblings().find(".danjia").text();//得到点击商品的单价
			//console.log(danjia);
			xiaoji=(val*danjia).toFixed(2);
			$(this).parent().parent().siblings().find(".xj").text(xiaoji);
	        
	       	// 将新数量保存到cookie中 	
	       	var index=$(this).parent().parent().parent().index(); //tr的下标
	       	//console.log(index);
	       	_car[index][last]=val;  //当前产品的数量改变
			zongjia();
			//console.log(_car);
			//setCookie("car",_car);//重新存cookie;		
			setCookie("car",getCookie("car") || "[]");
		})
		
	/***数值变化***/
		$(".text").change(function () {
			var val = parseInt($(this).parent().find("input").eq(0).val()) ;
			var danjia=$(this).parent().parent().siblings().find(".danjia").text();//得到点击商品的单价
			//console.log(danjia);
			xiaoji=(val*danjia).toFixed(2);
			$(this).parent().parent().siblings().find(".xj").text(xiaoji);
			// console.log($(this).parent().parent().siblings().find(".xj").text());
			// 将新数量保存到cookie中
			var index=$(this).parent().parent().parent().index(); //tr的下标
			//console.log(index);
			_car[index][last]=val;  //当前产品的数量改变
			zongjia();
			console.log(_car);

			setCookie("car",getCookie("car") || "[]");
		})

	/***加的时候***/			
		$(".add1").click(function(){	  
		   //修改数量
		   var val = parseInt($(this).parent().find("input").eq(0).val()) ;//获取当前文本框里的值
		    val++;
		    
			$(this).parent().find("input").eq(0).val(val)//给文本框赋值
			
			//修改小计值
			var danjia=$(this).parent().parent().siblings().find(".danjia").text();//得到点击商品的单价
			//console.log(danjia);
			xiaoji=(val*danjia).toFixed(2);
			$(this).parent().parent().siblings().find(".xj").text(xiaoji);
	       // console.log($(this).parent().parent().siblings().find(".xj").text());
	       	// 将新数量保存到cookie中 	
	       	var index=$(this).parent().parent().parent().index(); //tr的下标
	       	//console.log(index);
	       	_car[index][last]=val;  //当前产品的数量改变
			zongjia();
			//console.log(_car);
			
			setCookie("car",getCookie("car") || "[]");
		})	
	
	
	/*点击删除***/
		$(".del").click(function(){
			if(confirm("确定要删除此项产品？？")){
				var $tr = $(this).parents("tr");
				var index = $tr.index();
		       	_car.splice(index,1);  //删除cookie中的此项商品
				zongjia();
			   setCookie("car",JSON.stringify(_car));//重新存cookie;
			   $tr.remove();
			}
		});
		
		//重新getCookie;
		var _car=JSON.parse(getCookie("car") || "[]");   //数组对象	本来其实就是数组
		//console.log(_car);
		$(".car1").text(_car.length);//上面购物车的数量变一下
		
	
	/*******单选全选********/
	//不足是,不同的仓库应该让上下的全选按钮有个区别的,点击上面不一定全选,下面必须全选.而这里只是做了上下全选按钮一样的功能	
	
		$(".onecheck").click(function(){	
			var num=0;
			$(".onecheck").each(function(){
				if($(this)[0].checked==true){
					num++;
				}
			})
			//console.log($(".onecheck").length);
			//console.log(num);			
			if(num==$(".onecheck").length){
				$(".allcheckbox").each(function(){
					$(this)[0].checked=true;
				})
			}else{
				$(".allcheckbox").each(function(){
					$(this)[0].checked=false;
				})
			}
		});
		
	//单独选择时，下面总价总数量变化	
		$(".onecheck").click(function(){
			if($(this)[0].checked){
				zongjia();			
			}else{
				zongjia();
			}
			//console.log(num);
		})
		
	//点击全选时，事件
		//console.log($(".allcheckbox"))
		$(".allcheckbox").click(function(){
			if($(this)[0].checked){
        		$(".allcheckbox").each(function(){
        			$(this)[0].checked = true;
        			
        		})
        		$(".onecheck").each(function(){		
					$(this)[0].checked = true;
				})
        		zongjia();
        	}else{
        		$(".allcheckbox").each(function(){
        			$(this)[0].checked = false;
        			
        		})
        		$(".onecheck").each(function(){		
					$(this)[0].checked = false;
				})
        		zongjia();
        	}
		
		})
	
		     
		function zongjia(){
			var sum=0,heji=0;
			$(".onecheck").each(function(){			
				var checked=$(this)[0].checked;
				if(checked){
					sum+=($(this).parent().siblings().find(".text").val()-0);
					heji+=($(this).parent().siblings().find(".xj").text()-0);
				}
				$(".zjiaqian").html(heji);
				$(".jieshu").html(sum); 
				//console.log(heji);
			})
			$(".zjiaqian").html(heji);
			$(".jieshu").html(sum); //最终的价钱和数量
			//console.log($(".zjiaqian").html())
			//return $(".zjiaqian").html();
			
			
		}
			
		//去结算的时候登录页面，没账号就需要注册一下，注册完了在登录，完了直接去结算页面，去新增收货地址
		$(".glog").click(function(){
			if(confirm("亲，您还没登录，请先登录")){
				var zz=$(".zjiaqian").text();   				
				setCookie("zongjia",JSON.stringify(zz));
				window.location.href="login.html";				
			}
			
		})
		
		
		
		
		
})
