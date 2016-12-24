 
/*var str="14345679899";
var reg = /(^1[34578][0-9]{1})([0-9]{5})([0-9]{3})/;				
str = str.replace(reg,"$1*****$3");
console.log(str);*/


/*banner轮播图*/
function bannerL(){
	var bgColor = ["#feee29", "#ffba45", "#cdecdc", "#e0ede4", "#71dcff", "#023e86","#fe6635", "#e67668"];
	var num01 = 0;
	var timer = null;
	$(".banLeft ul li").eq(0).addClass("imgOn");
	$(".banLeft_index span").eq(0).addClass("active");
	
	changeTo();
	
	
	timer=setInterval(function(){
		imgMove();
	},3000);
	$(".banLeft ul li").mouseover(function(){
		clearInterval(timer);
	});
	$(".banLeft ul li").mouseout(function(){
		timer=setInterval(function(){
			imgMove();
		},3000);
	});
	//点击span显示对应下标图片
	$(".banLeft_index").find("span").hover(function(){
		clearInterval(timer);
		$(this).addClass("active");
		var items = $(".banLeft_index").find("span").index($(this));
		//var items = $(this).index();
		num01 = items;
		$(".sd").find("a").css({"backgroundColor":bgColor[num01],'color':'#fff'});
		changeTo();
	},function(){
		timer=setInterval(function(){
			imgMove();
		},3000);
	})
	//运动
	function imgMove(){
		num01++;
		if(num01 > $(".banLeft ul li").length-1){
			num01 = 0;
		}
		$(".sd").find("a").css({"backgroundColor":bgColor[num01],'color':'#fff'});
		changeTo();
	}
	function changeTo(){
		$(".banLeft ul li").removeClass("imgOn").hide().eq(num01).fadeIn().animate({"width":770,"height":360},600).addClass("imgOn");
		$(".banLeft_index span").removeClass("active").eq(num01).addClass("active");
		//背景颜色变化
		$(".bannerBox").css("backgroundColor", bgColor[num01]);

		//上面滑过变色
		$(".ps").mouseenter(function(){
			$(this).addClass("sd").siblings('.ps').removeClass("sd");//sd a:color:#FFf
			$(this).siblings('.ps').find("a").css({background:'#fff','color':'#444'});
			$(this).find("a").css({"backgroundColor":bgColor[num01],'color':'#fff'});
			//console.log($(this).index());
			$(".show").hide().eq($(this).index()).show();
		});
		/*$(".ps").mouseleave(function(){
			$(this).addClass("active").siblings('.ps').removeClass("active");
			//$(this).find("a").css("backgroundColor","#fff");
		})*/
		
	}
}
	
/*bannner右边图片左移效果*/
function bannerR(){
	$(".bannerR").find("a").hover(function(){
		$(this).stop().animate({marginLeft:-10},500)
	},function(){
		$(this).stop().animate({marginLeft:0})
	})

}	

/*slider上下折叠**/
function SliderL(){
		function sliderL(){
			_timer1=setInterval(function(){
				if($(".li1").height()  == 199){     //高度减少的话就让它top值变大；
					$(".li1").animate({height:0, top:100}, 100);
					setTimeout(function(){   //200秒之后执行~
						$(".li2").animate({height:199, top:0}, 100);
					},200)
				}else if($(".li1").height()  == 0){
						$(".li2").animate({height:0, top:100}, 100);
					setTimeout(function(){
						$(".li1").animate({height:199, top:0}, 100);
					},200)	
				}
			},2500)	
		}
		sliderL();
		$(".sliderL li").mouseover(function(){
			clearInterval(_timer1);
		})
		$(".sliderL li").mouseout(function(){
			sliderL();
		})			
	}

	
/*slider上下轮播*/
function sliderR(){
		var numdes = 0; 
		timerdes = setInterval(function(){
			if(numdes < $(".view_rtul").children("li").length-1){
				numdes++;
			}else{
				numdes = 0;
			}
			var viewdes = $(".view_rtul li");
			var viewdes1 = $(".view_rtul li").index($(viewdes));
			var viewdesHeight = $(".view_rtul li").height();
			$(".view_rtul").animate({top:-numdes*viewdesHeight})
		},2000)
		$(".view_rtul").mouseover(function(){
			clearInterval(timerdes);
		})
		$(".view_rtul").mouseout(function(){
			timerdes = setInterval(function(){
				if(numdes < $(".view_rtul").children("li").length-1){
					numdes++;
				}else{
					numdes = 0;
				}
				var viewdes = $(".view_rtul li");
				var viewdes1 = $(".view_rtul li").index($(viewdes));
				var viewdesHeight = $(".view_rtul li").height();
				$(".view_rtul").animate({top:-numdes*viewdesHeight})
			},2000)
		})
	}

/*天天惊喜选项卡*/
function tab(){
	$(".day_sole").find("ul").eq(0).addClass("active");
	$(".time_pc").hover(function(){
		$(".day_sole").find("ul").hide().eq( $(".time_pc").index($(this))).show();
	})
	//图片放大
	$(".day_sl img").hover(function(){
		$(this).stop().animate({width:210, height:210});	
	},function(){
		$(this).stop().animate({width:200, height:200});
	})
	
	//抢购图标左移
	$(".day_slb a").hover(function(){
		$(this).stop().animate({right:-28});	
	},function(){
		$(this).stop().animate({right:-34});
	})
	
	/*小轮播*/
	$(".day_surimg").find("a").eq(0).show();
	$(".day_surimg .surimg_sp").find("span").eq(0).addClass("active");
	var _timer1=0,num02=0;
	
	_timer1=setInterval(function(){
		exec();  //自动播放
	},2000);
		
	//点击下面圆点事件
	$(".surimg_sp").find("span").click(function(){
		clearInterval(_timer1);  //停止计时器重新获取num2值
		var items = $(".surimg_sp").find("span").index($(this));  //获取当前的下标
		num02 = items; //num2重新赋值
		changeI();
	})
	//鼠标放上停止自动播放
	$(".day_surimg").find("a").mouseover(function(){
		clearInterval(_timer1);
	})
	$(".day_surimg").find("a").mouseout(function(){
		timer02=setInterval(function(){
			exec();
		},2000);
	})
	
	function exec(){
		num02++;
		if(num02 >$(".day_surimg").find("a").length-1){
			num02 = 0;
		}
		changeI();
	}
	function changeI(){
		$(".day_surimg").find("a").fadeOut().removeClass("active").eq(num02).fadeIn().addClass("active");//当前淡入z-index值加大，其他去除
		$(".surimg_sp").find("span").removeClass("active").eq(num02).addClass("active");//当前透明度变为1，其他去
	}
	
}


/*精品推荐*/
function tuijian(_data){
	var _li="";
	var _list=_data["product"]["children"];
	//console.log(_list);
	for(var i=0;i<_list.length;i++){
		//console.log(_list[1]);
		_li+="<li><div class=\"div1\"><a href=\"#\"><img src=\""+_list[i][0]+"\" alt=\"\" /></a></div><div class=\"div2\"><h3><a href=\"#\">"+_list[i][1]+"</a></h3><div><b></b><em>"+_list[i][2]+"</em><span>"+_list[i][3]+"</span></div><p>"+_list[i][4]+"</p></div></li>";
	}
	$(".product").html(_li);
	
	
	//小图片滑过放大
	$(".tuijian img").hover(function(){
		$(this).stop().animate({width:210, height:210,marginLeft:-5,marginTop:-5});	
	},function(){
		$(this).stop().animate({width:200, height:200,marginLeft:0,marginTop:0});
	})
	
}

/*分类推荐*/
function tuijian1(_data){
		var _di="";
		var _list=_data["tuijian"]["children"];
		//console.log(_list);
		for(var key in _list){  //遍历每个推荐
			//console.log(key);
			_di+="<div class=\"tuijian1\"><h2><img class=\"img1\" alt=\"\" src=\""+_list[key]["img"]+"\" /><em>"+_list[key]["em"]+"</em><span>";
			//console.log(_list[key]["span"].length);
			for(var i=0;i<_list[key]["span"].length;i++){
				_di+="<a href=\"#\"><img alt=\"\" src=\""+_list[key]["span"][i][0]+"\"/>"+_list[key]["span"][i][1]+"</a>"
			}
			_di+="</span></h2><div class=\"div1\"><div><a href=\"#\"><img src=\""+_list[key]["div1"]+"\"/></a></div></div><div class=\"div2\"><ul>";
			
			for(var m=0;m<_list[key]["ul1"].length;m++){
				_di+="<li><a href=\"#\"><img src='"+_list[key]["ul1"][m][0]+"'/></a><h3>"+_list[key]["ul1"][m][1]+"</h3><p>"+_list[key]["ul1"][m][2]+"</p></li>";
			}
			_di+="</ul><ul>";
			for(var n=0;n<_list[key]["ul2"].length;n++){
				_di+="<li><a href=\"#\"><img src='"+_list[key]["ul2"][n][0]+"'/></a><h3>"+_list[key]["ul2"][n][1]+"</h3><p>"+_list[key]["ul2"][n][2]+"</p></li>";
			}
			_di+="</ul></div></div>";
		
		}
		$(".tuijianAll").html(_di);		
		
		//小图片滑过放大
	$(".tuijian1 .div2 img").hover(function(){
		$(this).stop().animate({width:160, height:160,left:-10,top:-10});	
	},function(){
		$(this).stop().animate({width:150, height:150,left:0,top:0});
	})
		
	}
	



/*楼梯效果*/
$(window).scroll(function(){       //到达一定位置再让吸顶盒出现
	//console.log($(window).scrollTop());
	if($(document).scrollTop()>=$('.tuijianAll').offset().top){
		$("#stairs").show();
	}else{
		$('#stairs').hide();
	}
})
function stairs(){   //控制window的scrolltop
	var _this=null;
	$(".stairs_ul li").click(function(){
		var _index=$(this).index();
		_height=$(".tuijianAll .tuijian1").eq(_index).offset().top-$(".tuijian1 h2").eq(_index).outerHeight();
		$("body,html").animate({scrollTop:_height})	
	})
}

$(document).ready(function(){
	$.get("index.json",null,function(data,textStatus){
            if(textStatus=="success"){
               _data=JSON.parse(data);
   				//精品推荐
   				tuijian(_data);
   				tuijian1(_data);   				
            }
        },"text");
	bannerR();
	bannerL();
	SliderL()
	sliderR();
	tab();
	stairs();
})

	

