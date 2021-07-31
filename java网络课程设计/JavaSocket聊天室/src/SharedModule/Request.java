package SharedModule;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Request implements Serializable {
    private static final long serialVersionUID = -1251544519839207488L;
    private RequestType request;
    private Map<String, Object> dataMap;  //映射关系

    public Request(RequestType request){
        this.request = request;
        this.dataMap = new HashMap<>();
    }
    public void addData(String key, Object value){  //增添信息
        this.dataMap.put(key, value);
    }
    public RequestType getAction() {
        return request;
    }
    public Map<String, Object> getDataMap() {
        return dataMap;
    }
    public Object getDataByKey(String key){
        return dataMap.get(key);
    }
}
