package Client.Frame;

import Client.Service.ClientSendRequest;
import Client.Service.SingleBuffer;
import SharedModule.*;
import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.border.EmptyBorder;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.util.ArrayList;

public class Login extends JFrame {
	public Login() {
		this.setTitle("聊天室登录");
		this.setSize(550, 420);
		
		//设置默认窗体在屏幕中央
        int x = (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth();
        int y = (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight();
        this.setLocation((x - this.getWidth()) / 2, (y-this.getHeight())/ 2);
        this.setResizable(false);  //不可拖大拖小

        //添加背景图片
        ImageIcon image = new ImageIcon("static/login.png");
        Image img = image.getImage();
        img = img.getScaledInstance(550, 330, Image.SCALE_DEFAULT); //创建此图像的缩放版本,自适应大小，默认图像缩放算法
        image.setImage(img);
        JLabel imgLabel = new JLabel(image);
        imgLabel.setPreferredSize(new Dimension(550,150));
        this.add(imgLabel, BorderLayout.NORTH);

        //登录信息面板
        JPanel mainPanel = new JPanel();
        Border border = BorderFactory.createEtchedBorder(EtchedBorder.RAISED); //蚀刻边框
        mainPanel.setBorder(BorderFactory.createTitledBorder(border, "输入登录信息", TitledBorder.CENTER,TitledBorder.TOP));  //标题在最上方正中间
        ((TitledBorder) mainPanel.getBorder()).setTitleFont(new Font("宋体", Font.BOLD, 16)); //设置标题的字体
        this.add(mainPanel, BorderLayout.CENTER);
        mainPanel.setLayout(null);
        
        //账号输入区
        JLabel nameLabel = new JLabel("账户:");
        nameLabel.setBounds(90, 40, 50, 40);
        nameLabel.setFont(new Font("宋体", Font.BOLD, 16));
        mainPanel.add(nameLabel);
        JTextField userIdField = new JTextField();
        userIdField.setBounds(137, 40, 275, 35);
        userIdField.setFont(new Font("宋体", Font.BOLD, 16));
        userIdField.requestFocusInWindow(); //用户名获得焦点
        mainPanel.add(userIdField);
        
        //密码输入区
        JLabel pwdLabel = new JLabel("密码:");
        pwdLabel.setBounds(90, 100, 50, 40);
        pwdLabel.setFont(new Font("宋体", Font.BOLD, 16));
        mainPanel.add(pwdLabel);
        JPasswordField passwordField = new JPasswordField();
        passwordField.setBounds(137, 100, 275, 35);
        mainPanel.add(passwordField);
        nameLabel.setPreferredSize(new Dimension(550,200));

        //按钮面板
        JPanel btnPanel = new JPanel();
        btnPanel.setPreferredSize(new Dimension(550,50));
        btnPanel.setLayout(null);  //设置自定义空布局
        this.add(btnPanel, BorderLayout.SOUTH);
        btnPanel.setBorder(new EmptyBorder(2, 8, 4, 8));
        
        //注册账号按钮
        JButton registerBtn = new JButton("注册账号");
        registerBtn.setBounds(0, 20, 100, 30);
        registerBtn.setFocusPainted(false);  //去焦点
        registerBtn.setForeground(Color.gray); //设置字体颜色
        registerBtn.setContentAreaFilled(false); //出去默认背景
        
        //登录按钮
        JButton submitBtn = new JButton("登录");
        submitBtn.setBounds(205, 5, 140, 40);
        submitBtn.setFocusPainted(false);
        submitBtn.setBackground(new Color(27, 127, 176));
        submitBtn.setFont(new Font("宋体", Font.BOLD, 16));
        submitBtn.setForeground(Color.white);
        
        //添加按钮到面板
        btnPanel.add(registerBtn);
        btnPanel.add(submitBtn);

        //注册按钮监听事件
        registerBtn.addActionListener(e -> new Register());  //打开注册界面

        //登录按钮监听事件
        submitBtn.addActionListener(e -> this.login(userIdField, passwordField));
        this.setVisible(true); //设置面板可见
	}
	
	private void login(JTextField userID, JPasswordField password){
        //输入为空
        if (userID.getText().length() == 0 || password.getPassword().length == 0){
            JOptionPane.showMessageDialog(Login.this,"账号或密码不能为空！","输入有误",JOptionPane.ERROR_MESSAGE);
            userID.requestFocusInWindow();  //获得焦点
            return ;
        }
        //账号格式有误
        if (!userID.getText().matches("\\d+")){  //正则表达式匹配
            JOptionPane.showMessageDialog(Login.this,"账号必须全是数字！","输入有误",JOptionPane.ERROR_MESSAGE);
            userID.setText("");  //重置
            userID.requestFocusInWindow();
            return ;
        }
        
        //给出新线程处理登录
        new Thread(() -> {
            Request request = new Request(RequestType.SIGN_IN);
            request.addData("userID", userID.getText());
            request.addData("password", new String(password.getPassword()));
            Response response = null;
            try {
                System.out.println("正在发送");
                response = ClientSendRequest.sendForResponse(request);
            } catch (Exception ignored) {
                ignored.printStackTrace();
            }
            System.out.println("成功与服务器进行通信");
            if (response == null) {
                JOptionPane.showMessageDialog(Login.this,"服务器未连接，目前无法登录，请稍后重试！","网络错误", JOptionPane.ERROR_MESSAGE);
            } else if (response.getResponseStatus() == ResponseStatus.OK) {  
                if (response.getResponseType() == ResponseType.SUCCESS_SIGN_IN) {
                    JOptionPane.showMessageDialog(Login.this,"欢迎回来！","登录成功", JOptionPane.INFORMATION_MESSAGE);
                    SingleBuffer.setUserInfo((UserInfo) response.getDataByKey("userInfo"));  //设置缓存
                    SingleBuffer.setFriends((ArrayList<UserInfo>) response.getDataByKey("userFriends"));
                    SingleBuffer.setOnlineFriends((ArrayList<UserInfo>) response.getDataByKey("userOnlineFriends"));
                    this.dispose();//关闭登录页面
                    ClientFrame mainFrame = new ClientFrame(); //进入聊天页面
                } else if (response.getResponseType() == ResponseType.WRONG_ID) {
                    JOptionPane.showMessageDialog(Login.this,"账户不存在，请检查账户是否正确！","账户错误", JOptionPane.ERROR_MESSAGE);
                } else if (response.getResponseType() == ResponseType.WRONG_PWD) {
                    JOptionPane.showMessageDialog(Login.this,"密码错误，请检查密码是否正确！","密码错误", JOptionPane.ERROR_MESSAGE);
                } else if(response.getResponseType() == ResponseType.SECOND_LOGIN){
                    JOptionPane.showMessageDialog(Login.this,"此账号已经登录，不能重复登录！","重复登录", JOptionPane.ERROR_MESSAGE);
                }
            } else {  //无响应
                JOptionPane.showMessageDialog(Login.this,"服务器未连接，目前无法登录，请稍后重试","网络错误", JOptionPane.ERROR_MESSAGE);
            }
        }).start();
    }
}
