package modle;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * @author 小萌
 * JDBCUtil 类的作用: jdbc 的一些简单配置
 *
 */

public class JDBCUtil {
	// 数据库的参数
	private String dbUrl="jdbc:mysql://localhost:3306/my_login?useSSL=false";
    private String dbUsername="root";
    private String dbPassword="201429";
    
    // 与数据库连接
    public Connection getConn() {
    	try {
    		// 加载驱动
    		Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception e) {
			e.printStackTrace();
		}
    	Connection conn = null;
    	
    	try {
    		// 获得连接,返回connection 对象
    		conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return conn;
    }
    
    // 释放资源
    // 关闭结果集 ResultSet
    public void close(ResultSet resultSet) throws Exception {
		if(resultSet != null) {
			resultSet.close();
		}
	}
    
    // 关闭 sql 语句对象 Statement
    public void close(Statement statement) throws Exception {
    	if(statement != null) {
    		statement.close();
    	}
    }
    
    // 关闭连接对象 Connection
    public void close(Connection conn) throws Exception {
    	if(conn != null) {
    		conn.close();
    	}
    }
        
//    public static void main(String[] args) {
//    	JDBCUtil dbUtil = new JDBCUtil();
//        try {
//        	Connection conn = dbUtil.getConn();
//        	System.out.println("数据库连接成功");
//        	Statement statement = conn.createStatement();
//    		// 3.2 编写sql语句
//    		String sql = "select * from users";
//    		// 3.3 执行sql语句
//    		ResultSet rs = statement.executeQuery(sql);
//    		// 3.4 遍历结果集
//    		while(rs.next()) {
//    			System.out.print(rs.getInt("id")+" ");
//    			System.out.print(rs.getString("username")+" ");
//    			System.out.print(rs.getString("password")+" ");
//    			System.out.println();
//    		}
//    		dbUtil.close(rs);
//    		dbUtil.close(statement);
//    		dbUtil.close(conn);
//    		
//        } catch (Exception e) {            
//            e.printStackTrace();
//        }
//	}
}
