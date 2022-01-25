<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>修改密码</title>
	<!-- 导入基础样式 -->
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/change_pwd.css">
	<script src="../js/change_pwd.js"></script>
</head>
<body>
  <div class="container">
    <form action="/my_login/HandlePwdServlet" method="post" id="myform">
      <h2>修改密码</h2>
      <div class="item">登录名称：<input type="text" name="username" id="username" required></div>
      <div class="item">修改密码：<input type="password" name="password" id="password" required></div>
      <div class="item">确认密码：<input type="password" name="again_password" id="again_password" required></div>
      <div class="button">
        <input type="submit" value="确认" id="submit">
        <input type="reset" value="重置" id="reset">
      </div>
    </form>
  </div>
</body>
</html>