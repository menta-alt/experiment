#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <iostream>
#include <winsock2.h>
#include<windows.h>

#define SERVER_PORT 80  //服务器端口号
#define SERVER_IP_ADDRESS "127.0.0.1"	//服务器IP地址
#define TIMEOUT 3000  //超时为3秒
#define BUF_SIZE 1024
#define NULL_LINE "\r\n"
#pragma comment(lib, "ws2_32.lib")
#pragma comment( lib,"winmm.lib" )

using namespace std;

// 接收所有服务器返回的信息
int Recv_info(int Socket, char* rev_buf, int size){
    int RecvSize = 0;
    DWORD t1, t2;
    t1 = timeGetTime();  //计时器开始
    cout << "Response Message From Server:  " << endl;
    while (size > 0){ 
        RecvSize = recv(Socket, rev_buf, size, 0);
        if (RecvSize == SOCKET_ERROR) {
            cout << "Receive Response Message Error!" << endl;
            return 0;
        }
        else {
            //输出接收到的信息
            cout << rev_buf ;
        }
        size = size - RecvSize;
        rev_buf += RecvSize;
        t2 = timeGetTime();  //计时器结束
        if ((t2 - t1) > TIMEOUT) {
            size = -1; //退出循环，服务器的响应信息全部接受完毕
            cout << endl << endl;
            cout << "Http request is finished! You can start the next request!" << endl;
        }
    }
    return 1;
}

int main(int argc, char* argv[]){   
    int res = 0;
    int addrLen = 0;
    string file;  //要查找的文件
    string requestLine;  //请求行
    char sendBuffer[BUF_SIZE];  // 发送的http请求信息
    char RecvBuffer[BUF_SIZE];  //接收到的信息
    WSADATA wsadata;  //初始化套接字（IP地址：端口号）
    SOCKET clientSocket;   //使用TCP协议创建 Socket
    struct sockaddr_in serverAddr; //sockaddr_in:用来处理网络通信的地址

    while (true) {
        //初始化Socket
        if (WSAStartup(MAKEWORD(2, 2), &wsadata) != 0) {
            cout << "Client Socket Initial Failed::" << GetLastError() << endl;
            WSACleanup();
            return -1;
        }

        // 在客户端创建使用TCP协议创建流式套接字 (socket)
        clientSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        if (clientSocket == INVALID_SOCKET){
            cout << "Create Socket Defeat::" << GetLastError() << endl;
            closesocket(clientSocket);
            WSACleanup();
            return -1;
        }

        //先用memset(&ServerAddr,0,sizeof(ServerAddr))对整个变量零填充，再对前三个参数逐一赋值
        memset(&serverAddr, 0, sizeof(serverAddr));
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_addr.s_addr = inet_addr(SERVER_IP_ADDRESS);
        serverAddr.sin_port = htons(SERVER_PORT);

        //connect 客户端向服务器端提出连接请求
        res = connect(clientSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr));
        if (res == SOCKET_ERROR){
            cout << "Connect Error::" << GetLastError() << endl;
            WSACleanup();
            return -1;
        }
        else{
            cout << "Succeed to connect with server[" << inet_ntoa(serverAddr.sin_addr) << ":" << ntohs(serverAddr.sin_port) << "]" << endl;
        }
    
        // 向客户端发送http请求报文
        cout << "Please input the file you want to find:";
        cin >> file;
        cout << endl;

        // http中的请求行
        memset(sendBuffer, 0, sizeof(sendBuffer));
        requestLine = "GET \\" + file + " HTTP/1.0\r\n";
        cout << "RequestLine of Http:  " << endl;
        cout << "     " << requestLine << endl;
        strcat_s(sendBuffer, requestLine.c_str());
        strcat_s(sendBuffer, "\r\n");  // http协议中空行

        // 发送http请求
        res = send(clientSocket, sendBuffer, sizeof(sendBuffer), 0);
        if (res == SOCKET_ERROR) {
            cout << "Send Http Request Error!" << WSAGetLastError() << endl;
            exit(0);
        }
        cout << "Succeed to send http request!" << endl;
        cout << endl;
        
        //接收服务器返回的信息
        memset(RecvBuffer, 0, sizeof(RecvBuffer));
        res = Recv_info(clientSocket, RecvBuffer, sizeof(RecvBuffer));
        cout << "**************************************************" << endl;
    }
    
    closesocket(clientSocket);
    WSACleanup();
    return 0;
}
