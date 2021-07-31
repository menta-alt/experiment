package Client.Frame;

import Client.Service.ClientSendRequest;
import SharedModule.*;

import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.border.EmptyBorder;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.IOException;

public class Register extends JFrame {
	public Register() {
		this.setTitle("注册新账号");// 设置标题
		this.setSize(530, 420);
		// 设置默认窗体在屏幕中央
		int x = (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth();
		int y = (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight();
		this.setLocation((x - this.getWidth()) / 2 + 50, (y - this.getHeight()) / 2 + 50);
		this.setResizable(false);

		// 信息填写面板
		JPanel infoPanel = new JPanel();
		Border border = BorderFactory.createEtchedBorder(EtchedBorder.RAISED);
		infoPanel.setBorder(BorderFactory.createTitledBorder(border, "输入注册信息", TitledBorder.CENTER, TitledBorder.TOP));
		((TitledBorder) infoPanel.getBorder()).setTitleFont(new Font("宋体", Font.BOLD, 16));
		this.add(infoPanel, BorderLayout.CENTER);
		infoPanel.setLayout(null);

		// 昵称输入区
		JLabel nicknameLabel = new JLabel("昵称:"); // label显示
		nicknameLabel.setBounds(120, 70, 60, 30);
		nicknameLabel.setFont(new Font("宋体", Font.BOLD, 16));
		infoPanel.add(nicknameLabel);
		JTextField nicknameField = new JTextField(); // 昵称
		nicknameField.setBounds(170, 70, 200, 30);
		nicknameField.setFont(new Font("宋体", Font.BOLD, 16));
		infoPanel.add(nicknameField);

		// 密码输入区
		JLabel pwdLabel = new JLabel("密码:");
		pwdLabel.setBounds(120, 110, 60, 30);
		pwdLabel.setFont(new Font("宋体", Font.BOLD, 16));
		infoPanel.add(pwdLabel);
		JPasswordField pwdField = new JPasswordField();// 密码框
		pwdField.setBounds(170, 110, 200, 30);
		infoPanel.add(pwdField);

		// 确认密码
		JLabel pwdConfirmLabel = new JLabel("确认密码:");
		pwdConfirmLabel.setBounds(90, 150, 80, 30);
		pwdConfirmLabel.setFont(new Font("宋体", Font.BOLD, 16));
		infoPanel.add(pwdConfirmLabel);
		JPasswordField pwdConfirmField = new JPasswordField();
		pwdConfirmField.setBounds(170, 150, 200, 30);
		infoPanel.add(pwdConfirmField);

		// 性别输入区
		JLabel sexLabel = new JLabel("性别:");
		sexLabel.setBounds(120, 190, 60, 30);
		sexLabel.setFont(new Font("宋体", Font.BOLD, 16));
		infoPanel.add(sexLabel);
		JRadioButton sexMale = new JRadioButton("男", true);  //默认
		sexMale.setFont(new Font("宋体", Font.BOLD, 16));
		sexMale.setBounds(180, 190, 60, 30);
		infoPanel.add(sexMale);
		JRadioButton sexFemale = new JRadioButton("女");
		sexFemale.setFont(new Font("宋体", Font.BOLD, 16));
		sexFemale.setBounds(240, 190, 60, 30);
		infoPanel.add(sexFemale);
		ButtonGroup buttonGroup = new ButtonGroup();// 单选按钮组
		buttonGroup.add(sexMale);
		buttonGroup.add(sexFemale);

		// 手机号输入区
		JLabel phoneLabel = new JLabel("手机号:"); // label显示
		phoneLabel.setBounds(110, 230, 60, 30);
		phoneLabel.setFont(new Font("宋体", Font.BOLD, 16));
		infoPanel.add(phoneLabel);
		JTextField phoneField = new JTextField(); // 手机号
		phoneField.setBounds(170, 230, 200, 30);
		phoneField.setFont(new Font("宋体", Font.BOLD, 16));
		infoPanel.add(phoneField);

		// 按钮面板
		JPanel btnPanel = new JPanel();
		this.add(btnPanel, BorderLayout.SOUTH);
		btnPanel.setPreferredSize(new Dimension(550, 50));
		btnPanel.setLayout(null); // 设置为自定义空布局
		btnPanel.setBorder(new EmptyBorder(2, 8, 4, 8));

		// 确认按钮
		JButton confirmBtn = new JButton("确 认");
		confirmBtn.setBounds(110, 10, 100, 30);
		btnPanel.add(confirmBtn);
		this.setBtnStyle(confirmBtn);// 去焦点，设背景颜色，设字体颜色

		// 重填按钮
		JButton clearBtn = new JButton("重 填");
		clearBtn.setBounds(330, 10, 100, 30);
		btnPanel.add(clearBtn);
		this.setBtnStyle(clearBtn); 

		// 关闭窗口
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				Register.this.dispose();
			}
		});

		// 重填按钮监听事件绑定
		clearBtn.addActionListener(new ActionListener() {
			public void actionPerformed(final ActionEvent e) {
				nicknameField.setText("");
				pwdField.setText("");
				pwdConfirmField.setText("");
				phoneField.setText("");
				nicknameField.requestFocusInWindow();// 用户名获得焦点
			}
		});

		// 确认按钮监听事件绑定
		confirmBtn.addActionListener(new ActionListener() {
			public void actionPerformed(final ActionEvent e) {
				// 判断各字段是否为空
				if (nicknameField.getText().length() == 0 || pwdField.getPassword().length == 0
						|| pwdConfirmField.getPassword().length == 0 || phoneField.getText().length() == 0) {
					JOptionPane.showMessageDialog(Register.this, "请将信息填写完整!");
				} else if (pwdField.getPassword().length <= 6) {
					JOptionPane.showMessageDialog(Register.this, "密码太短，不能少于6位!");
					pwdField.setText("");
					pwdConfirmField.setText("");
					pwdField.requestFocusInWindow();
				} else if (!new String(pwdField.getPassword()).equals(new String(pwdConfirmField.getPassword()))) {
					JOptionPane.showMessageDialog(Register.this, "两次输入密码不一致!");
					pwdField.setText("");
					pwdConfirmField.setText("");
					pwdField.requestFocusInWindow();
				} else if (!Register.this.checkPhoneNumber(phoneField.getText())) {
					JOptionPane.showMessageDialog(Register.this, "请输入正确的手机号！");
					phoneField.setText("");
					phoneField.requestFocusInWindow();
				} else {
					UserInfo user = new UserInfo(nicknameField.getText(), new String(pwdField.getPassword()),
							sexMale.isSelected() ? Sex.M : Sex.F, phoneField.getText());
					try {
						Register.this.register(user);// 一定要加Register.this，只用this.代表的是ActionListener类的实例
					} catch (Exception e3) {
						e3.printStackTrace();
					}
				}
			}
		});
		this.setVisible(true);
	}

	// 注册
	private void register(UserInfo user) {
		Request request = new Request(RequestType.SIGN_UP);
		request.addData("user", user);
		// 另开线程处理注册，原线程继续监听事件请求
		new Thread(() -> {
			// 获取响应内容
			Response response = null;
			try {
				response = ClientSendRequest.sendForResponse(request);
			} catch (IOException | ClassNotFoundException | InterruptedException e) {
				e.printStackTrace();
			}
			if (response.getResponseStatus() == ResponseStatus.OK) {// 正常响应
				if (response.getResponseType() == ResponseType.SUCCESS_SIGN_UP) {
					JOptionPane.showMessageDialog(Register.this,"您已成功注册，您的帐号为:" + response.getDataByKey("userID") + "。", "注册成功",
							JOptionPane.INFORMATION_MESSAGE);
					this.dispose();
				} else if (response.getResponseType() == ResponseType.NICKNAME_EXIST) 
					JOptionPane.showMessageDialog(Register.this, "该昵称已被使用", "昵称重复", JOptionPane.INFORMATION_MESSAGE);
			} else 
				JOptionPane.showMessageDialog(Register.this, "注册失败，请稍后再试！", "网络错误！", JOptionPane.ERROR_MESSAGE);
		}).start();
	}

	//设置按钮样式
    private void setBtnStyle(JButton button){
        button.setFocusPainted(false);//去焦点
        button.setBackground(new Color(27, 127, 176));
        button.setFont(new Font("宋体", Font.BOLD, 16));
        button.setForeground(Color.white);//设置字体颜色
    }
    
    //判断手机号是否正确
	private boolean checkPhoneNumber(String phoneNumber) {
		return phoneNumber.matches("^1(3\\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\\d|9\\d)\\d{8}$");
	}
}
