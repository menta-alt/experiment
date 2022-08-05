import bolt.ExchangeBolt;
import bolt.PrintBolt;
import org.apache.storm.Config;
import org.apache.storm.LocalCluster;
import org.apache.storm.StormSubmitter;
import org.apache.storm.topology.TopologyBuilder;
import org.apache.storm.tuple.Fields;
import spout.DataSourceSpout;

public class MyTopology {

    public static void main(String[] args) {
        // 定义拓扑构造器
        TopologyBuilder builder = new TopologyBuilder();

        // 设置流水线数据源spout
        builder.setSpout("spout", new DataSourceSpout(), 1);
        //设置流水线的各个处理环节bolt shuffleGrouping表示是随机分组，对应上一环节的id,shuffleGrouping:表示是随机分组
        builder.setBolt("exchange_bolt", new ExchangeBolt(), 2).setNumTasks(1).shuffleGrouping("spout");
        //fieldsGrouping:表示是按字段分组
        builder.setBolt("print_bolt", new PrintBolt(), 2).setNumTasks(1).fieldsGrouping("exchange_bolt", new Fields("secret"));

        Config conf = new Config();
        conf.put("test", "test");

        try {
            System.out.println("启动本地模式");
            LocalCluster cluster = new LocalCluster();
            cluster.submitTopology("exchange", conf, builder.createTopology());
            Thread.sleep(20000);
            //关闭本地集群
            cluster.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
