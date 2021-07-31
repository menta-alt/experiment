#include <winsock2.h>   
#include<ws2tcpip.h>
#include <iostream>
#include <iomanip>

using namespace std;

#pragma comment(lib, "Ws2_32.lib")
#define TIMEOUT 3000  //定义超时为3秒


// ICMP 协议头部
typedef struct {
    BYTE type; //类型：8位，1字节
    BYTE code; //代码：8位，1字节
    USHORT cksum; //检验和：16位，2字节
    USHORT id; // 标识符(和报文有关的线程ID)：16位，2字节
    USHORT seq; //序列号：16位，2字节
    unsigned int choice; //选项：32位，4字节
} ICMP_HEADER; //一共12字节

// IP数据报首部固定部分
typedef struct {
    char hdr_len : 4;//4位头部长度
    char version : 4;//长度版本号
    BYTE tos; // 服务类型  1字节
    USHORT total_len; //IP报文总长度，2字节
    USHORT identifier; // 标识符，2字节
    USHORT frag_and_flags; //3位标志加13位片偏移，2字节
    BYTE ttl; //生存时间，最大跳数 1字节
    BYTE proto; //协议 1字节
    USHORT cksum; //IP首部校验和，2字节
    unsigned long src_ip; //源IP地址 4字节
    unsigned long dst_ip; //目的IP地址 4字节
} IP_HEADER; //一共20字节

// 解包
typedef struct {
    int seqNum; //记录序列号
    DWORD roundTripTime; //记录当前时间,往返时间
    BYTE ttl; //生存时间
    in_addr scrIpAddr; //源IP地址
} DECODE_RESULT;

// 计算检验和
USHORT CalChecksum(USHORT* pBuffer, int nLen) {
    unsigned long cksum = 0;

    // 把需要校验的数据看成以16位为单位的数字组成，依次进行二进制反码求和
    while (nLen > 1) {
        cksum += *pBuffer++;//把待校验的数据每16位逐位相加保存在cksum中
        nLen -= sizeof(USHORT); //每16位加完则将待校验数据减16
    }
    //因为计算时是16位为单位，所以如果待校验数据是奇数个字节，此时计算校验和时需要在最后增加一个填充字节0，
    //如果待校验数据是奇数个字节， 则循环完后，需要将最后一个字节的内容与之前结果相加
    if (nLen)//每次iSize-sizeof（USHORT） 其实就是减16
        cksum += *(UCHAR*)pBuffer;
    //之前的结果产生了进位，需要把进位也加入到最后的结果中 0xffff 就是全1
    //高位有进位，进位到低位，下面两行代码保证了高16位为0
    cksum = (cksum >> 16) + (cksum & 0xffff);
    cksum += (cksum >> 16);

    return (USHORT)(~cksum);
}

//对ping应答信息进行解析
BOOL DecodeIcmpResponse(char* pBuf, int packetSize, DECODE_RESULT& stDecodeResult) {
    //获取收到IP数据包的首部信息
    IP_HEADER* pIpHrd = (IP_HEADER*)pBuf; //指向收到应答内容的指针
    int ipHrdLen = pIpHrd->hdr_len * 4; //ip报头以四字节为单位。
    if (packetSize < (int)(ipHrdLen + sizeof(ICMP_HEADER))) { //ICMP是封装在数据报中发过来的，所以长度是要加上IP首部和ICMP首部的长度
        cout << "应答数据长度有误" << endl;  return false;
    }

    //指针指向ICMP报文的首地址
    ICMP_HEADER* pIcmpHrd = (ICMP_HEADER*)(pBuf + ipHrdLen);//往后移动了20个字节
    USHORT usID, usSeqNum;
    if (pIcmpHrd->type == 0) {
        usID = pIcmpHrd->id;
        usSeqNum = pIcmpHrd->seq;
    }
    //ICMP超时差错报文,内包含源地址，以及IP数据包的路由信息
    else if (pIcmpHrd->type == 11) {//超时传输
        //载荷中的IP头
        char* pInnerIpHdr = pBuf + ipHrdLen + sizeof(ICMP_HEADER);
        //载荷中的IP头长
        int iInnerIPHdrLen = ((IP_HEADER*)pInnerIpHdr)->hdr_len * 4;
        //载荷中的ICMP头
        ICMP_HEADER* pInnerIcmpHdr = (ICMP_HEADER*)(pInnerIpHdr + iInnerIPHdrLen);
        //报文ID
        usID = pInnerIcmpHdr->id;
        //序列号
        usSeqNum = pInnerIcmpHdr->seq;
    }
    else
        return false;

    if (usID != (USHORT)GetCurrentProcessId() || usSeqNum != stDecodeResult.seqNum) return false;

    //处理正确收到的ICMP报文
    if (pIcmpHrd->type == 0 || pIcmpHrd->type == 11) {
        //返回解码结果
        stDecodeResult.scrIpAddr.s_addr = pIpHrd->src_ip;
        stDecodeResult.roundTripTime = GetTickCount64() - stDecodeResult.roundTripTime;

        //打印屏幕信息：
        if (stDecodeResult.roundTripTime) {
            cout << "\t" << stDecodeResult.roundTripTime << "ms" << flush;
        }
        else
            cout << "\t" << "1ms" << flush;

        return true;
    }
    return false;
}

int main(int argc, char** argv) {
    string DestIp;  //结构输入的ip地址或者域名

    cout << "-------欢迎使用MyTracert----------" << endl;
    cout << "tracert >> ";
    cin >> DestIp;

    //初始化套接字
    WSADATA wsadata;
    if (WSAStartup(MAKEWORD(2, 2), &wsadata) != 0)
        cout << "INITIAL  FAILED!!!" << endl;

    sockaddr_in mysock;   /*结构体 定义一下三个变量 --> 地址簇：sin_family;     16位TCP/UDP端口号：sin_port;    32位IP地址：sin_addr; */
    string IP_show;
    string domain_name;   //域名

    //将字符串形式的IP地址转化为程序中方便操作的u_long类型
    u_long ulDestIP = inet_addr(DestIp.c_str()); //将一个点分十进制的IP转换成一个长整数型数

    if (ulDestIP == INADDR_NONE) {          //INADDR_NONE 一个宏定义，代表无效的IP地址
        //转换不成功的时候，使用域名解析,返回一个主机地址结构体，hostent
        hostent* pHostent = gethostbyname(DestIp.c_str());
        if (pHostent) {
            memcpy(&mysock.sin_addr.s_addr, pHostent->h_addr_list[0], pHostent->h_length);
            IP_show = inet_ntoa(mysock.sin_addr);
            domain_name = DestIp.c_str();
            ulDestIP = (*(in_addr*)pHostent->h_addr_list[0]).s_addr;
        }
        else {
            cout << "无法解析目标系统名称 " << DestIp << "，请检查输入的地址！" << endl;
            WSACleanup();
            return 0;
        }
    }

    // 判断输入的是域名还是IP地址
    cout << " " << endl;
    if (empty(domain_name)) {
        cout << "通过最多30个跃点跟踪到 " << IP_show << " 的路由:" << endl;
    }
    else
        cout << "通过最多30个跃点跟踪到 " << domain_name << " [" << IP_show << "] 的路由:" << endl;
    cout << " " << endl;

    //填充目的Socket地址
    sockaddr_in destSockAddr; //目的socket地址
    ZeroMemory(&destSockAddr, sizeof(sockaddr_in)); //初始化，用0填充
    destSockAddr.sin_family = AF_INET; //指定地址簇是使用IPv4
    destSockAddr.sin_addr.s_addr = ulDestIP; //目的IP地址

    //使用ICMP协议创建 RAW Socket
    //WSASocket 创建绑定到特定传输服务提供者的套接字。
    //                          IPV4 ,原始套接字,   ICMP协议 ，   ，，指定socket的属性为重叠套接字
    SOCKET sockRaw = WSASocket(AF_INET, SOCK_RAW, IPPROTO_ICMP, NULL, 0, WSA_FLAG_OVERLAPPED);
    if (sockRaw == INVALID_SOCKET) { 
        cout << "Create Socket Defeat！" << endl; 
        return 0; 
    }

    /*设置超时阻止
    setsockopt函数的参数
    s : 套接字标识符描述
    level : 定义选项的级别
    optname : 设置的套接字选项，其值必须在套接字级别内
    optval: 指向缓冲区的指针
    optlen: 指针指向的缓冲区的大小 */
    int timeout = TIMEOUT;//设置超时为3秒
    //阻止接收呼叫超时（以毫秒为单位）
    if (setsockopt(sockRaw, SOL_SOCKET, SO_RCVTIMEO, (char*)&timeout, sizeof(timeout)) == SOCKET_ERROR) {
        cout << "setsockopt SO_RCVTIMEO error" << endl;
        return 0;
    }
    //阻止发送呼叫超时（以毫秒为单位）。
    if (setsockopt(sockRaw, SOL_SOCKET, SO_SNDTIMEO, (char*)&timeout, sizeof(timeout)) == SOCKET_ERROR) {
        cout << "setsockopt SO_SNDTIMEO error" << endl;
        return 0;
    }

    //定义发送的数据包
    char IcmpSendBuf[sizeof(ICMP_HEADER) + 32];//32个字节 用来放发送的ICMP数据报的信息 ，一个字节8位
    //填充ICMP数据包的各个字段
    // 类型8，代码0：表示回显请求(ping请求)。
    // 类型0，代码0：表示回显应答(ping应答)
    //memset(IcmpSendBuf, 0, sizeof(IcmpSendBuf));
    ICMP_HEADER* pIcmpHeader = (ICMP_HEADER*)IcmpSendBuf;
    pIcmpHeader->type = 8; //报文类型：回显请求类型8
    pIcmpHeader->code = 0;
    pIcmpHeader->id = (USHORT)GetCurrentProcessId(); //获取当前进程的 id 用于后面判断该icmp 应答是不是给当前进程的。
    memset(IcmpSendBuf + sizeof(ICMP_HEADER), 'E', 32);//按字节对内存块进行初始化，跳过ICMP头部，初始化数据字段。

    //最多通过30个越点来跟踪路由
    bool quit_flag = false; //退出循环标志
    int max_hop = 30; //设置最多跳的栈数；
    int TTL = 1; //初始的存活时间为1 
    USHORT usSeqNo = 0; //报文序列号
    DECODE_RESULT DecodeResult;

    while (!quit_flag && max_hop--) {
        //设置ttl
        setsockopt(sockRaw, IPPROTO_IP, IP_TTL, (char*)&TTL, sizeof(TTL));
        cout << TTL << flush; //输出当前是第几跳
        //每一次请求3次
        int request_count = 0;  // 发三次请求打印*的数量
        for (int i = 0; i < 3; i++) {
            //seq和cksum 两个参数每次都要变
            pIcmpHeader->seq = htons(usSeqNo++); //htons 把整数转换为网络字节序
            pIcmpHeader->cksum = 0; //本身也参与运算
            pIcmpHeader->cksum = htons(CalChecksum((USHORT*)IcmpSendBuf, sizeof(ICMP_HEADER) + 32));

            //记录序列号和当前时间
            DecodeResult.seqNum = ((ICMP_HEADER*)IcmpSendBuf)->seq; ;
            DecodeResult.roundTripTime = GetTickCount64();
            
            // 发送请求
            if (sendto(sockRaw, IcmpSendBuf, sizeof(ICMP_HEADER)+32, 0, (sockaddr*)&destSockAddr, sizeof(destSockAddr)) == SOCKET_ERROR) {
                if (WSAGetLastError() == WSAEHOSTUNREACH) {
                    cout << "主机不可达" << endl;
                    exit(0);
                }
            }

            //接受返回的ICMP回显应答
            char IcmpRecvBuf[1024];
            memset(IcmpRecvBuf, 0, sizeof(IcmpRecvBuf));
            sockaddr_in from; //接受到的数据报地址
            int fromLen = sizeof(from);
            int recvlen;  //接收到的数据的字节数
            while (1) {
                /*recvfrom 函数
                    sockfd：标识一个已连接套接口的描述字。
                    buf：接收数据缓冲区。
                    len：缓冲区长度。
                    flags：调用操作方式。
                    from：（可选）指针，指向装有源地址的缓冲区。
                    fromlen：（可选）指针，指向from缓冲区长度值。
                */
                recvlen = recvfrom(sockRaw, IcmpRecvBuf, 1024, 0, (sockaddr*)&from, &fromLen);
                if (recvlen != SOCKET_ERROR) {
                    //判断是不是发给本进程的ICMP报文，如果是就打印信息
                    if (DecodeIcmpResponse(IcmpRecvBuf, recvlen, DecodeResult)) {
                        //到达目的地，标记finash_loop =true;
                        if (DecodeResult.scrIpAddr.s_addr == destSockAddr.sin_addr.s_addr) {
                            quit_flag = true;
                        }
                        break;
                    }
                }
                else if (WSAGetLastError() == WSAETIMEDOUT) {
                    cout << "\t" << '*' << flush;
                    request_count++;
                    break;
                }
            }
        }
        if (request_count == 3) {
            cout << "\t" << "请求超时" << endl;
        }
        else {
            cout << "\t" << inet_ntoa(DecodeResult.scrIpAddr) << endl;
        }
        TTL++;
    }
    cout << "跟踪完成" << endl;
    closesocket(sockRaw);
    WSACleanup();
    return 0;
}