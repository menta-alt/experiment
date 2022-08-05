package bolt;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Tuple;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Title: PrintBolt
 * Description: 将加密的文本加密并输出
 */
public class PrintBolt extends BaseRichBolt {

    private static final long serialVersionUID = 4743224635827696343L;

    // 保存加密后的文段
    private final List<String> sentences = new ArrayList<String>();
    private String temp = "";

    // 初始化
    @Override
    public void prepare(Map map, TopologyContext arg1, OutputCollector collector) {

    }

    // 执行处理数据
    @Override
    public void execute(Tuple tuple) {
        String msg = tuple.getStringByField("secret");
        System.out.println("--------msg是：" + msg);

        Connection cnnt = null;
        Statement stmt = null;

        if(Objects.equals(msg, "~")) {
            // 输出结果到数据库
            try {
                Class.forName("org.postgresql.Driver");
                cnnt = DriverManager
                        .getConnection("jdbc:postgresql://117.50.188.75:5432/elvira",
                                "postgres", "postgres");
                System.out.println("---成功打开数据库---");

                stmt = cnnt.createStatement();
                String sql = "INSERT INTO res(secret) "
                        + "VALUES ('" + temp + "');";
                stmt.executeUpdate(sql);
                stmt.close();
                cnnt.close();
            } catch ( Exception e ) {
                System.err.println( e.getClass().getName()+": "+ e.getMessage() );
                System.exit(0);
            }

            sentences.add(temp);
            temp = "";
        } else {
            temp = temp.concat(msg);
        }
    }

    // Storm在终止一个 bolt前会调用该方法进行扫尾，释放资源。
    @Override
    public void cleanup() {
        System.out.println("---------------------Start---------------------");
        System.out.println("==加密结果如下：");
        sentences.forEach(System.out::println);
        System.out.println("---------------------End----------------------");
        System.out.println("测试释放printbolt的资源");
    }

    /**
     * 声明数据格式
     */
    @Override
    public void declareOutputFields(OutputFieldsDeclarer arg0) {

    }
}

