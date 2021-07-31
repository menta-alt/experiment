#include<iostream>
#include<WinSock2.h>
#include<WS2tcpip.h>
using namespace std;

#define TIMEOUT 3000  //定义超时为3秒
//创建ICMP报文头部结构体
#pragma comment( lib, "ws2_32.lib" )   

const int ICMP_DATA_SIZE = 32;
const int MAX_ICMP_PACKET_SIZE = 1024;
const int ICMP_TIMEOUT = 11;

typedef struct {
	BYTE type; //类型：8位，1字节
	BYTE code; //代码：8位，1字节
	USHORT cksum; //检验和：16位，2字节
	USHORT id; // 标识符(和报文有关的线程ID)：16位，2字节
	USHORT seq; //序列号：16位，2字节
}ICMP_HEADER;

//IP报头
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
	//BYTE ttl; //生存时间
	in_addr scrIpAddr; //源IP地址
}DECODE_RESULT;


//计算网际校验和函数
unsigned short checkSum(char* pBuffer, int nLen)
{
	unsigned short nWord;
	unsigned int nSum = 0;
	int i;

	//Make 16 bit words out of every two adjacent 8 bit words in the packet
	//and add them up
	for (i = 0; i < nLen; i = i + 2)
	{
		nWord = ((pBuffer[i] << 8) & 0xFF00) + (pBuffer[i + 1] & 0xFF);
		nSum = nSum + (unsigned int)nWord;
	}

	//Take only 16 bits out of the 32 bit sum and add up the carries
	while (nSum >> 16)
	{
		nSum = (nSum & 0xFFFF) + (nSum >> 16);
	}

	//One's complement the result
	nSum = ~nSum;

	return ((unsigned short)nSum);
}

BOOL DecodeIcmpResponse(char* pBuf, int iPacketSize, DECODE_RESULT& DecodeResult, BYTE ICMP_ECHO_REPLY, BYTE  ICMP_TIMEOUT)
{
	IP_HEADER* piphdr = (IP_HEADER*)pBuf;
	int iphdrlen = piphdr->hdr_len * 4;		//IP数据报的首部长度
	if (iPacketSize < (int)(iphdrlen + sizeof(ICMP_HEADER)))
		return FALSE;

	ICMP_HEADER* ptr_icmp = (ICMP_HEADER*)(pBuf + iphdrlen);
	USHORT usID, usSquNo;
	if (ptr_icmp->type == ICMP_ECHO_REPLY)
	{
		usID = ptr_icmp->id;
		usSquNo = ptr_icmp->seq;
	}
	else if (ptr_icmp->type == ICMP_TIMEOUT)
	{
		char* innerip = pBuf + iphdrlen + sizeof(ICMP_HEADER);
		int inneriplen = ((IP_HEADER*)innerip)->hdr_len * 4;
		ICMP_HEADER* innericmp = (ICMP_HEADER*)(innerip + inneriplen);
		usID = innericmp->id;
		usSquNo = innericmp->seq;
	}
	else
		return false;


	if (usID != (USHORT)GetCurrentProcessId() || usSquNo != DecodeResult.seqNum)
		return false;

	DecodeResult.scrIpAddr.S_un.S_addr = piphdr->src_ip;
	DecodeResult.roundTripTime = GetTickCount64() - DecodeResult.roundTripTime;//计算往返时间

	if (ptr_icmp->type == ICMP_ECHO_REPLY || ICMP_TIMEOUT)
	{
		if (DecodeResult.roundTripTime) {
			cout << "	" << DecodeResult.roundTripTime << "ms" << flush;
		}
		else
			cout << "	" << "1ms" << flush;
	}
	return true;
}

int main() {
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
	u_long ulDestIP = inet_addr(DestIp.c_str());

	if (ulDestIP == INADDR_NONE) { 	//如果按照IP地址解析失败
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

	char IcmpSendBuf[ICMP_DATA_SIZE + sizeof(ICMP_HEADER)] = { 0 };		//定义发送缓冲区
	char IcmpRecvBuf[MAX_ICMP_PACKET_SIZE] = { 0 };				//定义接收缓冲区

	//初始化ICMP报文头部
	//依靠先申请一段内存空间，然后再对内存空间进行操作，把结构体中的成员赋值进去
	//填充ICMP数据包的各个字段
	// 类型8，代码0：表示回显请求(ping请求)。
	// 类型0，代码0：表示回显应答(ping应答)
	ICMP_HEADER* pIcmpHeader = (ICMP_HEADER*)IcmpSendBuf;
	pIcmpHeader->type = 8; //报文类型：回显请求类型8
	pIcmpHeader->code = 0;
	pIcmpHeader->id = (USHORT)GetCurrentProcessId(); //获取当前进程的 id 用于后面判断该icmp 应答是不是给当前进程的。
	memset(IcmpSendBuf + sizeof(ICMP_HEADER), 'E', ICMP_DATA_SIZE);//按字节对内存块进行初始化，跳过ICMP头部，初始化数据字段。

	//最多通过30个越点来跟踪路由
	bool quit_flag = false; //退出循环标志
	int max_hop = 30; //设置最多跳的栈数；
	int TTL = 1; //初始的存活时间为1 
	USHORT usSeqNo = 0; //报文序列号
	DECODE_RESULT DecodeResult;

	while (!quit_flag && max_hop--) {	  //开始追踪路由测试
		//设置每次发送的IP数据报的TTL
		setsockopt(sockRaw, IPPROTO_IP, IP_TTL, (char*)&TTL, sizeof(TTL));
		cout << TTL << flush;
		int request_count = 0;  // 发三次请求打印*的数量

		//每一次请求3次
		for (int i = 0; i < 3; i++) {
			//seq和cksum 两个参数每次都要变
			pIcmpHeader->cksum = 0;
			pIcmpHeader->seq = htons(usSeqNo++);
			pIcmpHeader->cksum = htons(checkSum(IcmpSendBuf, sizeof(ICMP_HEADER) + ICMP_DATA_SIZE));

			//记录序列号和当前时间
			DecodeResult.seqNum = ((ICMP_HEADER*)IcmpSendBuf)->seq;
			DecodeResult.roundTripTime = GetTickCount64();

			// 发送请求
			if (sendto(sockRaw, IcmpSendBuf, sizeof(ICMP_HEADER) + 32, 0, (sockaddr*)&destSockAddr, sizeof(destSockAddr)) == SOCKET_ERROR) {
				if (WSAGetLastError() == WSAEHOSTUNREACH) {
					cout << "主机不可达" << endl;
					exit(0);
				}
			}

			sockaddr_in recvinfo;
			int recvlen = 0; //接收到的数据的字节数
			int fromlen = sizeof(recvinfo);
			memset(IcmpRecvBuf, 0, sizeof(IcmpRecvBuf));

			//接受返回的ICMP回显应答
			while (1) {
				/*recvfrom 函数
					sockfd：标识一个已连接套接口的描述字。
					buf：接收数据缓冲区。
					len：缓冲区长度。
					flags：调用操作方式。
					from：（可选）指针，指向装有源地址的缓冲区。
					fromlen：（可选）指针，指向from缓冲区长度值。
				*/
				recvlen = recvfrom(sockRaw, IcmpRecvBuf, MAX_ICMP_PACKET_SIZE, 0, (SOCKADDR*)&recvinfo, &fromlen);
				if (recvlen != SOCKET_ERROR) {
					//判断是不是发给本进程的ICMP报文，如果是就打印信息
					if (DecodeIcmpResponse(IcmpRecvBuf, recvlen, DecodeResult, 0, ICMP_TIMEOUT)) {
						if (DecodeResult.scrIpAddr.S_un.S_addr == destSockAddr.sin_addr.S_un.S_addr)
							quit_flag = true;
						break;
					}
				}
				else if (WSAGetLastError() == WSAETIMEDOUT) {
					cout << "\t" << '*' << flush;
					request_count++;
					break;
				}
				else
					break;
			}
		}
		if (request_count == 3) {
			cout << "\t" << "请求超时" << endl;
		}
		else {
			cout << "\t" << inet_ntoa(DecodeResult.scrIpAddr) << endl;
		}
		//准备发送下一次数据报
		TTL++;
	}
	cout << "跟踪完成" << endl;
	closesocket(sockRaw);
	WSACleanup();
	return 0;
}