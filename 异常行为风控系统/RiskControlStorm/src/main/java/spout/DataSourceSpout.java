package spout;

import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichSpout;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Values;

import java.util.Map;

public class DataSourceSpout extends BaseRichSpout {

    private static final long serialVersionUID = 225243592780939490L;

    //数据收集器
    private SpoutOutputCollector collector;
    private int count = 1;

    // mock的数据
    private String[] message = {
            "Xiaoxiao",
            "Ever bullet has its billet",
            "Hasta La vista!",
            "Whatever is worth doing is worth doing well",
            "Never put off what you can do today until tomorrow.",
            "The best preparation for tomorrow is doing your best today.",
            "I can because i think i can.",
            "Judge not from appearances.",
            "Learn and live.",
            "Learn not and know not."
    };

    /**
     * 初始化操作
     * open()方法中是在ISpout接口中定义，在Spout组件初始化时被调用。
     * 有三个参数:
     * 1.Storm配置的Map;
     * 2.topology中组件的信息;
     * 3.发射tuple的方法;
     */
    @Override
    public void open(Map map, TopologyContext arg1, SpoutOutputCollector collector) {
        this.collector = collector;
    }

    /**
     * 数据处理
     * nextTuple()方法是Spout实现的核心。
     * 也就是主要执行方法，用于输出信息,通过collector.emit方法发射。
     */
    @Override
    public void nextTuple() {
        if (count <= message.length) {
            System.out.println("数据源第" + count + "次传输数据");
            this.collector.emit(new Values(message[count - 1]));
        }
        count++;
    }


    /**
     * 定义输出流和字段
     * declareOutputFields是在IComponent接口中定义，用于声明数据格式。
     * 即输出的一个Tuple中，包含几个字段。
     */
    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        System.out.println("----- 定义输出流和字段 -----");
        declarer.declare(new Fields("secret"));
    }

}
