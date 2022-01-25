package modle;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailUtil {
	/**
	 * 
	 * @param email 登录用户的邮件
	 * @param emailMsg  发送的邮件信息
	 * @throws Exception
	 */
	public void sendMail(String userEmail, String emailMsg) throws Exception {
		
        // 1. 创建一封邮件，创建一个程序与邮件服务器会话对象session
        Properties props = new Properties();
        props.setProperty("mail.transport.protocol", "SMTP");
        props.setProperty("mail.host", "smtp.126.com"); //smtp.126.com为SMTP服务器地址，为指定这个服务器发送邮件
        props.setProperty("mail.smtp.auth", "true"); // 指定验证为true
        
        // 创建验证器
        Authenticator auth = new Authenticator() {
        	public PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("xxx", "授权密码"); //有一个参数为授权密码
			}
        };
        
        // 用于连接邮件服务器的参数配置（发送邮件时需要用到）
        Session session= Session.getInstance(props,auth);  // 根据参数配置，创建会话对象（为了发送邮件准备的）
        
        
        // 2.创建邮件对象message，相当于邮件内容
        Message message = new MimeMessage(session);

        // From: 发件人
        // 其中 InternetAddress 的三个参数分别为: 邮箱, 显示的昵称(只用于显示, 没有特别的要求), 昵称的字符集编码
        // 真正要发送时, 邮箱必须是真实有效的邮箱。
        message.setFrom(new InternetAddress("邮箱地址"));  

        // To: 收件人 设置收件人和发送方式
        message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(userEmail));
      
        // Subject: 邮件主题
        message.setSubject("邮箱验证");

        // Content: 邮件正文（可以使用html标签）
        message.setContent(emailMsg, "text/html;charset=UTF-8");

        // 3. 创建 transport 用于将邮件发出
        Transport.send(message);
    }
}
