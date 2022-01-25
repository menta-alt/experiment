package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import modle.DAO;
import modle.JDBCUtil;
import modle.JsonResult;
import modle.User;

/**
 * 登录的 Servlet
 */

public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {				
		
		// 接收前台传来的值 账号和密码 或是 手机号和验证码
        String username = request.getParameter("username");        
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String code = request.getParameter("code");
                
        System.out.println(password);
        System.out.println(email);
        System.out.println(code);
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        // 账号密码登录的方式
        if(username != null && password != null) {
            //解决中文字符乱码
            byte[] bytes = username.getBytes("ISO-8859-1");
            username = new String(bytes,"utf-8");
            System.out.println(username);
            
        	JDBCUtil db = new JDBCUtil();
            // 创建一个用户保存下将密码和用户名保存
            User user = new User(username,password);
            DAO dao = new DAO();
            try {
                //数据库连接
                Connection conn = db.getConn();
                
                if(dao.login(conn, user) != null) {
                	request.getSession().setAttribute("user", user);
                	response.sendRedirect("jsp/success.jsp");
                } else {
                	out.println("<h1>用户名或者密码错误，验证失败</h1>");
                	out.println("<h2>3秒以后跳转回登录页面</h2>");
                	response.setHeader("Refresh", "3;url=jsp/login.jsp");
                }            
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
    			out.close();
    		}
        } else if(email != null && code != null) { //邮箱验证码方式
        	// 判断emailCode是否正确
        	String s_emailCode = (String)request.getSession().getAttribute("emailCode");
        	JsonResult jr = new JsonResult();
        	if(!code.equalsIgnoreCase(s_emailCode)) {
            	out.println("<h1>邮件验证码错误，验证失败</h1>");
            	out.println("<h2>3秒以后跳转回登录页面</h2>");
            	response.setHeader("Refresh", "3;url=jsp/login.jsp");
        	} else { // 验证成功
        		response.sendRedirect("jsp/success.jsp");
        	}
        	out.close();
        }
        
	}

}
