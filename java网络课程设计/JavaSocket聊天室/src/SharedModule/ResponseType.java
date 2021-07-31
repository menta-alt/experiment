package SharedModule;

public enum ResponseType {
	//登陆成功
    SUCCESS_SIGN_IN,
    //用户名错误
    WRONG_ID,
    //密码错误
    WRONG_PWD,
    //昵称已被使用
    NICKNAME_EXIST,
    //注册成功
    SUCCESS_SIGN_UP,
    //添加成功
    SUCCESS_ADD,
    //重复登陆
    SECOND_LOGIN,
    //系统群发
    SYSTEM_NOTICE,
    //强制下线
    FORCED_OFFLINE,
    //消息发送
    SEND_MESSAGE,
    //好友下线
    FRIEND_LOGOUT,
    //好友上线
    FRIEND_LOGIN,
    //添加好友
    ADD_FRIEND
}
