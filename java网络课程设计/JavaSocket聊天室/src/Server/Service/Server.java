package Server.Service;

import SharedModule.*;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.io.*;
import java.net.Socket;
import java.util.*;

public class Server {
    private HashMap<String, UserInfo> regUsersInfo = new HashMap<>(200); //已注册用户信息
    private HashSet<String> usedNickname = new HashSet<>(200); //已使用用户昵称
    private final HashMap<String, ClientIO> onlineUserIO = new HashMap<>(); //在线用户及其TCP套接字的输入输出流
    private HashMap<String, ArrayList<UserInfo>> friendShip = new HashMap<>(); //好友关系 用户ID-用户信息
    private DefaultTableModel onlineUsersTableModel; //服务器在线用户显示表格数据
    private JTextArea feedbackArea;
    public Server() throws IOException {
        loadServerData();  //加载数据
    }
    //处理客户端请求
    public void processRequest(Socket curSocket){
        try{
            ObjectInputStream ois = new ObjectInputStream(curSocket.getInputStream());
            ObjectOutputStream oos = new ObjectOutputStream(curSocket.getOutputStream());
            ClientIO userIO = new ClientIO(ois, oos);
            boolean flag = true;
            while(flag){ //不停地读取客户端发过来的请求对象
                //从请求输入流中读取到客户端提交的请求对象
                Request clientRe = (Request) ois.readObject();
                System.out.println("------------------");
                System.out.println("Server读取了客户端的请求,请求形式 = " + clientRe.getAction());
                switch (clientRe.getAction()) {
                    case SIGN_IN:
                        System.out.println("处理登录");
                        dealSignIn(clientRe, userIO);
                        break;
                    case SIGN_UP:
                        System.out.println("处理注册");
                        dealSignUp(clientRe, userIO);
                        break;
                    case SEND_MESSAGE:
                        System.out.println("处理消息发送");
                        dealSendMessage(clientRe);
                        break;
                    case LOG_OUT:
                        System.out.println("处理用户下线");
                        dealLogout(clientRe, userIO);
                        flag = false;//用户下线，停止读取输入
                        break;
                    case ADD_FRIEND:
                        System.out.println("处理添加好友");
                        dealAddFriend(clientRe, userIO);
                        break;
                }
                System.out.println("------------------");
            }
        }catch(Exception ignore){
            ignore.printStackTrace();
        }
    }
    
    //处理登录
    public void dealSignIn(Request clientRequest, ClientIO userIO) throws IOException {
        String userID = (String) clientRequest.getDataByKey("userID");
        String password = (String) clientRequest.getDataByKey("password");
        Response response;
        if (!regUsersInfo.containsKey(userID)){  //用户名不存在
            response = new Response(ResponseStatus.OK, ResponseType.WRONG_ID);
            sendResponse(response, userIO.getOos());//发送响应
        } else if (!regUsersInfo.get(userID).getPassword().equals(password)){  //密码不正确
            response = new Response(ResponseStatus.OK, ResponseType.WRONG_PWD);
            sendResponse(response, userIO.getOos());
        } else if(onlineUserIO.containsKey(userID)) { //重复登录
            response = new Response(ResponseStatus.OK, ResponseType.SECOND_LOGIN);
            sendResponse(response, userIO.getOos());
        } else{   //登陆成功
            System.out.println("登录成功");
            response = new Response(ResponseStatus.OK, ResponseType.SUCCESS_SIGN_IN);
            response.addData("userInfo", regUsersInfo.get(userID));  //返回用户信息
            ArrayList<UserInfo> friends = friendShip.get(userID);
            response.addData("userFriends", friends);  //返回用户好友列表
            
            //获得在线用户列表
            ArrayList<UserInfo> onlineFriends = new ArrayList<>();
            if (friends != null) {
                for (UserInfo curUser : friends) 
                    if (onlineUserIO.containsKey(curUser.getUserID())) 
                        onlineFriends.add(curUser);
            }
            response.addData("userOnlineFriends", onlineFriends);  //返回用户在线好友列表
            System.out.println("数据加载完成");
            sendResponse(response, userIO.getOos());//发送响应
            System.out.println("发送成功");
            onlineUserIO.put(userID, userIO);//向在线用户IO Map中添加该用户的输入输出流
            addUserToOnlineUsersTable(userID, regUsersInfo.get(userID).getNickName());//更新服务器在线用户显示

            //通知所有在线好友，该用户上线
            response = new Response(ResponseStatus.OK, ResponseType.FRIEND_LOGIN);
            response.addData("userInfo", regUsersInfo.get(userID));
            if (friends != null) {
                for (UserInfo receiveUser : friends) 
                    if (onlineUserIO.containsKey(receiveUser.getUserID()))
                        sendResponse(response, onlineUserIO.get(receiveUser.getUserID()).getOos());
            }
        }
        System.out.println("服务器端完成处理登录");
    }
    
    //处理注册
    public void dealSignUp(Request clientRequest, ClientIO userIO) throws IOException{
        UserInfo user = (UserInfo) clientRequest.getDataByKey("user");
        if (usedNickname.contains(user.getNickName())){//昵称已经存在
            Response response = new Response(ResponseStatus.OK, ResponseType.NICKNAME_EXIST);
            ObjectOutputStream oos = userIO.getOos();
            sendResponse(response, oos);  //发送响应
        }else {
            synchronized (this.regUsersInfo) {  //加锁
                Calendar c = Calendar.getInstance();
                String userID;
                //生成随机账号
                do {
                    StringBuilder account = new StringBuilder();
                    account.append(String.valueOf(c.get(Calendar.YEAR)), 2, 4);
                    account.append(c.get(Calendar.MONTH) + 1);
                    account.append(c.get(Calendar.DATE));
                    account.append(c.get(Calendar.HOUR));
//                    sb.append(c.get(Calendar.MINUTE));
//                    sb.append(c.get(Calendar.SECOND));
                    account.append(new Random().nextInt(1000));
                    userID = account.toString();
                } while (regUsersInfo.containsKey(userID));
                //设置账号
                user.setUserID(userID);
                System.out.println("生成账号为：" + userID);
                regUsersInfo.put(userID, user); //添加到已注册用户
                usedNickname.add(user.getNickName()); //添加到已使用nickname
                friendShip.put(userID, new ArrayList<>());//创建空好友关系
                Response response = new Response(ResponseStatus.OK, ResponseType.SUCCESS_SIGN_UP);
                response.addData("userID", userID);
                ObjectOutputStream oos = userIO.getOos();
                sendResponse(response, oos);//发送响应
                System.out.println("服务器端完成处理注册");
            }
        }
    }
    
    //处理消息发送
    public void dealSendMessage(Request clientRequest) throws IOException {
        Object msg = clientRequest.getDataByKey("msg");
        Response response = new Response(ResponseStatus.OK, ResponseType.SEND_MESSAGE);
        response.addData("msg", msg);
        if (msg instanceof GroupMessage){  //群发消息
            for(Map.Entry<String, ClientIO> receiveUser : onlineUserIO.entrySet())  //向所有在线用户发送响应
                if (!receiveUser.getKey().equals(((GroupMessage) msg).getSendUserID()))  //不包括自己，Map.Entry是Map声明的一个内部接口，此接口为泛型，定义为Entry<K,V>
                    sendResponse(response, receiveUser.getValue().getOos()); 
            feedbackArea.append("--------群消息--------\n");
            feedbackArea.append(msg.toString());
            feedbackArea.append("---------------------\n");
        } else if(msg instanceof P2PMessage){	//私聊消息
            String receiveUserID = ((P2PMessage) msg).getReceiveUserID();
            sendResponse(response, onlineUserIO.get(receiveUserID).getOos());//向私聊对象发送响应
        }
    }
    
    //服务端发送响应数据
    public void sendResponse(Response response, ObjectOutputStream oos) throws IOException {
        oos.writeObject(response);  //将对象写入流中
        oos.flush();  //刷新流
    }
    
    //处理用户下线
    public void dealLogout(Request clientRequest, ClientIO userIO) throws IOException{
        String logoutUserID = (String) clientRequest.getDataByKey("userID");
        UserInfo userInfo = regUsersInfo.get(logoutUserID);
        System.out.println("ID为" + userInfo.getUserID() + "的用户下线");
        onlineUserIO.remove(userInfo.getUserID());//把当前上线客户端的IO从Map中删除
        userIO.getOos().close();
        userIO.getOis().close();
        removeUserFromOnlineUsersTable(userInfo.getUserID());

        Response response = new Response(ResponseStatus.OK, ResponseType.FRIEND_LOGOUT);
        response.addData("userInfo", userInfo);
        //获取所有的在线好友，该用户下线
        ArrayList<UserInfo> friends = friendShip.get(userInfo.getUserID());
        if (friends != null) {
            for (UserInfo user : friends) 
                if (onlineUserIO.containsKey(user.getUserID()))  //当前好友在线,则通知该好友
                    sendResponse(response, onlineUserIO.get(user.getUserID()).getOos());
        }
    }
    
    //处理添加好友
    public void dealAddFriend(Request clientRequest, ClientIO userIO) throws IOException {
        String userID = (String) clientRequest.getDataByKey("userID");
        String fromUserID = (String) clientRequest.getDataByKey("fromUserID");
        Response response;
        if (!regUsersInfo.containsKey(userID)){//没有此用户
            response = new Response(ResponseStatus.OK, ResponseType.WRONG_ID);
            sendResponse(response, userIO.getOos());
        } else {
        	friendShip.get(userID).add(regUsersInfo.get(fromUserID));
        	friendShip.get(fromUserID).add(regUsersInfo.get(userID));
            //向请求方回应
            response = new Response(ResponseStatus.OK, ResponseType.SUCCESS_ADD);
            response.addData("userInfo", regUsersInfo.get(userID));
            response.addData("isOnline", onlineUserIO.containsKey(userID));
            sendResponse(response, userIO.getOos());
            //通知被添加方
            if (onlineUserIO.containsKey(userID)) {
                response = new Response(ResponseStatus.OK, ResponseType.ADD_FRIEND);
                response.addData("userInfo", regUsersInfo.get(fromUserID));
                sendResponse(response, onlineUserIO.get(userID).getOos());
            }
        }
    }
    
    //强制下线
    public void removeUser(String userID) throws IOException{
        Response response = new Response(ResponseStatus.OK, ResponseType.FORCED_OFFLINE);
        response.addData("notice", "系统通知：您被强制下线！");
        ObjectOutputStream oos = onlineUserIO.get(userID).getOos();
        sendResponse(response, oos);//发送响应
        onlineUserIO.remove(userID);//把当前上线客户端的IO从Map中删除
        response = new Response(ResponseStatus.OK, ResponseType.FRIEND_LOGOUT);
        response.addData("userInfo", regUsersInfo.get(userID));
        //获取所有的在线好友，该用户下线
        ArrayList<UserInfo> friends = friendShip.get(userID);
        if (friends != null) {
            for (UserInfo user : friends) 
                if (onlineUserIO.containsKey(user.getUserID()))  //当前好友在线,则通知该好友
                    sendResponse(response, onlineUserIO.get(user.getUserID()).getOos());
        }
    }
    
    //群发系统消息
    public void massTexting(String sysMessage, JTextArea feedbackArea) throws IOException {
        Response response = new Response(ResponseStatus.OK, ResponseType.SYSTEM_NOTICE);
        response.addData("notice", sysMessage);
        for (Map.Entry<String, ClientIO> user : onlineUserIO.entrySet())
            sendResponse(response, user.getValue().getOos());    
        feedbackArea.append("-------服务器群发-------\n");
        feedbackArea.append("群发成功，共向" + onlineUserIO.size() + "个在线用户发送系统消息。\n");
        feedbackArea.append("----------------------\n");
    }
    
    //保存当前服务器数据
    public void saveServerData(){
        File file = new File("D:\\Eclipse\\JavaSocket聊天室\\src\\Server\\Service\\database.dat");
        FileOutputStream out;
        try {
            out = new FileOutputStream(file);
            ObjectOutputStream objOut = new ObjectOutputStream(out);
            objOut.writeObject(regUsersInfo);
            objOut.writeObject(usedNickname);
            objOut.writeObject(friendShip);
            objOut.writeObject(null);
            objOut.flush();
            objOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    //加载服务器数据
    private void loadServerData(){
        File file = new File("D:\\Eclipse\\JavaSocket聊天室\\src\\Server\\Service\\database.dat");
        try{
            FileInputStream in = new FileInputStream(file);
            ObjectInputStream objIn = new ObjectInputStream(in);
            regUsersInfo = (HashMap) objIn.readObject();//已注册用户信息
            usedNickname = (HashSet)objIn.readObject();//已使用用户昵称
            friendShip = (HashMap) objIn.readObject();//好友关系
            objIn.close();
            in.close();
        } catch (ClassNotFoundException |IOException ignore) {
        }
        if (regUsersInfo == null)
            regUsersInfo = new HashMap<>();   
        if (usedNickname == null)
            usedNickname = new HashSet<>();
        if (friendShip == null)
        	friendShip = new HashMap<>();
    }
    
    //用户离线，从在线用户表视图中移除用户
    private void removeUserFromOnlineUsersTable(String userID){
        Vector vector = onlineUsersTableModel.getDataVector();
        int size = vector.size();
        int targetRowIndex = -1;
        for (int i = 0; i < size; i++) {
            Vector user = (Vector) vector.get(i);
            if (user.get(0).equals(userID)) {
                targetRowIndex = i;
                break;
            }
        }
        onlineUsersTableModel.removeRow(targetRowIndex);
    }
    
    //向在线用户表视图中添加用户
    private void addUserToOnlineUsersTable(String userID, String nickname){
        onlineUsersTableModel.addRow(new String[]{userID, nickname});
    }
    public void setOnlineUsersTableModel(DefaultTableModel onlineUsersTableModel) {
        this.onlineUsersTableModel = onlineUsersTableModel;
    }
    public void setFeedbackArea(JTextArea feedbackArea) {
        this.feedbackArea = feedbackArea;
    }
}
