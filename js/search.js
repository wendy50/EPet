$.fn.look = function(obj) {
		$(this).keyup(function () {
        //发起一个jsonp请求
        $.ajax({
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            dataType: "jsonp",//使用script标签来实现请求而不是xhr
            data: {wd: $(this).val()},
            jsonp: "cb",//修改回调函数参数名  callback是默认的,但是 需要  cb
            success: function (res) {
                //res从服务器获取到数据
               // console.log(res);
                var arr = res.s;//获取搜索的结果
                var htmlstr = "";
                for(var i= 0,len=arr.length;i<len;i++) {
                    htmlstr += "<li>"+arr[i]+"</li>";
                }
                //显示到列表中
                $(obj.selector).html(htmlstr);
            }
        });
    });
    $(obj.selector).on("click","li", function () {
    //跳转到百度的搜索结果页面
    //https://www.baidu.com/s?wd=xxx
    console.dir(this);//指的是li
    window.location.href = "https://www.baidu.com/s?wd="+$(this).html();
	 });
}
