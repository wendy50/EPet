//鼠标滑过箭头上下改变


function myEpet(){
	$(".hoverShow").mouseover(function(){
		$(this).find(".zhuan").css({ "transition": "transform .2s ease-in","transform":" rotate(180deg)"});
		$(this).find("div").show();	
	})
	$(".hoverShow").mouseout(function(){
		$(this).find("div").hide();	
	})
	$(".hoverShow div").mouseover(function(){
		$(this).show();
	})
	$(".hoverShow div").mouseout(function(){
		/*$(this).find(".zhuan").css("class","icon-caret-down");*/
		$(this).hide();
	})	
}

/*设置菜单栏小图标位置及滑过效果以及选项卡*/  
function menu(){
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
		$(".swContainer").hide();
	})
	
}

/*侧边栏效果*/
function celan(){
	$(".barcon_top li").hover(function(){
		$(this).children("div").addClass("active");
		$(this).children("div").addClass("active").animate({right:"35", opacity:"1"});
	},function(){
		$(this).children("div").removeClass("active");
		$(this).children("div").removeClass("active").animate({right:"50", opacity:"0"});
	})
	
	$(".bar_backt").click(function(){
	$("body, html").stop().animate({scrollTop:0});
	
	})
}
	

$(document).ready(function(){
	/*$.get("index.json",null,function(data,textStatus){
            if(textStatus=="success"){
                var _data=window.eval("("+data+")");   
                
                
            }
    },"text");*/
	myEpet();
	menu();
	celan();
})