// JavaScript Document
$(function(){
	//倒计时函数
	// function runcount(t){
	// 	 if(t>0){
	// 		 document.getElementById('daojishi').innerHTML=t+'S后重新获取';
	// 		 t--;
	// 		 setTimeout(function(){
	// 		 runcount(t)
	// 	 },1000)
	// 	 $('#getyzm').hide()
	// 	 $('#daojishi').show();
	// 	 }else{
	// 	   $('#getyzm').show();
	// 	   $('#daojishi').hide();
	// 	 }
    //  }
    var timer;
     function runcount(t) {
        t--;
        if(t<=0){
            clearTimeout(timer);
            $('#getyzm').show();;
            $('#daojishi').hide();
        }
        document.getElementById('daojishi').innerHTML=t+'S后重新获取';
         timer = setTimeout(function() {
            runcount(t)
        }, 1000);
}

	 // 利用注册登录功能实现
	$('#dosubmit').click(function(){
		var info = {};
		info.name=$('#name').val()
        info.tel=$('#tel').val()
        // 非京籍,京籍
        info.huji=$('#huji').val()
        // 城区
        info.shiqu=$('.fs-label').text()
        // console.log(info.shiqu)
        info.yzm=$('#yzm').val()
        if(info.name == '') { 
			alert('请输入您的姓名');
			return false;
        }
		if(info.tel == '') { //验证手机号是否为空
			alert('请填写手机号');
			return false;
		}
		var reg = /^0?1[3465789]\d{9}$/; //手机号正则
		if(!reg.test(info.tel)) { //验证手机号是否正确
			alert('请填写正确的手机号!');
			return false;
		}
		$.ajax({
			url:"http://bj.offcn.com/index.php?m=formguide&c=forms&a=show&formid=334&action=jsonp&siteid=1&verify=true",
			data: {info},
			dataType:"jsonp",
			type:"GET",
			success:function(json){
				if(json.status == 1){
					// crm调用导入crm
					// $.get("http://dc.offcn.com:8100/a.gif", {sid:'1d3bb27780148b59719313818058701f', mobile:info.tel, name:info.name})
                    alert("提交成功");
                    clearTimeout(timer);
					$('#getyzm').show();
                    $('#daojishi').hide();
				}else if(json.status==-2){
					alert("验证码错误");
					$('#getyzm').show();
					$('#daojishi').hide();
				}
			}
		})
	});
	// 发送验证码
	$("#getyzm").click(function(event) {
		var phone = $("#tel").val();
			$.ajax({
			  url: 'http://bj.offcn.com/index.php?m=formguide&c=forms&a=send_sms&formid=334&siteid=1',
			  type: 'GET',
			  dataType: 'jsonp',
			  data: {phone: phone},
			  success: function(json) {
				if (json.status == 1) {
					// $('#daojishi').css('display','inline-block')
					// $('#getyzm').css('display','none')
					$('#daojishi').show()
					$('#getyzm').hide()
					runcount(60)
					alert('发送成功')
				}  else {
                    alert(json.msg);
				}
			}
		})
	})
})






