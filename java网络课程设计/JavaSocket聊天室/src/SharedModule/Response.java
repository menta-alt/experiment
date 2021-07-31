package SharedModule;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Response implements Serializable {
    private static final long serialVersionUID = -1796454951694768195L;
    private ResponseStatus responseStatus; //响应状态
    private ResponseType responseType;  //响应类型
    private Map<String, Object> dataMap;  //返回数据

    public Response(ResponseStatus responseStatus, ResponseType responseType) {
        this.responseStatus = responseStatus;
        this.responseType = responseType;
        this.dataMap = new HashMap<>();
    }
    public void addData(String key, Object value){
        this.dataMap.put(key, value);
    }
    public ResponseType getResponseType(){
        return this.responseType;
    }
    public ResponseStatus getResponseStatus(){
        return this.responseStatus;
    }
    public Object getDataByKey(String key){
        return this.dataMap.get(key);
    }
}
