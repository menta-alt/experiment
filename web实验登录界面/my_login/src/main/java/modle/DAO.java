package modle;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * 
 * @author 小萌
 * DAO 类为增加数据库查询用户的功能
 * 
 *
 */

public class DAO {
	// 登录验证
	public User login(Connection conn,User user) throws Exception{
        User resultUser = null;
        // sql 查询语句
        String sql="select * from users where username=? and password=?";
        // 获得执行sql语句的对象
        PreparedStatement pstatement =conn.prepareStatement(sql);
        pstatement.setString(1, user.getUsername());
        pstatement.setString(2, user.getPassword());
        // 执行sql语句获得结果集
        ResultSet rs = pstatement.executeQuery();
        if(rs.next()){ 
            resultUser = new User();
            resultUser.setUsersname(rs.getString("username"));
            resultUser.setPassword(rs.getString("password"));
        }
        
        return resultUser;
    }
	
	// 修改密码查找用户
	public User searchUser(Connection conn,User user) throws Exception {
		User resultUser = null;
        // sql 查询语句
        String sql="select * from users where username=?";
        // 获得执行sql语句的对象
        PreparedStatement pstatement =conn.prepareStatement(sql);
        pstatement.setString(1, user.getUsername());
        // 执行sql语句获得结果集
        ResultSet rs = pstatement.executeQuery();
        if(rs.next()){ 
            resultUser = new User();
            resultUser.setUsersname(rs.getString("username"));
        }
        
        return resultUser;
	}
	
	// 注册验证
	public boolean register(Connection conn,User user) throws Exception {
		boolean flag = false;
        // sql 查询语句
        String sql="insert into users(username,password)values(?,?)";
        // 获得执行sql语句的对象
        PreparedStatement pstatement =conn.prepareStatement(sql);
        pstatement.setString(1, user.getUsername());
        pstatement.setString(2, user.getPassword());
        // 执行sql语句获得结果集
        int res = pstatement.executeUpdate();
        if(res > 0) {
        	flag = true;
        }
        return flag;
	}
	
}
