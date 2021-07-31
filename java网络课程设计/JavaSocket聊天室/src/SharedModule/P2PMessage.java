package SharedModule;

import java.io.Serializable;
import java.util.Calendar;

public class P2PMessage implements Serializable,Comparable{
    private static final long serialVersionUID = 4360862954918703825L;
    private String sendUserID;
    private String receiveUserID;
    private Calendar sendTime;
    private String content;

    public P2PMessage(String sendUserID, String receiveUserID, String content){
        this.sendUserID = sendUserID;
        this.receiveUserID = receiveUserID;
        this.content = content;
        this.sendTime = Calendar.getInstance();
    }

    @Override
    public int compareTo(Object o) {
        return this.sendTime.compareTo(((P2PMessage) o).getSendTime());
    }
    public String getSendUserID() {
        return sendUserID;
    }
    public String getReceiveUserID() {
        return receiveUserID;
    }
    public Calendar getSendTime() {
        return sendTime;
    }
    public String getContent() {
        return content;
    }
    @Override
    public String toString(){
        return sendUserID + "(" + sendTime.getTime() + "):\n" + content + "\n";
    }
}
