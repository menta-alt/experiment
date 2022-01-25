<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>LARP-LOGIN</title>
	<!-- 导入基础样式 -->
  	<link rel="stylesheet" href="../css/base.css">
  	<!-- 导入登录页面的样式 -->
  	<link rel="stylesheet" href="../css/login.css">
 	<!-- 导入轮播图的js -->
  	<script src="../js/focus.js"></script>
 	<!-- 导入animate.js -->
 	<script src="../js/animate.js"></script>
 	<!-- 导入时间的js -->
  	<script src="../js/time.js"></script>
  	<!-- 导入登录的js -->
  	<script src="../js/login.js"></script>
</head>

<body>
  <div class="container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <img src="../images/LARP.png" alt="">
      <div class="logo">
        <h6>Load Assessment And Risk Prediction</h6>
        <h6>运动员负荷评估和风险预测系统</h6>
      </div>
      <div class="vline"></div>
      <h2 class="brand">LARP数据可视化管理平台</h2>
      <div class="time">
        <h6 class="date"></h6>
        <h6 class="second"></h6>
      </div>
    </header>

    <!-- 主体内容 -->
    <main>
      <!-- 左侧轮播图 -->
      <div class="left">
        <div class="left_container">
          <div class="focus">
            <!-- 左侧按钮 -->
            <a href="javascript:;" class="arrow-l"></a>
            <!-- 右侧按钮 -->
            <a href="javascript:;" class="arrow-r"></a>
            <!-- 轮播图的图片 -->
            <ul>
              <li><img src="../images/1.jpg" alt=""></li>
              <li><img src="../images/2.png" alt=""></li>
              <li><img src="../images/3.png" alt=""></li>
            </ul>
            <!-- 小圆点 -->
            <ol class="circle">
            </ol>
          </div>
        </div>
      </div>

      <!-- 右侧登陆界面 -->
      <div class="right">
        <form action="/my_login/LoginServlet" method="post" class="login_container">
          <!-- 登录方式 -->
          <div class="login_method">
            <span><a href="javascript:;" class="account_a">账号登录</a></span>
            <span><a href="javascript:;" class="phone_a">邮箱登录</a> </span>
          </div>

          <!-- 分割线 -->
          <div class="hline"></div>

          <!-- 输入框 用来占位 -->
          <div class="input_box"></div>

          <!-- 修改密码 -->
          <a href="change_pwd.jsp" class="forget_pwd">修改密码</a>

          <!-- 登录按钮 -->
          <input type="submit" class="click_login" value="登录"/>

          <!-- 未注册 -->
          <a href="register.jsp" class="to_register">未注册，先去注册</a>
        </form>

        <!-- 其他登录方式 -->
        <div class="other_methods">
          <div class="ways">其他登录方式</div>
          <a href="javascript:;" class="icon qq"></a>
          <a href="javascript:;" class="icon wechat"></a>
        </div>

        <!-- 作者 -->
        <h3 class="author">-Directed By Elvira-</h3>
      </div>
    </main>
  </div>
</body>
</html>