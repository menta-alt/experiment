import bolt.ExchangeBolt;
import bolt.PrintBolt;
import org.apache.storm.tuple.Fields;
import spout.KafkaSpout;
import org.apache.storm.Config;
import org.apache.storm.LocalCluster;
import org.apache.storm.StormSubmitter;
import org.apache.storm.topology.TopologyBuilder;

import java.util.Collections;


public class KafkaTopology {
    public static void main(String[] args) throws Exception {
        new KafkaTopology().execute(args);
    }

    private void execute(String[] args) throws Exception {
        //拓扑构造器
        TopologyBuilder builder = new TopologyBuilder();

        //设置从kafka读取流式数据
        builder.setSpout("spout", new KafkaSpout(), 1);
        //设置流水线的各个处理环节bolt shuffleGrouping对应上一环节的id
        builder.setBolt("exchange_bolt", new ExchangeBolt(), 2).setNumTasks(1).shuffleGrouping("spout");
        //shuffleGrouping的各参数就是绑定的streamId
        builder.setBolt("print_bolt", new PrintBolt(), 2).setNumTasks(1).fieldsGrouping("exchange_bolt", new Fields("secret"));

        // 提交到本地
        submitToLocal(builder);

        // 提交到远程集群 运行时后面跟着的第一个参数设置为Topology名称
        // submitToRemote(builder, args[0]);

        // 通过代码提交到远程集群 运行时后面跟着的第一个参数设置为Topology名称
        //submitToRemoteByCode(builder, args[0]);

    }

    /**
     * 通过代码提交到远程集群
     *
     * @param builder
     * @param topologyName
     */
    private void submitToRemoteByCode(TopologyBuilder builder, String topologyName) throws Exception {
        //配置
        Config config = new Config();
        config.put(Config.NIMBUS_SEEDS, Collections.singletonList("192.168.0.54"));
        config.put(Config.NIMBUS_THRIFT_PORT, 6627);
        config.put(Config.STORM_ZOOKEEPER_SERVERS, Collections.singletonList("192.168.0.54"));
        config.put(Config.STORM_ZOOKEEPER_PORT, 2181);
        config.put(Config.TASK_HEARTBEAT_FREQUENCY_SECS, 10000);
        config.setDebug(false);
        config.setNumAckers(3);
        config.setMaxTaskParallelism(20);

        //assembly模式打包的本机jar包路径
        String jarLocalPath = "G:\\gitee\\StudyRoom\\StudyIn2021\\May\\Java\\storm-demo-20210519\\target\\storm-demo-20210519-1.0.0-SNAPSHOT-jar-with-dependencies.jar";
        System.setProperty("storm.jar", jarLocalPath);
        StormSubmitter.submitTopologyAs(topologyName, config, builder.createTopology(), null, null, "root");
    }

    /**
     * 提交到远程集群
     *
     * @param builder
     * @param topologyName
     */
    private void submitToRemote(TopologyBuilder builder, String topologyName) throws Exception {
        //配置
        Config config = new Config();
        config.setDebug(false);
        config.setNumAckers(3);
        config.setMaxTaskParallelism(20);

        StormSubmitter.submitTopologyAs(topologyName, config, builder.createTopology(), null, null, "root");
    }

    /**
     * 提交到本地环境
     */
    private void submitToLocal(TopologyBuilder builder) throws Exception {
        //配置
        Config config = new Config();
        config.setDebug(false);
        config.setNumAckers(3);
        config.setMaxTaskParallelism(20);

        //本地提交
        LocalCluster cluster = new LocalCluster();
        cluster.submitTopology("storm_group", config, builder.createTopology());
        Thread.sleep(200000);
        cluster.killTopology("storm_group");
        cluster.shutdown();
    }
}