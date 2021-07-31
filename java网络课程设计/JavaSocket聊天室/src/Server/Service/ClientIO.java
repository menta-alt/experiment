/*服务器连接到每个用户的客户端的输入输出流*/
package Server.Service;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class ClientIO {
    private ObjectInputStream ois;
    private ObjectOutputStream oos;
    public ClientIO(ObjectInputStream ois, ObjectOutputStream oos){
        this.ois = ois;
        this.oos = oos;
    }
    
    public ObjectInputStream getOis() {
        return ois;
    }
    
    public ObjectOutputStream getOos() {
        return oos;
    }
}
