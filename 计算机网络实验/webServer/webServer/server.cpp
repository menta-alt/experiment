#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <iostream>
#include <winsock2.h>
#include <stdlib.h>

#define SERVER_PORT 80  //服务器端口号
#define SERVER_IP_ADDRESS "127.0.0.1"	//服务器IP地址（本地地址）
#define BACKLOG 10  // 是未经过处理(请求还未accept)的连接请求队列可以容纳的最大数目
#define BUF_SIZE 1024
#define OK 1
#define ERROR 0

#pragma comment(lib, "ws2_32.lib")
using namespace std;

int InitServerSocket();
int Request_Message_Handler(char* message, int Socket, char* whole_path);
int URI_Handler(const char* path, int Socket,char* URI);
int Error_Request_Method(int Socket);
int Send_Info(int Socket, const char* sendbuf, int Length);
int Find_File(const char* path);
int Send_Response_Message(char* URI, int Socket, const char* path);
int File_Not_Find(char* URI,int Socket);
const char* Method_Handler(char* method, int Socket);
const char* Judge_File_Type(char* URI, const char* content_type);
const char* Get_Current_Time(const char* cur_time);

//初始化Socket
int InitServerSocket() {
    int res = 0;
    WSADATA  wsadata;
    SOCKET ServerSock;
    struct sockaddr_in ServerAddr;

    if (WSAStartup(MAKEWORD(2, 2), &wsadata) != 0) {
        cout << "Server Socket Initial Failed::" << WSAGetLastError() << endl;
        WSACleanup();
        return -1;
    }

    //当一个客户（浏览器）连接时，Create Socket
    ServerSock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (ServerSock == INVALID_SOCKET) {
        cout << "Socket Create Failed::" << WSAGetLastError() << endl;
        closesocket(ServerSock);
        WSACleanup();
        return -1;
    }
    cout << "Succeed to create socket!" << endl;

    /* 配置服务器IP、端口信息 */
    memset(&ServerAddr, 0, sizeof(ServerAddr));   // 初始化每一个字节全用0填充
    ServerAddr.sin_family = AF_INET;  //主机字节顺序
    ServerAddr.sin_addr.s_addr = inet_addr(SERVER_IP_ADDRESS);
    ServerAddr.sin_port = htons(SERVER_PORT); // 主机字节顺序转换为网络字节顺序(短整型)

    //Bind Socket 将该套接字和本地网络地址联系在一起,为套接字绑定一个端口号
    res = bind(ServerSock, (struct sockaddr*)&ServerAddr, sizeof(ServerAddr));
    if (res != 0) {
        cout << "Bind Stream Socket Failed:" << WSAGetLastError() << endl;
        WSACleanup();
        return -1;
    }
    cout << "Succeed to bind stream socket!" << endl;

    return ServerSock;
}


//解析HTTP请求报文信息 
int Request_Message_Handler(char* message, int Socket, char* whole_path) {
    int res = 0;
    char RequestMethod[BUF_SIZE];  //请求方法
    char URI[BUF_SIZE];
    char Version[BUF_SIZE];  //HTTP版本
    int pos;
    string path;
    const char* suffix;  //后缀名

    memset(RequestMethod, 0, sizeof(RequestMethod));
    memset(URI, 0, sizeof(URI));
    memset(Version, 0, sizeof(Version));

    //提取"请求方法"、"URI"、"HTTP版本"三个关键要素
    if (sscanf(message, "%s %s %s", RequestMethod, URI, Version) != 3) {
        cout << "Request Line Error!" << endl;
        return ERROR;
    }

    if ((suffix = strrchr(whole_path, '\\')) != NULL) {
        string w_path = string(whole_path);
        pos = w_path.rfind("\\");
        w_path.replace(pos, string(suffix).length(), "");
        path = w_path + URI;
    }

    //解析"请求方法" 
    if (Method_Handler(RequestMethod, Socket) == ERROR) {
        cout << "Handle RequestMethod Error!" << endl;
        return ERROR;
    }
    else if (Method_Handler(RequestMethod, Socket) == "GET") {
        cout << "Http Request's Detail Information: " << endl;
        cout << "     Http Request Method is Get!" << endl;
    }

    // 解析"URI"
    if (URI_Handler(path.c_str(), Socket, URI) == ERROR) {
        cout << "Handle URI Error! Please reinput the URI!" << endl;
        return ERROR;
    }
    else {
        cout << "     URI:" << URI << endl;
        res = Send_Response_Message(URI, Socket, path.c_str());
    }

    if (res == OK) {
        cout << "Succeed to send files!" << endl;
    }
    return OK;
}


//解析http的请求方式 
const char* Method_Handler(char* method, int Socket) {
    if (strcmp(method, "GET") == 0) {
        return "GET";
    }
    else if (strcmp(method, "POST") == 0) {
        return "POST";
    }
    else {
        Error_Request_Method(Socket);
        return ERROR;
    }
}


//501 Not Implemented响应:服务器错误响应代码指示请求方法不受服务器支持并且无法处理
int Error_Request_Method(int Socket) {
    const char* Method_Err_Line = "HTTP/1.0 501 Not Implemented\r\n";  
    const char* cur_time = "";  // 当前时间
    const char* Method_Err_End = "\r\n";
    const char* Method_Err_Info = "The request method is not yet completed!\n";

    if (Send_Info(Socket, Method_Err_Line, strlen(Method_Err_Line)) == ERROR) {
        cout << "Sending method_error_line failed!" << endl;
        return ERROR;
    }

    cur_time = Get_Current_Time(cur_time);
    Send_Info(Socket, "Date: ", 6);
    if (Send_Info(Socket, cur_time, strlen(cur_time)) == ERROR) {
        cout << "Sending current time error!" << endl;
        return ERROR;
    }

    if (Send_Info(Socket, Method_Err_End, strlen(Method_Err_End)) == ERROR) {
        cout << "Sending method_error_end failed!" << endl;
        return ERROR;
    }

    if (Send_Info(Socket, Method_Err_Info, strlen(Method_Err_Info)) == ERROR) {
        cout << "Sending method_error_info failed!" << endl;
        return ERROR;
    }
    return OK;
}


//获取Web服务器的当前时间作为响应时间 
const char* Get_Current_Time(const char* cur_time) {
    time_t curtime;
    time(&curtime);
    cur_time = ctime(&curtime);
    return cur_time;
}

//发送信息到客户端 ,要发全
int Send_Info(int Socket, const char* sendbuf, int size) {
    int sendSize = 0;

    while (size > 0) {
        sendSize = send(Socket, sendbuf , size, 0);  //返回的是已经发送的字节数
        if (sendSize == SOCKET_ERROR)
            return ERROR;
        size = size - sendSize;  //循环发送且退出功能
        sendbuf += sendSize;    //计算已发buffer的偏移量
    }
    return OK;
}


//解析http请求中的URI
int URI_Handler(const char* path, int Socket, char* URI) {
    if (Find_File(path) == ERROR) {
        File_Not_Find(URI,Socket); //输出文件未找到的提示信息
        return ERROR;
    }
    else
        return OK;
}

//在服务器端查找文件 
int Find_File(const char* path) {
    struct _stat File_info;  //文件（夹）信息的结构体
    if (_stat(path, &File_info) == -1) {  //用来获取指定路径的文件或者文件夹的信息
            return ERROR;
    }
    else {
        cout << "     path: " << path << endl;
        return OK;
    }
}


// 服务器发送响应报文 状态码200表示成功
int Send_Response_Message(char* URI, int Socket,const char* path) {
    const char* File_ok_line = "     HTTP/1.0 200 OK\r\n";
    const char* cur_time = "";
    const char* File_ok_type = "";
    const char* File_ok_length = "Content-Length: ";
    const char* File_ok_end = "\r\n";  // 空行

    FILE* file;
    struct stat file_stat;
    char Length[BUF_SIZE];
    char sendBuf[BUF_SIZE];
    int send_len;   // 发送的报文长度

    if (Judge_File_Type(URI, File_ok_type) == ERROR) {
        cout << "The request file's type from client's request message is error!\n" << endl;
        return ERROR;
    }

    memset(Length, 0, BUF_SIZE);
    memset(sendBuf, 0, BUF_SIZE);

    file = fopen(path, "rb"); 
    if (file != NULL) {
        //返回相关文件的状态信息
        fstat(fileno(file), &file_stat); //fileno()用来取得参数stream指定的文件流所使用的文件描述词
        // 要转换的数字|要写入转换结果的目标字符串|转换基数
        itoa(file_stat.st_size, Length, 10);

        // 发送响应行
        if (Send_Info(Socket, File_ok_line, strlen(File_ok_line)) == ERROR) {
            cout << "Sending file_ok_line error!" << endl;
            return ERROR;
        }

        // 发送响应头中的Content-Type
        File_ok_type = Judge_File_Type(URI, File_ok_type);
        if (File_ok_type == "Content-type: text/html\r\n") {
            system("start C:/Users/小萌/Desktop/study/计网实验/webServer/Debug/index.html");
        }
        cout << "     File type: " << File_ok_type << endl;
        if (Send_Info(Socket, File_ok_type, strlen(File_ok_type)) == ERROR) {
            cout << "Sending file_ok_type error!" << endl;
            return ERROR;
        }

        // 发送响应头中的Content-Length
        if (Send_Info(Socket, File_ok_length, strlen(File_ok_length)) != ERROR) {
            if (Send_Info(Socket, Length, strlen(Length)) != ERROR) {
                if (Send_Info(Socket, "\n", 1) == ERROR) {
                    cout << "Sending file_ok_length error!" << endl;
                    return ERROR;
                }
            }
        }

        // 发送响应头中的Date
        cur_time = Get_Current_Time(cur_time);
        Send_Info(Socket, "Date: ", 6);
        if (Send_Info(Socket, cur_time, strlen(cur_time)) == ERROR) {
            cout << "Sending current time error!" << endl;
            return ERROR;
        }

        // 发送空行
        if (Send_Info(Socket, File_ok_end, strlen(File_ok_end)) == ERROR) {
            cout << "Sending file_ok_end error!" << endl;
            return ERROR;
        }

        //发送请求的文件内容
        while (file_stat.st_size > 0) {
            if (file_stat.st_size < 1024) {
                //fread(内存块的指针,每个对象的大小(以字节为单位),元素的数量(字节),要从中读取数据的文件流)
                send_len = fread(sendBuf, 1, file_stat.st_size, file); //返回成功读取的对象数
                if (Send_Info(Socket, sendBuf, send_len) == ERROR) {
                    cout << "Sending file information error!" << endl;
                    continue;
                }
                file_stat.st_size = 0;
            }
            else {  
                send_len = fread(sendBuf, 1, 1024, file);
                if (Send_Info(Socket, sendBuf, send_len) == ERROR) {
                    cout << "Sending file information error!" << endl;
                    continue;
                }
                file_stat.st_size -= 1024;  //一次送1024个字节
            }
        }
    }
    else {  // 目标文件为空
        cout << "The file is NULL!" << endl;
        return ERROR;
    }
    return OK;
}


// 判断http请求中请求文件的类型
const char* Judge_File_Type(char* URI, const char* content_type) {
    const char* suffix;  //后缀名
    // strrchr返回 str 中最后一次出现指定字符的位置，返回这个位置的地址
    if ((suffix = strrchr(URI, '.')) != NULL) {
        suffix = suffix + 1;

        if (strcmp(suffix, "html") == 0) {
            return content_type = "Content-type: text/html\r\n";
        }
        else if (strcmp(suffix, "jpg") == 0) {
            return content_type = "Content-type: image/jpg\r\n";
        }
        else if (strcmp(suffix, "png") == 0) {
            return content_type = "Content-type: image/png\r\n";
        }
        else if (strcmp(suffix, "txt") == 0) {
            return content_type = "Content-type: text/plain\r\n";
        }
        else
            return ERROR;
    }
}


//文件没有找到时404 Not Found响应 
int File_Not_Find(char* URI,int Socket) {
    const char* File_err_line = "HTTP/1.0 404 Not Found\r\n";
    const char* cur_time = "";
    const char* File_err_type ="";
    const char* File_err_end = "\r\n";
    const char* File_err_info = "The file which is requested is not found!\n";

    if (Judge_File_Type(URI, File_err_type) == ERROR) {
        cout << "The request file's type from client's request message is error!\n" << endl;
        return ERROR;
    }

    if (Send_Info(Socket, File_err_line, strlen(File_err_line)) == ERROR) {
        cout << "Sending file_error_line error!" << endl;
        return ERROR;
    }

    cur_time = Get_Current_Time(cur_time);
    Send_Info(Socket, "Date: ", 6);
    if (Send_Info(Socket, cur_time, strlen(cur_time)) == ERROR) {
        cout << "Sending cur_time error!" << endl;
        return ERROR;
    }

    // 发送响应头中的Content-Type
    File_err_type = Judge_File_Type(URI, File_err_type);
    cout << "     File type: " << File_err_type << endl;
    if (Send_Info(Socket, File_err_type, strlen(File_err_type)) == ERROR) {
        cout << "Sending file_error_type error!" << endl;
        return ERROR;
    }

    if (Send_Info(Socket, File_err_end, strlen(File_err_end)) == ERROR) {
        cout << "Sending file_error_end error!" << endl;
        return ERROR;
    }

    if (Send_Info(Socket, File_err_info, strlen(File_err_info)) == ERROR) {
        cout << "Sending file_error_info failed!" << endl;
        return ERROR;
    }

    return OK;
}

int main(int argc, char* argv[]){
    int res = 0;
    int addrLen = 0;
    char revbuf[BUF_SIZE];

    /* ServerSock 初始的套接字描述符，一直在端口上listen
       NewSock: accept之后的新的套接字描述符*/
    SOCKET ServerSock, NewSock;
    struct sockaddr_in ClientAddr;

    cout << "Elvira's Web Server is Starting!" << endl;
    ServerSock = InitServerSocket();
    //printf("argv[0]:%s\n", argv[0]);//全路径

    while (true){  //要时刻监听socket连接请求和http请求，以便及时响应
        //listen 监听客户端的socket连接请求
        res = listen(ServerSock, BACKLOG);
        if (res == SOCKET_ERROR) {
            cout << "Listen Socket Failed:" << WSAGetLastError() << endl;
            return -1;
        }
        cout << "*************************************************************" << endl;
        cout << "Listening the socket ......" << endl;
        cout << endl;

        // 接受客户端请求建立连接 
        addrLen = sizeof(struct sockaddr);
        /* accept()返回一个新的套接字描述符，这个描述符就代表了和远程计算机的连接
            用新的套接字描述符就可以进行send()操作和recv()操作 */
        NewSock = accept(ServerSock, (SOCKADDR*)&ClientAddr, &addrLen);
        if (NewSock == INVALID_SOCKET) {
            printf("Failed to accept connection from client!\n");
            system("pause");
            exit(1);
        }
        cout << "Succeed to accept connection from [" << inet_ntoa(ClientAddr.sin_addr) << ":" << ntohs(ClientAddr.sin_port) << "]" << endl;
        
        // 接受客户端的http数据请求
        memset(revbuf, 0, BUF_SIZE);	//每一个字节都用0来填充 
        res = recv(NewSock, revbuf, BUF_SIZE, 0);
        if (res <= 0 || res == SOCKET_ERROR)
            cout << "Failed to receive request message from client!" << endl;
        else {
            cout << "Request Message From Client:"<< endl;  //输出请求数据内容
            cout << "    " << revbuf;
            res = Request_Message_Handler(revbuf, NewSock, argv[0]);
        }
        closesocket(NewSock);
    }
    closesocket(ServerSock);
    WSACleanup();
    return OK;
}
