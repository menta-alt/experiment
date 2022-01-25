package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import modle.DAO;
import modle.JDBCUtil;
import modle.User;

/**
 * 修改密码的 servlet
 */
public class HandlePwdServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 获取数据
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
            // 数据库中没有该用户
            if(dao.searchUser(conn, user) == null) {
	        	out.println("<h2>该用户不存在，请先去注册</h2>");
	        	out.println("<h2>3秒以后返回修改密码页面</h2>");
            	response.setHeader("Refresh", "3;url=jsp/change_pwd.jsp");
            } else {
				if(!password.equals(again_password)) {
					out.println("<h2>两次输入的密码不一致</h2>");
		        	out.println("<h2>3秒以后返回修改密码页面</h2>");
	            	response.setHeader("Refresh", "3;url=jsp/change_pwd.jsp");
				} else {
					String sql="update users set password=? where username=?";
			        // 获得执行sql语句的对象
			        PreparedStatement pstatement =conn.prepareStatement(sql);
			        pstatement.setString(1, user.getPassword());
			        pstatement.setString(2, user.getUsername());
			        // 返回受影响修改的行数
			        int res = pstatement.executeUpdate();
			        if(res != 0) {
			        	out.println("<h1>修改密码成功</h1>");
		            	out.println("<h2>3秒以后跳转回登录页面</h2>");
		            	response.setHeader("Refresh", "3;url=jsp/login.jsp");
			        } else {
			        	out.println("<h2>修改密码失败</h2>");
			        	out.println("<h2>3秒以后返回修改密码页面</h2>");
		            	response.setHeader("Refresh", "3;url=jsp/change_pwd.jsp");
					}
				}				
			}
        } catch (Exception e) {
        	e.printStackTrace();
		} finally {
			out.close();
		}
	}

}
