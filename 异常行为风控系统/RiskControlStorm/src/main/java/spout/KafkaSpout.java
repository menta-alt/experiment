package spout;



import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.storm.spout.SpoutOutputCollector;
import org.apache.storm.task.TopologyContext;
import org.apache.storm.topology.OutputFieldsDeclarer;
import org.apache.storm.topology.base.BaseRichSpout;
import org.apache.storm.tuple.Fields;
import org.apache.storm.tuple.Values;
import org.apache.storm.utils.Utils;

import java.time.Duration;
import java.util.Collections;
import java.util.Map;
import java.util.Properties;


public class KafkaSpout extends BaseRichSpout {
    //数据收集器
    private SpoutOutputCollector collector;
    //Kafka消费者
    private KafkaConsumer<String, String> consumer;
    //Kafka消息主题
    private static final String TOPIC = "kafka_test";

    /**
     * 初始化
     */
    @Override
    public void open(Map map, TopologyContext topologyContext, SpoutOutputCollector collector) {
        this.collector = collector;

        // 相关配置
        Properties properties = new Properties();
        properties.put("bootstrap.servers", "117.50.188.75:9092");
        properties.put("group.id", "storm_group");
        properties.put("enable.auto.commit", "true");
        properties.put("auto.commit.interval.ms", "1000");
        properties.put("session.timeout.ms", "40000");
        properties.put("max.poll.interval.ms", "500000");
        properties.put("max.poll.records", 2);
        properties.put("key.deserializer", StringDeserializer.class.getName());
        properties.put("value.deserializer", StringDeserializer.class.getName());


        // 初始化kafka消费者
        consumer = new KafkaConsumer<>(properties);
        consumer.subscribe(Collections.singleton(TOPIC)); // 订阅test主题的消息
    }

    /**
     * 处理数据
     */
    @Override
    public void nextTuple() {
        // 消费者主动向服务端发起请求拉取消息
        ConsumerRecords<String, String> consumerRecords = consumer.poll(Duration.ofMillis(100));
        if (consumerRecords != null) {
            consumerRecords.forEach(record -> {
                System.out.println("data is:"+ record.value());
                this.collector.emit(new Values(record.value()));
            });
        }
        Utils.sleep(1000);
    }

    /**
     * 定义输出流和字段
     */
    @Override
    public void declareOutputFields(OutputFieldsDeclarer outputFieldsDeclarer) {
        System.out.println("----- 定义输出流和字段 -----");
        //把数据存储在元组中名为secret的字段里面
        outputFieldsDeclarer.declare(new Fields("secret"));
    }
}
