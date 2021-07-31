package SharedModule;

import java.io.Serializable;

public enum RequestType implements Serializable {
    //登录
    SIGN_IN,
    //注册
    SIGN_UP,
    //发消息
    SEND_MESSAGE,
    //下线
    LOG_OUT,
    //添加好友
    ADD_FRIEND
}
