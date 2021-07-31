/*客户端向服务器端发送数据。*/

package Client.Service;

import SharedModule.Request;
import SharedModule.Response;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class ClientSendRequest {
	// 如登录、注册、添加好友
    public static Response sendForResponse(Request request) throws IOException, ClassNotFoundException, InterruptedException {
        System.out.println("----------------------");
        //得到输出流
        ObjectOutputStream oos = SingleBuffer.getOos();
        oos.writeObject(request);//输出请求
        oos.flush();
        System.out.println("请求报文发送结束");
        //得到输入流
        ObjectInputStream ois = SingleBuffer.getOis();
        Response response = (Response) ois.readObject();
        System.out.println("获取服务器响应的响应形式为：" + response.getResponseType());
        System.out.println("----------------------");
        return response;
    }
    
    // 如私聊、群聊
    public static void sendNotForResponse(Request request) throws IOException {
        System.out.println("----------------------");
        //得到输出流
        ObjectOutputStream oos = SingleBuffer.getOos();
        oos.writeObject(request);//
        oos.flush();
        System.out.println("请求报文发送结束");
    }
}
