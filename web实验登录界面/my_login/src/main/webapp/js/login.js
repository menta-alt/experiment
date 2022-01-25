// 登录方式切换
window.addEventListener('load', function () {
  // 是否是账户登录
  var isAccount = true

  // html模板
  var user_template = `
    <div class="account_input">
      <div class="item">
        <i class="user-icon"></i>
        <input type="text" id="username" name="username" placeholder="请输入账号" autofocus="autofocus" required>
      </div>
      <div class="item">
        <i class="pwd-icon"></i>
        <input type="password" id="password" name="password" placeholder="请输入密码" required>
      </div>
    </div>
  `
  var phone_template = `
    <div class="phone_input">
      <div class="item_phone">
        <i class="phone-icon"></i>
        <input type="email" id="phone" name="email" placeholder="请输入邮箱" autofocus="autofocus" required>
      </div>
      <div class="item_check">
        <input type="text" id="check" name="code" placeholder="请输入验证码" required>
        <button class="getCode" type="button">获取验证码</button>
      </div>
    </div>
  `
  // 获取输入框的元素
  var input_box = document.querySelector('.input_box')

  // 挂载用户密码登录方式的html
  input_box.innerHTML = user_template

  var account_a = document.querySelector('.account_a')
  var phone_a = document.querySelector('.phone_a')
  var forget_pwd = document.querySelector('.forget_pwd')

  // 给账号登录的链接添加事件
  account_a.addEventListener('click', function () {
    // 将用户密码方法的html代码渲染，必须放在前面，不然获取不到元素
    input_box.innerHTML = user_template

    //获取输入框中的值
    var input_user = document.querySelector('#username')

    isAccount = true
    account_a.style.color = '#03a9f4'
    phone_a.style.color = '#666'
    forget_pwd.style.display = 'block'
    input_user.focus() // 解决切换页面后输入框的聚焦问题
  })

  // 给手机登录的链接添加事件
  phone_a.addEventListener('click', function () {
    // 将手机号验证码方法的html代码渲染，必须放在前面，不然获取不到元素
    input_box.innerHTML = phone_template

    //获取元素
    var phone_input = document.querySelector('.phone_input')
    //输入框中的值
    var input_phone = document.querySelector('#phone')

    isAccount = false
    account_a.style.color = '#666'
    phone_a.style.color = '#03a9f4'
    forget_pwd.style.display = 'none'
    phone_input.style.marginBottom = '8.1vh'
    input_phone.focus()
	
	// 创建XMLHttpRequest
    function CreateXmlHttp() {
      // 定义XMLHttpRequest对象
      var xhr = null
      // 创建XMLHttpRequest对象
      if (window.XMLHttpRequest) {
        // 其他浏览器
        xhr = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        // IE浏览器 IE5 IE6
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }

      return xhr
    }

	// 获取点击获取验证码的按钮
    var getCodeBtn = document.querySelector(".getCode");

	// 获取验证码点击按钮点击后禁用
	getCodeBtn.addEventListener("click", function() {
		// 点击按钮后，将按钮禁用10秒钟
	    getCodeBtn.disabled = true;
        var second = 10;
        var timer = setInterval(function () {
          getCodeBtn.innerText = second + "s 后可重新获取"
          if (second <= 0) {
            clearInterval(timer);
            getCodeBtn.innerText = "获取验证码"
            getCodeBtn.disabled = false;
          }
          second--;
        }, 1000);

		// 发送post请求
	    // 创建XMLHttpRequest
	    var xhr = CreateXmlHttp()
		var email = input_phone.value
		
		// 指定响应函数(回调函数)
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState == 4) {
	        // 请求已经完成，信息已经成功返回，开始处理信息
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	          // 将从服务器端返回是JSON格式数据转换成JavaScript对象
	          var res = xhr.responseText
			  var jsonObj = eval("("+res+")")
			  console.log("res:"+res)
			  if(jsonObj.type == 0) {
				alert(jsonObj.error);
			  } else {
	          	alert("邮箱发送成功，请查阅邮箱，尽快认证")   
			  }    
	        } else {
			  alert("邮箱发送失败")   
			}
	      }
	    }

	    xhr.open('POST','/my_login/EmailServlet',true)
	    // 设置HTTP的输出内容类型为json格式数据：application/x-www-form-urlencoded
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	    // 设置浏览器不使用缓存，服务器不从缓存中找，重新执行代码，而且服务器返回给浏览器的时候，告诉浏览器也不要保存缓存。
	    xhr.setRequestHeader('If-Modified-Since', '0')		    	
	    // 发送请求
	    xhr.send("email="+email);

		
	})
	
  })

})
