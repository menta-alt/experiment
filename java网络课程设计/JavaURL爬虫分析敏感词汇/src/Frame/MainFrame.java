package Frame;

import Reptile.Reptile;

import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.ArrayList;

public class MainFrame extends JFrame {
	private Container container;
	private JPanel mainPanel = new JPanel();

	private JPanel console = new JPanel(); // 控制台
	private JPanel inputFiled = new JPanel();
	private JPanel jplHtml = new JPanel();
	private JPanel jplText = new JPanel();
	private JPanel jplUp = new JPanel(); // 上半部分
	private JPanel jplSide = new JPanel(); // 侧栏部分
	private JPanel jplDown = new JPanel(); // 下半部分
	private JTabbedPane tabBar = new JTabbedPane(); // 选项卡，tab导航栏
	public JTextArea urlInput = new JTextArea(); // 输入网址的容器
	private JScrollPane urlInputScroll = new JScrollPane(this.urlInput);
	public static JTextArea htmlArea = new JTextArea(); // 网页html的内容
	private JScrollPane htmlSPane = new JScrollPane(htmlArea); // html的滚动内容
	public static JTextArea textArea = new JTextArea(); // 网页文本内容
	private JScrollPane textSPane = new JScrollPane(textArea); // 网页文本滚动内容
	private JPanel setUrlPanel = new JPanel();
	private JButton crawlUrlBtn = new JButton("开始爬虫");
	private JButton getUrlFileBtn = new JButton("导入网址库");
	private JPanel setWordsPanel = new JPanel();
	private JTextField sensitiveWordsField = new JTextField();
	private JScrollPane sensitiveWordsScroll = new JScrollPane(this.sensitiveWordsField);
	private JButton highlightBtn = new JButton("显示统计结果");
	private JButton chooseSWFileBtn = new JButton("导入敏感词库");
	private ResultFrame resultGuiArea;
	private ArrayList<String> parsedContent = new ArrayList<>();

	public MainFrame() {
		this.setDefaultCloseOperation(EXIT_ON_CLOSE);
		this.setSize(800, 600);
		this.setTitle("javaURL网页敏感词提取");

		this.mainPanel = new JPanel();
		this.mainPanel.setPreferredSize(new Dimension(600, 200));
		this.mainPanel.setBackground(Color.white);

		// 顶部部分
		// 输入网址部分界面
		inputFiled.setLayout(new BorderLayout());
		urlInput.setFont(new Font("宋体", Font.BOLD, 15));
		urlInput.setForeground(new Color(43, 187, 216));
		Border border = BorderFactory.createEtchedBorder(EtchedBorder.RAISED);
		urlInput.setBorder(BorderFactory.createTitledBorder(border, "输入网址", TitledBorder.CENTER, TitledBorder.TOP));
		((TitledBorder) this.urlInput.getBorder()).setTitleFont(new Font("宋体", Font.BOLD, 16));
		urlInputScroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		urlInputScroll.setPreferredSize(new Dimension(600, 200));
		urlInputScroll.setBorder(BorderFactory.createLineBorder(new Color(31, 110, 212)));
		inputFiled.add(urlInputScroll, BorderLayout.CENTER);

		// 源代码容器部分界面
		jplHtml.setLayout(new BorderLayout());
		htmlArea.setEditable(false); // 不可编辑
		htmlArea.setLineWrap(true); // 自动换行
		htmlArea.setFont(new Font("宋体", Font.PLAIN, 14));
		jplHtml.add(htmlSPane, BorderLayout.CENTER);

		// 网页文本部分界面
		jplText.setLayout(new BorderLayout());
		textArea.setFont(new Font("宋体", Font.PLAIN, 14));
		textArea.setEditable(false);
		textArea.setLineWrap(true);
		jplText.add(textSPane, BorderLayout.CENTER);

		// 选项卡
		console.setLayout(new BorderLayout());
		console.setPreferredSize(new Dimension(630, 500));
		tabBar.add("console", inputFiled);
		tabBar.add("html源代码", jplHtml);
		tabBar.add("网页文本", jplText);
		console.add(tabBar, BorderLayout.CENTER);

		// 侧栏部分
		jplSide.setPreferredSize(new Dimension(120, 45));
		jplSide.setBackground(Color.WHITE);

		// 开始爬虫
		this.crawlUrlBtn.setBackground(new Color(180, 209, 238));// 设置背景色
		this.crawlUrlBtn.setFont(new Font("宋体", Font.BOLD, 14));
		this.crawlUrlBtn.setFocusPainted(false);
		this.crawlUrlBtn.setBorderPainted(false);
		this.crawlUrlBtn.setPreferredSize(new Dimension(120, 40));

		// 导入网址库
		this.getUrlFileBtn.setBackground(new Color(180, 209, 238));
		this.getUrlFileBtn.setFont(new Font("宋体", Font.BOLD, 14));
		this.getUrlFileBtn.setPreferredSize(new Dimension(120, 40));
		this.getUrlFileBtn.setFocusPainted(false);
		this.getUrlFileBtn.setBorderPainted(false);

		jplSide.add(this.getUrlFileBtn);
		jplSide.add(this.crawlUrlBtn);

		// 上半部分结合
		jplUp.setLayout(new BorderLayout());
		jplUp.add(console, BorderLayout.CENTER);
		jplUp.add(jplSide, BorderLayout.EAST);

		// 下半部分
		this.setWordsPanel.setPreferredSize(new Dimension(790, 45));
		this.sensitiveWordsField.setFont(new Font("宋体", Font.BOLD, 15));
		this.sensitiveWordsField.setForeground(new Color(95, 143, 192));
		this.sensitiveWordsField.setBorder(BorderFactory.createEmptyBorder());
		this.sensitiveWordsScroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		this.sensitiveWordsScroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_NEVER);
		this.sensitiveWordsScroll.setPreferredSize(new Dimension(520, 40));

		this.chooseSWFileBtn.setPreferredSize(new Dimension(115, 40));
		this.chooseSWFileBtn.setBackground(new Color(180, 209, 238));

		this.highlightBtn.setPreferredSize(new Dimension(115, 40));
		this.highlightBtn.setBackground(new Color(180, 209, 238));

		this.setWordsPanel.add(this.sensitiveWordsScroll, BorderLayout.WEST);
		this.setWordsPanel.add(this.chooseSWFileBtn, BorderLayout.CENTER);
		this.setWordsPanel.add(this.highlightBtn, BorderLayout.EAST);
		this.setWordsPanel.setBackground(Color.WHITE);

		this.container = getContentPane();
		this.mainPanel.add(this.jplUp, BorderLayout.CENTER);
		this.mainPanel.add(this.setWordsPanel, BorderLayout.SOUTH);
		this.container.add(this.mainPanel, BorderLayout.CENTER);
		this.setResizable(false);
		this.setLocationRelativeTo(null);
		this.setVisible(true);

		/* 给按钮绑定事件 */
		// 开始爬虫的按钮
		crawlUrlBtn.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Reptile c = null;
				ArrayList<String> content = new ArrayList<>();
				ArrayList<String> l = new ArrayList<>();

				String urls = urlInput.getText();
				String[] tmp = urls.split("\n");
				for (int i = 0; i < tmp.length; i++) {
					l.add(tmp[i]);
				}
				c = new Reptile(l, true);
				c.run();
				content = c.result;
				for (int i = 0; i < content.size(); i++) {
					parsedContent.add("-----网页:" + tmp[i] + "-----\n" + c.parseHtml(content.get(i)) + "\n\n");
				}
				JOptionPane.showMessageDialog(MainFrame.this, "网页爬取完成");
			}
		});

		// 导入网址库的按钮
		getUrlFileBtn.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				String urls = readFile();
				String[] tmp = urls.split(",");
				for (int i = 0; i < tmp.length; i++) {
					urlInput.append(tmp[i] + "\n");
				}
			}
		});

		// 导入敏感词库的按钮
		chooseSWFileBtn.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					String content = readFile();
					sensitiveWordsField.setText(content);
				} catch (Exception e1) {
				}
			}
		});

		highlightBtn.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				String countedContent = new String();
				for (int i = 0; i < parsedContent.size(); i++) {
					countedContent += countSensitiveWords(parsedContent.get(i));
				}
				try {  // 保存敏感词分析结果
					File f = new File("result.txt");
					f.createNewFile();
					BufferedWriter bw = new BufferedWriter(new FileWriter(f));
					bw.write(countedContent);
					bw.close();
				} catch (Exception err) {
					err.printStackTrace();
				}

				resultGuiArea = new ResultFrame();
				resultGuiArea.setText(countedContent, sensitiveWordsField.getText());
				resultGuiArea.highlightSensitiveWords(sensitiveWordsField.getText().split(","));
			}
		});
	}

	public static void main(String[] args) {
		MainFrame frame = new MainFrame();
	}

	//读取文件
	private String readFile() {
		JFileChooser chooser = new JFileChooser(System.getProperty("user.dir"));
		chooser.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
		chooser.showDialog(new JLabel(), "选择文件");
		File file = chooser.getSelectedFile();
		String content = null;
		if (file != null) {
			if (!file.exists() || file.isDirectory()) 
				JOptionPane.showMessageDialog(null, "文件不存在或不是一个单独文件", "错误", JOptionPane.ERROR_MESSAGE);
			try {
				BufferedReader br = new BufferedReader(new FileReader(file));
				String tmp = br.readLine();
				content = tmp;
				while (tmp != null) {
					tmp = br.readLine();
					if (tmp != null)
						content += tmp;
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}
		return content;
	}

	//计算有多少个敏感词汇
	private String countSensitiveWords(String content) {
		String[] sensitiveWords = sensitiveWordsField.getText().split(",");  //获取敏感词汇
		for (int i = 0; i < sensitiveWords.length; i++) {
			int count = 0;
			String keyWord = sensitiveWords[i];
			int pos = 0;
			while ((pos = content.indexOf(keyWord, pos)) >= 0) {
				try {
					pos += keyWord.length();
					count++;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			String result = keyWord + ":" + count + "\t";
			content += result;
		}
		content += "\n\n";
		return content;
	}
}
