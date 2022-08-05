package utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class GetProperties {

    public static Map<String, Object> getPropertiesMap(ClassLoader classLoader, String propertiesName) {
        Properties props = getProperties(classLoader, propertiesName);
        Map<String, Object> resultMap = new HashMap<>();
        props.keySet().forEach((key) -> {
            resultMap.put((String) key, props.getProperty((String) key));
        });
        return resultMap;
    }

    public static Map<String, Object> getPropertiesMap(String propertiesName) {
        Properties props = getProperties(GetProperties.class.getClassLoader(), propertiesName);
        Map<String, Object> resultMap = new HashMap<>();
        props.keySet().forEach((key) -> {
            resultMap.put((String) key, props.getProperty((String) key));
        });
        return resultMap;
    }

    public static Properties getProperties(ClassLoader classLoader, String propertiesName) {
        InputStream is = classLoader.getResourceAsStream(propertiesName + ".properties");
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        Properties props = new Properties();
        try {
            props.load(br);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return props;
    }

    public static Properties getProperties(String propertiesName) {
        InputStream is = GetProperties.class.getClassLoader().getResourceAsStream(propertiesName + ".properties");
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        Properties props = new Properties();
        try {
            props.load(br);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return props;
    }
}
