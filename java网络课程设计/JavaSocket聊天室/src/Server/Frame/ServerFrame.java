package Server.Frame;

import Server.Service.Server;

import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;

public class ServerFrame extends JFrame {
    Server server;
    public ServerFrame(Server server){
        this.server = server;
        this.init();
    }
    private void init(){
        this.setTitle("服务器");
        this.setSize(1000, 670);
        //设置默认窗体在屏幕中央
        int x = (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth();
        int y = (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight();
        this.setLocation((x - this.getWidth()) / 2, (y - this.getHeight()) / 2);
        this.setResizable(false);

        //在线用户显示区
        JPanel onlineUsersPanel = new JPanel();
        Border border = BorderFactory.createEtchedBorder(EtchedBorder.LOWERED);
        onlineUsersPanel.setBorder(BorderFactory.createTitledBorder(border, "在线用户", TitledBorder.CENTER,TitledBorder.CENTER));
        ((TitledBorder) onlineUsersPanel.getBorder()).setTitleFont(new Font("宋体", Font.BOLD, 16));
        onlineUsersPanel.setPreferredSize(new Dimension(450, 650));
        this.add(onlineUsersPanel, BorderLayout.WEST);
        
        //设置在线用户表格数据
        JTable onlineUsersTable = new JTable();
        onlineUsersTable.setRowHeight(30); //设置表格每行高度
        onlineUsersTable.setEnabled(false); //设置表格不可被改写内容
        DefaultTableCellRenderer r = new DefaultTableCellRenderer(); //设置表格内容居中
        r.setHorizontalAlignment(JLabel.CENTER);
        onlineUsersTable.setDefaultRenderer(Object.class, r);

        DefaultTableModel onlineUsersTableModel = new DefaultTableModel();
        String[] onlineUsersTableColumnNames = {"用户id", "昵称"};
        Object[][] onlineUsersTableData = {};
        onlineUsersTableModel.setDataVector(onlineUsersTableData, onlineUsersTableColumnNames);
        onlineUsersTable.setModel(onlineUsersTableModel);
        server.setOnlineUsersTableModel(onlineUsersTableModel);
        JScrollPane onlineUsersTableScroll = new JScrollPane(onlineUsersTable);
        onlineUsersTableScroll.setPreferredSize(new Dimension(440, 600));
        onlineUsersTableScroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
        onlineUsersPanel.add(onlineUsersTableScroll, BorderLayout.CENTER);
        
        //为在线用户表格添加右键点击下线
        onlineUsersTable.addMouseListener(new MouseAdapter() {
            public void mousePressed(MouseEvent me) {
                if (SwingUtilities.isRightMouseButton(me)) {
                    final int row = onlineUsersTable.rowAtPoint(me.getPoint());
                    if(row != -1){
                        final JPopupMenu popUp = new JPopupMenu();
                        JMenuItem select = new JMenuItem("强制下线");
                        select.addActionListener(new ActionListener() {
                            public void actionPerformed(ActionEvent e) {
                                try {
                                    server.removeUser((String) onlineUsersTableModel.getValueAt(row, 0));
                                } catch (IOException ignore) {
                                }
                                onlineUsersTableModel.removeRow(row);
                            }
                        });
                        popUp.add(select);
                        popUp.show(me.getComponent(), me.getX(), me.getY());
                    }
                }
            }
        });
        
        //系统群发消息区
        JPanel sysBatchSendPanel = new JPanel();
        sysBatchSendPanel.setBorder(BorderFactory.createTitledBorder(border, "状态信息", TitledBorder.CENTER,TitledBorder.CENTER));
        ((TitledBorder) sysBatchSendPanel.getBorder()).setTitleFont(new Font("宋体", Font.BOLD, 16));
        sysBatchSendPanel.setPreferredSize(new Dimension(750, 650));
        this.add(sysBatchSendPanel, BorderLayout.CENTER);
        
        //消息发送状态区
        JTextArea feedbackArea = new JTextArea();
        feedbackArea.setEditable(false);
        feedbackArea.setBackground(Color.lightGray);
        feedbackArea.setFont(new Font("宋体", Font.BOLD, 15));
        feedbackArea.setLineWrap(true);        //自动换行
        feedbackArea.setWrapStyleWord(true);   //断行不断字
        server.setFeedbackArea(feedbackArea);
        
        //输入群发消息区
        JTextArea inputArea = new JTextArea();
        inputArea.setBackground(Color.lightGray);
        inputArea.setFont(new Font("宋体", Font.BOLD, 15));
        inputArea.setSelectedTextColor(Color.RED);
        inputArea.setLineWrap(true);        
        inputArea.setWrapStyleWord(true);       
        
        //按钮
        JButton sendBtn = new JButton("群发");
        sendBtn.setPreferredSize(new Dimension(110, 30));
        sendBtn.setFocusPainted(false);//去焦点
        sendBtn.setBackground(new Color(27, 127, 176));
        sendBtn.setFont(new Font("宋体", Font.BOLD, 16));
        sendBtn.setForeground(Color.white);
        JScrollPane feedbackAreaScroll = new JScrollPane(feedbackArea);
        feedbackAreaScroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);//滚动条一直显示
        feedbackAreaScroll.setBounds(0, 0, 600, 300);//设置内容大小
        feedbackAreaScroll.setPreferredSize(new Dimension(500, 300));
        JScrollPane inputAreaScroll = new JScrollPane(inputArea);
        inputAreaScroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
        inputAreaScroll.setBounds(0, 0, 600, 250);//设置内容大小
        inputAreaScroll.setPreferredSize(new Dimension(500, 250));
        sysBatchSendPanel.add(feedbackAreaScroll, BorderLayout.NORTH);
        sysBatchSendPanel.add(inputAreaScroll, BorderLayout.CENTER);
        sysBatchSendPanel.add(sendBtn, BorderLayout.SOUTH);

        //群发按钮绑定事件
        sendBtn.addActionListener(e -> {
            try {
                server.massTexting(inputArea.getText(), feedbackArea);
                inputArea.setText("");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        });
        this.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                JOptionPane.showMessageDialog(ServerFrame.this, "服务正在关闭...", "关闭提示", JOptionPane.INFORMATION_MESSAGE);
                server.saveServerData();
                ServerFrame.this.dispose();
                System.exit(0);
            }
        });
        this.setVisible(true);
    }
}
