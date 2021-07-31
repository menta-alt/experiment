package Frame;

import javax.swing.*;
import javax.swing.text.DefaultHighlighter;
import javax.swing.text.Highlighter;
import java.awt.*;

public class ResultFrame extends JFrame{
    private Container container;
    private JPanel mainPanel;
    private JTextArea displayArea;
    private JScrollPane jsp;
    private JPanel sensitiveWordsPanel;
    private JTextField sensitiveWords;
    private JScrollPane sensitiveWordsScroll;
    private String originContent;

    public ResultFrame(){
        setSize(800, 600);
        setTitle("爬取结果");
        this.mainPanel = new JPanel();
        this.mainPanel.setPreferredSize(new Dimension(800, 600));

        this.displayArea = new JTextArea();
        this.displayArea.setWrapStyleWord(true);
        this.displayArea.setLineWrap(true);
        this.displayArea.setEditable(false);
        Font font = new Font("宋体",Font.PLAIN,18);
        this.displayArea.setFont(font);
        this.jsp = new JScrollPane(this.displayArea);
        this.jsp.setPreferredSize(new Dimension(790, 500));
        this.jsp.setBorder(BorderFactory.createEmptyBorder());

        this.sensitiveWordsPanel = new JPanel();
        this.sensitiveWordsPanel.setPreferredSize(new Dimension(790, 45));
        JLabel sensitiveWordsLabel = new JLabel("敏感词库:");
        sensitiveWordsLabel.setFont(font);
        this.sensitiveWords = new JTextField();
        this.sensitiveWords.setFont(new Font("宋体",Font.BOLD,16));
        this.sensitiveWords.setForeground(new Color(247,141,63));
        this.sensitiveWords.setBorder(BorderFactory.createEmptyBorder());
        this.sensitiveWords.setEditable(false);

        this.sensitiveWordsScroll = new JScrollPane(this.sensitiveWords);
        this.sensitiveWordsScroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
        this.sensitiveWordsScroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_NEVER);
        this.sensitiveWordsScroll.setPreferredSize(new Dimension(520, 40));

        this.sensitiveWordsPanel.add(sensitiveWordsLabel, BorderLayout.WEST);
        this.sensitiveWordsPanel.add(this.sensitiveWordsScroll, BorderLayout.CENTER);
        this.sensitiveWordsPanel.setBackground(Color.WHITE);

        this.mainPanel.setBackground(Color.WHITE);
        this.container = getContentPane();
        this.mainPanel.add(this.jsp,BorderLayout.CENTER);
        this.mainPanel.add(this.sensitiveWordsPanel,BorderLayout.SOUTH);
        this.container.add(this.mainPanel,BorderLayout.CENTER);

        setResizable(true);
        setLocationRelativeTo(null);  //此窗口将置于屏幕的中央
        setVisible(true);
    }

    public void setText(String text, String sensitiveWords){
        this.displayArea.setText(text);
        this.originContent = text;
        this.sensitiveWords.setText(sensitiveWords);
    }

    //给敏感词汇加高亮
    public void highlightSensitiveWords(String[] sensitiveWords){
        Highlighter highLighter = this.displayArea.getHighlighter();
        highLighter.removeAllHighlights();
        String content = this.originContent;
        DefaultHighlighter.DefaultHighlightPainter painter = new DefaultHighlighter.DefaultHighlightPainter(Color.YELLOW);
        for(int i=0; i < sensitiveWords.length; i++){
            String keyWord = sensitiveWords[i];
            int pos = 0;
            while ((pos = content.indexOf(keyWord, pos)) >= 0) {
                try {
                    highLighter.addHighlight(pos, pos + keyWord.length(), painter);
                    pos += keyWord.length();
                } catch (Exception e){e.printStackTrace();}
            }
        }
    }
}
