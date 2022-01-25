package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import modle.DAO;
import modle.JDBCUtil;
import modle.User;

/**
 * 注册的servlet
 */
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// 获取注册名和密码
		String username = request.getParameter("username").trim();
        String password = request.getParameter("password").trim();
        String again_password = request.getParameter("again_password").trim();
        
        //解决中文字符乱码
        byte[] bytes = username.getBytes("ISO-8859-1");
        username = new String(bytes,"utf-8");
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        JDBCUtil db = new JDBCUtil();
        // 创建一个用户保存下将密码和用户名保存
        User user = new User(username,password);
        DAO dao = new DAO();
        
        try {
        	//数据库连接
            Connection conn = db.getConn();
            
            if(!password.equals(again_password)) {
            	out.println("<h2>两次输入的密码不一致</h2>");
	        	out.println("<h2>3秒以后返回注册页面</h2>");
            	response.setHeader("Refresh", "3;url=jsp/register.jsp");
            } else {
            	if(dao.register(conn, user)) {
            		out.println("<h1>注册新用户成功</h1>");
                	out.println("<h2>3秒以后跳转回注册页面</h2>");
                	response.setHeader("Refresh", "3;url=jsp/login.jsp");                
                } else {
                	out.println("<h1>注册新用户失败,用户名已经存在</h1>");
                	out.println("<h2>3秒以后跳转回注册页面</h2>");
                	response.setHeader("Refresh", "3;url=jsp/register.jsp");
                }
            }            
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			out.close();
		}
	}

}
