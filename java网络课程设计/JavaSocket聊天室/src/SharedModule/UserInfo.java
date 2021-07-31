/*用户信息*/
package SharedModule;

import java.io.Serializable;

public class UserInfo implements Serializable {
    private static final long serialVersionUID = -7336935779074794422L;
    private String userID;
    private String password;
    private String nickName;
    private Sex sex;
    private String phoneNumber;

    public UserInfo(String nickName, String password, Sex sex, String phoneNumber) {
        this.nickName = nickName;
        this.password = password;
        this.sex = sex;
        this.phoneNumber = phoneNumber;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
    public String getUserID() {
        return userID;
    }
    public String getPassword() {
        return password;
    }
    public String getNickName() {
        return nickName;
    }
    public Sex getSex() {
        return sex;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setUserID(String userID) {
        this.userID = userID;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    public void setSex(Sex sex) {
        this.sex = sex;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

