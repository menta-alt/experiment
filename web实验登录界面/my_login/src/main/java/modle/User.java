package modle;

/**
 * 
 * @author 小萌
 * User类为用户基本信息配置
 *
 */
public class User {
	private String username;
	private String password;
	
	// 构造函数
	public User() {}
	 
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	// 获取用户名
	public String getUsername() {
		return username;
	}
	
	// 设置用户名
	public void setUsersname(String username) {
		this.username = username;
	}
	
	// 获取密码
	public String getPassword() {
		return password;
	}
	
	// 设置密码
	public void setPassword(String password) {
		 this.password = password;
	}
}
