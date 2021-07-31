#include <winsock2.h>
#include<ws2tcpip.h>
#include <iostream>
#include<algorithm>

using namespace std;
#pragma comment(lib, "Ws2_32.lib")
#define TIMEOUT 1000  //定义超时为1秒

// ICMP 协议头部
typedef struct{
    BYTE type; //类型：8位，1字节
    BYTE code; //代码：8位，1字节
    USHORT cksum; //检验和：16位，2字节
    USHORT id; // 标识符(和报文有关的线程ID)：16位，2字节
    USHORT seq; //序列号：16位，2字节
    unsigned int choose; //选项：32位，4字节
} ICMP_HEADER; //一共12字节

// IP数据报首部固定部分
typedef struct{
    BYTE h_len_ver; //IP版本号和首部长度 1字节
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
typedef struct{
    int seqNum; //记录序列号
    DWORD roundTripTime; //记录当前时间,往返时间
    BYTE ttl; //生存时间
    in_addr scrIpAddr; //源IP地址
} DECODE_RESULT;

// 计算检验和
USHORT CalChecksum(USHORT *pBuffer, int nLen) {
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
boolean DecodePingResponse(char *pBuf, int packetSize, DECODE_RESULT& stDecodeResult) {
    //获取收到的IP数据包的首部信息
    IP_HEADER *pIpHrd = (IP_HEADER*)pBuf; //指向收到应答内容的指针
    int ipHrdLen = 20; //ip数据报首部固定部分20字节
    if (packetSize < (int)(ipHrdLen + sizeof(ICMP_HEADER))) { //ICMP是封装在IP报文的数据部分中发过来的，所以长度是要加上IP首部和ICMP首部的长度
        cout << "应答数据长度有误,数据可能丢失！" << endl;
        return false;
    }

    //指针指向ICMP报文的首地址
    ICMP_HEADER* pIcmpHrd = (ICMP_HEADER*)(pBuf + ipHrdLen);//往后移动了20个字节
    // cout<<pIcmpHrd->type<<","<<pIcmpHrd->code<<","<<pIcmpHrd->cksum<<","<<pIcmpHrd->id<<","<<pIcmpHrd->seq<<","<<pIcmpHrd->choose<<endl;
    USHORT usID, usSeqNum;
    //获得的数据报的type字段为0，即收到一个回显应答ICMP报文
    if (pIcmpHrd->type == 0) {
        usID = pIcmpHrd->id;
        //接受到的是网络字节为seq字段信息，要转换为主机字节顺序
        usSeqNum = ntohs(pIcmpHrd->seq);
    }
    if (usID != GetCurrentProcessId() || usSeqNum != stDecodeResult.seqNum) return false;

    //记录对方主机的IP地址以及计算往返延时RTT
    if (pIcmpHrd->type == 0) {
        stDecodeResult.ttl = pIpHrd->ttl;
        stDecodeResult.scrIpAddr.s_addr = pIpHrd->src_ip;
        stDecodeResult.roundTripTime = (DWORD)GetTickCount64() - stDecodeResult.roundTripTime;
        return true;
    }
    return false;
}

int main(int argc, char** argv) {
    string DestIp;  //结构输入的ip地址或者域名
    int timeSum = 0;   // 总耗时
    int maxTime = 0;   // 最长耗时
    int minTime = 999999;   // 最短耗时
    int recv = 0;    // 收包的数量
    int lost = 0;    // 丢包的数量
    int send = 0;    // 发包的数量
    string IP_show;
    WSADATA wsadata;  //初始化套接字（IP地址：端口号）
    //初始化，否则 gethostbyname 得不到结果
    if (WSAStartup(MAKEWORD(2, 2), &wsadata) != 0) {   //使用2.2版本的Socket
        cout<<"INITIAL  FAILED!!!"<<endl;
    }

    cout << "-------欢迎使用MyPing----------" <<endl;
    cout << "ping >> " ;
    cin >> DestIp;
    cout << endl;

    //internet环境下套接字的地址形式
    sockaddr_in mysock;   /* 定义三个变量 --> 地址簇：sin_family; 16位TCP/UDP端口号：sin_port;  32位IP地址：sin_addr; */

    //将命令行输入的参数转换为IP地址
    u_long ul_DestIP = inet_addr(DestIp.c_str()); //将一个点分十进制的IP转换成网络字节序二进制值
    IP_show = DestIp.c_str();
    if (ul_DestIP == INADDR_NONE) {       //INADDR_NONE:宏定义，代表无效的IP地址
        //转换不成功的时候，使用域名解析,返回一个主机地址结构体，hostent
        hostent *pHostent = gethostbyname(DestIp.c_str());
        //cout << "pHostent"<<pHostent << endl;
        if (pHostent) {
            //从域名服务器取得的主机的地址
            for (int n = 0; pHostent->h_addr_list[n]; n++) {
                memcpy(&mysock.sin_addr.s_addr, pHostent->h_addr_list[n], pHostent->h_length);  //从源source中拷贝n个字节到目标destin中
                IP_show = inet_ntoa(mysock.sin_addr);  //网络字节序地址->标准的点分十进制地址
            }
            ul_DestIP = (*(in_addr*)pHostent->h_addr_list[1]).s_addr;  //将点分十进制构成的ip地址转换成十进制数字后的值
            //cout << "DestIp:" << ul_DestIP << endl;
            cout << "正在 Ping " << pHostent->h_name << " [" << IP_show << "] " << "具有" << " 32 " << "字节的数据：" << endl;
        }

        else {
            cout << "Ping 请求找不到主机" << DestIp << "。请检查输入的地址！" << endl;
            WSACleanup();
            exit(0);
        }
    }

    //填充目的Socket地址
    sockaddr_in destSockAddr; //目的socket地址
    ZeroMemory(&destSockAddr, sizeof(sockaddr_in)); //初始化，用0填充
    destSockAddr.sin_family = AF_INET; //指定地址簇是使用IPv4
    destSockAddr.sin_addr.s_addr = ul_DestIP; //目的IP地址

    //使用ICMP协议创建 RAW Socket
    //WSASocket 创建绑定到特定传输服务提供者的套接字。
    //                          IPV4 , 原始套接字,  ICMP协议 ，           ,指定socket的属性为重叠套接字
    SOCKET sock_raw = WSASocket(AF_INET, SOCK_RAW, IPPROTO_ICMP, NULL, 0, WSA_FLAG_OVERLAPPED);
    if (sock_raw == INVALID_SOCKET) { 
        cout << "Create Socket Defeat!" << endl;
        return 0;
    }

    /*设置超时阻止
        setsockopt函数(设置与某个套接字关联的选项)的参数:  
        s : 套接字标识符描述
        level : 定义选项的级别
        optname : 设置的套接字选项，其值必须在套接字级别内
        optval: 指向缓冲区的指针
        optlen: 指针指向的缓冲区的大小 */
    int timeout = TIMEOUT;//设置超时为1秒

    //设定套接字的超时时间，防止接收和发送消息的时候阻塞，使得程序不能进行
    //设置接收时限（以毫秒为单位）
    if (setsockopt(sock_raw, SOL_SOCKET, SO_RCVTIMEO, (char*)&timeout, sizeof(timeout)) == SOCKET_ERROR) {
        cout<<"setsockopt SO_RCVTIMEO error!"<<endl;
        return 0;
    }
    //设置发送时限（以毫秒为单位）。
    if (setsockopt(sock_raw, SOL_SOCKET, SO_SNDTIMEO, (char*)&timeout, sizeof(timeout)) == SOCKET_ERROR) {
        cout<<"setsockopt SO_SNDTIMEO error!"<<endl; 
        return 0;
    }

    //定义发送的数据包
    char IcmpSendPacket[32];  //32个字节 用来放发送的ICMP数据报的信息
    // 填充ICMP数据包的各个字段
    // 类型8，代码0：表示回显请求(ping请求)。
    // 类型0，代码0：表示回显应答(ping应答)
    ICMP_HEADER *pIcmpHeader = (ICMP_HEADER*)IcmpSendPacket;
    pIcmpHeader->type = 8;//回显请求类型8
    pIcmpHeader->code = 0;
    pIcmpHeader->id = (USHORT)GetCurrentProcessId(); //获取一下当前进程的 id 用于后面判断该icmp 应答是不是给当前进程的。
    memset(IcmpSendPacket + sizeof(ICMP_HEADER), 'w', 20);//按字节对内存块进行初始化，跳过ICMP头部，初始化数据字段。

    //循环发送4个icmp请求回显数据报
    DECODE_RESULT stDecodeResult;
    for (int i = 0; i <= 3; i++) {
        //seq和cksum 两个参数每次都要变
        pIcmpHeader->seq = htons(i); //htons 把整数转换为网络字节序
        pIcmpHeader->cksum = 0; //本身也参与运算
        // pIcmpHeader->cksum = CalChecksum((USHORT*)IcmpSendBuf,sizeof(ICMP_HEADER)+20);
        pIcmpHeader->cksum = CalChecksum((USHORT*)IcmpSendPacket, sizeof(IcmpSendPacket));

        //记录序列号和当前时间
        stDecodeResult.seqNum = i;
        stDecodeResult.roundTripTime = (DWORD)GetTickCount64();

        /*发送ICMP 的 EchoRequset 数据包 即请求报文
        sendto函数参数：
                s 套接字
                buff 待发送数据的缓冲区
                size 缓冲区长度
                Flags 调用方式标志位, 一般为0, 改变Flags，将会改变Sendto发送的形式
                addr （可选）指针，指向目的套接字的地址
                len   addr所指地址的长度
        */
        if (sendto(sock_raw, IcmpSendPacket, sizeof(IcmpSendPacket), 0, (sockaddr*)&destSockAddr, sizeof(destSockAddr)) == SOCKET_ERROR) {
            cout << "Send error!" << WSAGetLastError()<< endl;
            exit(0);         
        }
        // 发包成功
        send++;

        //接受返回的ICMP回显应答
        char IcmpRecvPacket[1024];
        sockaddr_in from_add; //接受到的数据报地址
        int iFromLen = sizeof(from_add);
        int iReadLen;
        int t; //消耗的时间
        
        while (1) {
            /*recvfrom 函数
                sockfd：标识一个已连接套接口的描述字。
                buf：接收数据缓冲区。
                len：缓冲区长度。
                flags：调用操作方式。
                from：（可选）指针，指向装有源地址的缓冲区。
                fromlen：（可选）指针，指向from缓冲区长度值。
            */
            iReadLen = recvfrom(sock_raw, IcmpRecvPacket, 1024, 0, (sockaddr*)&from_add, &iFromLen);
            if (iReadLen != SOCKET_ERROR) {
                //判断是不是发给本进程的ICMP报文，如果是就打印信息
                if (DecodePingResponse(IcmpRecvPacket, sizeof(IcmpRecvPacket), stDecodeResult)) {
                    printf("来自 %s 的回复: 字节 = %d 时间 = %dms TTL = %d\n", inet_ntoa(stDecodeResult.scrIpAddr), iReadLen - 20, stDecodeResult.roundTripTime, stDecodeResult.ttl);
                    // 更新最长最短时间
                    t = stDecodeResult.roundTripTime;
                    if (t > maxTime) {
                        maxTime = t;
                    }
                    if (t < minTime) {
                        minTime = t;
                    }
                    timeSum += stDecodeResult.roundTripTime;
                    recv++;
                }
                break;
            }
            else if (WSAGetLastError() == WSAETIMEDOUT) {
                cout << "请求超时!" << endl;
                lost++;
                break;
            }
            else {
                cout << "Unknown Error!" << endl;
                lost++;
                break;
            }
        }
    }
    //输出信息
    cout << "\nPing complete. \n" << endl;
    cout << IP_show << " 的 Ping 统计信息:" << endl;
    cout << "    数据包: 已发送 = " << send << "，已接收 = " << recv << "，丢失 = " << lost << "(" << (lost/send)*100 <<"%)"<< endl;
    if (recv != 0) {
        cout << "往返行程的估计时间(以毫秒为单位):" << endl;
        cout << "    最短 = " << minTime << "ms，最长 = " << maxTime << "ms，平均 = " << (int)(timeSum / 4) << "ms" << endl;
    }
    closesocket(sock_raw);
    WSACleanup();   //清理网络环境,释放socket所占的资源
    return 0;
}