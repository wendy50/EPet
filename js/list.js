/*滑过菜单显示*/
function show(){
	$(".ps").mouseover(function(){
		$(this).find("a").css("backgroundColor","#6a4385");
		//console.log($(this).index());
		$(".show").hide().eq($(this).index()).show();
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
		
	
/*******全球热卖********/
function hotShow(_data){
	var _li="";
	for(var i=0;i<_data["hotsale"].length;i++){
		_li+="<li><a href=\"#\"><img src=\""+_data["hotsale"][i]+"\"></a></li>";
	}
	$(".hotShow").html(_li);
}
/*****今日疯抢*******/
function todayShow(_data){
	var _a="";
	for(var i=0;i<_data["today"].length;i++){
		_a+=
	"<li class=\"mt20 clearfix\">"+
		"<a href=\"#\">"+
			"<div class=\"bondedbg fl rela\">"+
				"<div class=\"guojia1 ftc\">"+
					"<img src=\""+_data["today"][i][0]+"\">"+
					"<div class=\"name\">"+
						"<p>"+_data["today"][i][1]+"</p>"+
						"<p>"+_data["today"][i][2]+"</p>"+
					"</div>"+
				"</div>"+
		"<div class=\"bonded ft16 bold ftc\">"+_data["today"][i][3]+"</div></div></a>"+
		"<div class=\"fl rela today-imgs overflow\"><a href=\"#\"></a>"+
			"<a href=\"detail.html?i="+i+"\">"+
			"<img src=\""+_data["today"][i][4]+"\">"+
			"</a>"+
		"</div>"+
		"<div class=\"fr today-intro\">"+	
            "<div class=\"time ftc\">"+
            	"<div class=\"time1 dib clearfix ft14\">"+
                "<span class=\"mr5\">"+_data["today"][i][5]+"</span>"+
                    "<span id=\"times0\">"+
						"<span class=\"hour\"></span><span style=\"font-size:12px;\">:</span><span class=\"minute\"></span><span style=\"font-size:12px;\">:</span><span class=\"second\"></span>"+
					"</span>"+
                   " <span id=\"t0\" style=\"display: none;\">"+_data["today"][i][6]+"</span>"+
            	"</div>"+
        	"</div>"+
            
	    	"<h1 class=\"ft20 fontover\">"+
	    		"<a href=\"http://www.epet.com/goods/118966-676-g.html\" target=\"_blank\" class=\"c000\">"+_data["today"][i][7]+"</a>"+
	    "</h1>"+
	    	"<p class=\"ft12 c999 mt overflow\">"+_data["today"][i][8]+"</p>"+
	    	"<div class=\"today-price clearfix\">"+
	    		"<div class=\"fl\">"+
	    			"<span><abbr class=\"ft24\">"+_data["today"][i][9]+"</abbr>"+_data["today"][i][10]+"</span>"+
	    			"<div class=\"jdt rela mt20 pointer\">"+
	                	"<em class=\"dib\" style=\"width:54%\"></em>"+
	                  "<b class=\"dib cred ft12 ftc\">"+_data["today"][i][11]+"</b>"+
	               	"</div>"+
	            "</div>"+
	            "<div class=\"fr sales-addcart ft18\">"+
	    			"<a href=\"detail.html?i="+i+"\" class=\"db cfff bold\">"+_data["today"][i][12]+"</a>"+
	    			"<p class=\"textR ft14 mt15\">"+
	    				"<em class=\"cf60\">"+_data["today"][i][13]+"</em>"+_data["today"][i][14]+""+
	    			"</p>"+
	    		"</div>"+
	    	"</div>"+
    	"</div>"+
   "</li>"
	}
	/*console.log(_a);*/
	$(".today-sales").html(_a);

}



/*今日疯抢倒计时*/
var _hour=0,_minute=0,_second=0;


function daoji(_data){
	setInterval(function(){	
		for(var i=0;i<_data["today"].length;i++){
			var _endtime=new Date(_data["today"][i][6]);	//结束日期
			var _curtime=new Date();	
			_alltime=Math.floor(_endtime-_curtime)/1000;//得到秒
			//console.log(_alltime);
			var _hour=Math.floor(_alltime/60/60);     //获取小时的值
            var _minute=Math.floor((_alltime-_hour*60*60)/60);    //获取分钟的值
            var _seconds=Math.floor(_alltime-_hour*60*60-_minute*60);//获取秒的值		
			$(".hour").eq(i).text(_hour);
			$(".minute").eq(i).text(_minute);
			$(".second").eq(i).text(_seconds);
			console.log(_hour+":"+_minute+":"+_seconds);
		}	
	},10)	
}



/*****精选好货*******/
function jingxuan(_data){
	var _di="";
	for(var i=0;i<_data["jingxuan"].length;i++ ){
		_di+=
        	"<li>"+ 
	    		"<div class=\"this-proimg rela ftc animation\">"+
	    			"<a href=\"#\">"+
	    				"<img src=\""+_data["jingxuan"][i][0]+"\">"+  				
	    				  "<!-- 包邮 -->"+
	    					"<div class=\"baoyou-ico\"></div>"+
	    				    			"</a>"+
	    		"</div>"+
	    		"<div class=\"this-protit mt\">"+
	    			"<a href=\"http://www.epet.com/goods/168484-257-g.html\">"+
	    				"<img src=\""+_data["jingxuan"][i][1]+"\">"+
	    				"<span class=\"dib fontover ft14\">"+_data["jingxuan"][i][2]+"</span>"+
	    			"</a>"+
	    		"</div>"+
	    		"<div class=\"bold ft14 mt ftc\">"+_data["jingxuan"][i][3]+"</div>"+
	    	"</li>"
	}	
	//console.log(_di);
	$(".jingxuanShow").html(_di);
	
	//滑过图片向上浮动效果  用c3效果做吧！这个方法行不通！
	/*$(".this-proimg").hover(function(){
		$(this).find("img").stop().animate({marginTop:-50})
	},function(){
		$(this).find("img").stop().animate({marginTop:0})
	})*/
}



$(function(){
	$.get("list.json",null,function(data,textStatus){
            if(textStatus=="success"){
                var _data=window.eval("("+data+")");
               	hotShow(_data);
               	todayShow(_data);
               	daoji(_data);
				jingxuan(_data);
            }

        },"text");
	show();		
});
