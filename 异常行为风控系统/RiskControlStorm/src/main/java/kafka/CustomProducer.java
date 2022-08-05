package kafka;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.sql.*;
import java.util.Properties;

class Person{
    String id;
    String name;
    int age;
    String quotes;
}

/**
 *
 * kafka 生产者从数据库获取数据异步发送消息
 * @Params:
 * @Return
 */

public class CustomProducer {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        //配置
        Properties properties = new Properties();

        //连接集群
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "117.50.188.75:9092");

        //指定对应的key和value的序列化
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        //创建Kafka生产者对象
        KafkaProducer<String, String> kafkaProducer = new KafkaProducer<>(properties);

        //从数据库拉取数据
        Connection cnnt = null;
        Statement stmt = null;

        // jdbc的配置
        Class.forName("org.postgresql.Driver");
        cnnt = DriverManager
                .getConnection("jdbc:postgresql://117.50.188.75:5432/elvira",
                        "postgres", "postgres");
        cnnt.setAutoCommit(false);
        System.out.println("--------打开数据库成功-----");

        // 写 CRUD 语句
        stmt = cnnt.createStatement();
        ResultSet res = stmt.executeQuery("SELECT * FROM people;");
        String sentence = null;

        while (res.next()) {
            String id = res.getString("id");
            String name = res.getString("name");
            int age = res.getInt("age");
            String quotes = res.getString("quotes");
            sentence = quotes;

            Person person = new Person();
            person.id = id;
            person.name = name;
            person.age = age;
            person.quotes = quotes;

            // 生产者发送消息
            kafkaProducer.send(new ProducerRecord<>("kafka_test", sentence));
        }
        res.close();
        stmt.close();
        cnnt.close();

        // 关闭生产者
        kafkaProducer.close();
    }
}


