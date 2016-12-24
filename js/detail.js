

/*滑过菜单显示*/
function show(){
	$(".ps").mouseover(function(){
		$(this).find("a").css("backgroundColor","#6a4385");
		//console.log($(this).index());
		$(".show").hide().eq($(this).index()).show().css("z-index","55");
	});
	$(".ps").mouseout(function(){
		$(this).find("a").css("backgroundColor","#fff");
	})
	$('.big_shell').hover(function(){
		$(this).find(".show li").hover(function(){
			$(this).stop().animate({"padding-left":10},100);
			$(".swContainer").show();
			$(".swContainer").find(".menushow").hide();
			$(".swContainer").find(".menushow").eq($(this).index()).show();
		},function(){
			$(this).stop().animate({"padding-left":0},30);
		})
		$(this).find('.huodong').hover(function(){
			$(".swContainer").hide();},function(){
		})
	},function(){
		$(this).find(".show").hide();
		$(".swContainer").hide();
		
	})
}
//动态生成列表页图片及文字等，以及放大镜效果		
function fdj(_data){
	var smallImg=$("#smallImg");
    var bigImg=$("#bigImg");
    var smallCursor=$("#smallCursor");
    var bigCursor=$("#bigCursor");
        smallCursor.width(smallImg.outerWidth()*bigCursor.outerWidth()/bigImg.outerWidth());    //小图片框里的滑块宽度
        smallCursor.height(smallImg.outerHeight()*bigCursor.outerHeight()/bigImg.outerHeight());    //小图片框里的滑块高度
    var smallCursorWidth = Math.floor(smallCursor.width());
    var smallCursorHeight = smallCursor.height();
    var bigCursorWidth=bigCursor.outerWidth();
    var bigCursorHeight=bigCursor.outerHeight()
    var scale=bigCursorWidth/smallCursorWidth;
   
   var i=parseInt(window.location.search.replace("?i=",""));
   // console.log(_data["today"][i][4]);
    smallImg.css("backgroundImage","url("+_data["today"][i][4]+")");
    bigImg.attr("src",_data["today"][i][4]);
    $(".xiaotu").css("backgroundImage","url("+_data["today"][i][4]+")")
    $(".xqname").find("h1 em").html(_data["today"][i][7]);
    $(".xqname").find("p").html(_data["today"][i][8]);
    $("#goods-sale-price").html(_data["today"][i][10]);
    $(".ren").find("em").html("已购买人数"+_data["today"][i][13]);
    
    smallImg.mousemove(function(evt){
        smallCursor.css("display","block");
        bigCursor.css("display","block");
        var e=evt || window.event;
        disX=e.clientX-smallImg.offset().left-smallCursorWidth/2;
        disY=e.clientY-smallImg.offset().top-smallCursorHeight/2+$(window).scrollTop();
        if(disX<=0){disX=0};
                if(disX>=smallImg.outerWidth()-smallCursorWidth){disX=smallImg.outerWidth()-smallCursorWidth-1}
                if(disY<=0){disY=0};
                if(disY>=smallImg.outerHeight()-smallCursorHeight){disY=smallImg.offsetHeight-smallCursorHeight-1}
                //console.log(e.clientX+" "+e.clientY)
                smallCursor.css("left",disX);
                smallCursor.css("top",disY);
                bigImg.css("left",-disX*scale);
                bigImg.css("top",-disY*scale);
            })
            smallImg.mouseout(function(){
                smallCursor.css("display","none");
                bigCursor.css("display","none")
            })
}

//点击“加入购物车”,此时的地址栏信息中的key值保留下来
function shoplist(_data){	
	var i=parseInt(window.location.search.replace("?i=","")); //获取此时我要的数组下标	
	/*$(".addD").click(function(){
		 
		
	})*/
	//还没写加加减减
	
	
	var item=_data["today"][i] //得到我要的那一项的所有信息 ，
		//console.log(item);
		//区别是：我得到一个数组，老师得到的是一个对象
		var last=_data["today"][i].length-1;//最后一项存的数量；
		//console.log(last);
		var count=parseInt(_data["today"][i][last]);
		count=1;  
		var sum=0,heji=0;
		var _html="";
		var num=0;
	$("#shopbtn").on("click",function(){  
		var _list = JSON.parse(getCookie("car") || "[]");  //存一个购物车的数组对象，
		var name = _data["today"][i][7].replace(/\s/g,"");
		var status = true; //假设 cookie 中不存在这个商品
		//遍历一遍是否已存了现在买的
		for(var n=0;n<_list.length;n++){
			//判断我现在买的是和原来买的一样不一样，一样加数量，不一样跳出	
			//console.log(_list[n][7]);
			var name2 = _list[n][7].replace(/\s/g,"");
			if(name==name2){//判断他们的名字也就是_data["today"][i][7]是否一样		 		
				_list[n][last]=_list[n][last]-0 + 1;
				sum++;  //存在总和加一
				heji+=parseInt(_list[n][10]); //总价加一
				status =false; //表示cookie中存在;		
			}
		}
		
		if(status){
			_list.push(_data["today"][i]);
			 sum+=1;  //不r存在综合加一，总价加一
			heji+=_data["today"][i][10]*1;
		}	
	//点击事件时自动更新数量等	
		$(".jiage").eq(_list[i]).html(num);
		$(".cf60").html(sum);  //弹窗的购物车数量
		$(".car1").html(sum);  //顶部框的购物车的数量
		$(".car2").html(sum);  //搜索框旁边的购物车数量
		$(".heji").html(heji);  //弹窗的合计
		$("#cartgd_num").html(sum); //侧边栏购物车数量
		$(".celanheji").html("￥"+heji); //侧边栏购物车合计
			
	//将购物车数据转为字符串存入 cookie 中
		setCookie("car",JSON.stringify(_list));
		$(".fix_bg").addClass("active");
		$(".fix").addClass("active");
		$(".jixug").click(function(){
			$(".fix_bg").removeClass("active");
			$(".fix").removeClass("active");
			window.location.reload();
		})
		$(".close").click(function(){
			$(".fix").removeClass("active");
			$(".fix_bg").removeClass("active");
			window.location.reload();
		})	
		//return(num);
		
	});
	
	
	
	//console.log(num);
	//存在更新侧边栏的购物车信息
		$(".bar_car").hover(function(){
			$(".bar_cr").hide();
			$("#cartbox").show();	
		},function(){
			$("#cartbox").hide();
		})
		$("#cartbox").hover(function(){
			$(this).show();	
			
		},function(){
			$(this).hide();
		})
		
		
	//重新获取cookie并写页面，然后写各种数量 
	var _listCur=JSON.parse(getCookie("car") || "[]");
	//console.log(_listCur);//得到现存的cookie中的数组
	for(var m=0;m<_listCur.length;m++){
		_html+="<li>"+
			"<em class=\"fl\">"+
				"<a href=\"#\" target=\"_blank\">"+"<img width=\"60\" src=\""+_listCur[m][4]+"\">"+
				"</a>"+
			"</em>"+
			"<div class=\"fl\">"+
				"<p><a href=\"#\" target=\"_blank\" class=\"proming\">"+
						_listCur[m][7]+
				"</a></p>"+
				"<p><span class=\"cred  jiage\">"+
						"￥"+_listCur[m][10]+" × "+_listCur[m][last]+
				"</span></p>"+
				"<div>"+
					//"<a class=\"fr shan\" href=\"\">[删除]</a>"+
					"<span class=\"fr shan \" href=\"\">[删除]</span>"+
				"</div>"+
				"<div class=\"clear\" style=\"height: 10px;\">"+
				"</div>"+
			"</div>"+
			"<div class=\"clear\">"+
			"</div>"+
		"</li>"		
		sum+=parseInt(_listCur[m][last]); //保存所有的购买的总和
		heji+=_listCur[m][last]*_listCur[m][10];			
	}
	
		$(".cf60").html(sum);  //弹窗的购物车数量
		$(".car1").html(sum);  //顶部框的购物车的数量
		$(".car2").html(sum);  //搜索框旁边的购物车数量
		$(".cartVlist").html(_html);
		$("#cartgd_num").html(sum); //侧边栏购物车数量
		$(".celanheji").html("￥"+heji); //侧边栏购物车合计
	
	//侧边栏购物车的删除项
		var _lis=$(".shan");  //获取此时购物车中所有删除键  
		$(".shan").click(function(){
			if(confirm("确定要删除此项产品？？")){
				var index=$(".shan").index($(this));
				//console.log($(".shan").index($(this)));
				$(this).parent().parent().parent().remove();
				_listCur.splice(index,1);
				window.location.reload();
				setCookie("car",JSON.stringify(_listCur));
			//	console.log(_listCur);
				
			
			}
		})				

	
	
	
	
	//
	//现在的bug是提示框的图片需要刷新才能显示出来，因为是用cookie写的
	///
	//
	//
	//
	
	
	
}
//选项卡
function tab(_data1){
	//商品详情	
	var _img="";
	for(var n=0;n<_data1["qi"].length;n++){
		_img+="<img src=\""+_data1["qi"][n]["imgUrl"]+"\"/>"			
	}
	$(".qi01img").html(_img);
	
	//获取热卖商品信息
		var _dd=""; 
		for(var i=0;i<_data1["endor"].length; i++){
			_dd += '<dd><img src="'+_data1["endor"][i]["en"]+'"><i>'+_data1["endor"][i]["desc"]+'<p>￥'+_data1["endor"][i]["pri"]+'</p></i></dd>';
			
		}
		$(".dl01 dt").after(_dd);
		$(".dl02 dt").after(_dd);
		$(".qi01").find("a").eq(0).css({borderTop:"2px solid #ac92ec"});
		$(".qi01 ul li").find("div").eq(0).css("display","block");
		$(".qi01").find("a").click(function(){
			$(".qi01").find("a").css({borderTop:"2px solid #fff"});
			$(this).css({borderTop:"2px solid #ac92ec"});
			$(".qi01").find("a").siblings().css({display:"none"});
			$(this).siblings().css({display:"block"});
		})
	
}



$(function(){
	$.get("list.json",null,function(data,textStatus){
            if(textStatus=="success"){
                var _data=window.eval("("+data+")");
               	fdj(_data);
                shoplist(_data);
            }
        },"text");
    show();
    $.get("detail.json",null,function(data,textStatus){
            if(textStatus=="success"){
                var _data1=window.eval("("+data+")");
               	tab(_data1);
               
            }
        },"text");

})
