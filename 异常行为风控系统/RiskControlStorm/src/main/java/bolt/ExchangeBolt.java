package bolt;

import org.apache.storm.task.OutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichBolt;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Tuple;
import org.apache.storm.tuple.Values;

import java.util.Map;

/**
 * Title: ExchangeBolt
 * Description: 将文本进行加密
 */
public class ExchangeBolt extends BaseRichBolt {

    private static final long serialVersionUID = 4743224635827696343L;

    private OutputCollector collector;

    /**
     * 初始化
     * 在Bolt启动前执行，提供Bolt启动环境配置的入口
     * 一般对于不可序列化的对象进行实例化。
     * 注:如果是可以序列化的对象，那么最好是使用构造函数。
     */
    @Override
    public void prepare(Map map, TopologyContext arg1, OutputCollector collector) {
        this.collector = collector;
    }

    // 字母的转换规则
    public String exchange(String str) {
        String character = switch (str) {
            case "a" -> "1";
            case "b" -> "2";
            case "c" -> "3";
            case "d" -> "4";
            case "e" -> "5";
            case "f" -> "6";
            case "g" -> "7";
            case "h" -> "8";
            case "i" -> "9";
            case "j" -> "0";
            default -> str;
        };

        return character;
    }

    /**
     * 处理数据
     * execute()方法是Bolt实现的核心。
     * 也就是执行方法，每次Bolt从流接收一个订阅的tuple，都会调用这个方法。
     */
    @Override
    public void execute(Tuple tuple) {
        String msg = tuple.getStringByField("secret") + "~";
        String[] words = msg.toLowerCase().split("");

        for (String word : words) {
            this.collector.emit(new Values(this.exchange(word)));//向下一个bolt发射数据
        }

    }

    /**
     * 声明数据格式,定义输出数据元组字段
     */
    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("secret"));
    }

    /**
     * cleanup是IBolt接口中定义,用于释放bolt占用的资源。
     * Storm在终止一个bolt之前会调用这个方法。
     */
    @Override
    public void cleanup() {
        System.out.println("测试释放splitbolt占用的资源");
    }
}

