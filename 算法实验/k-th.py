def partition(a, x):
    s1 = []
    s2 = []
    for i in range(0, len(a)):
        if(a[i] < x):  
            s1.append(a[i])
        else:
            s2.append(a[i])
    return s1, s2

def Select(a, k):
    if(len(a) <= 75):
        a.sort()
        return a[k-1]
    M = []
    for i in range(5, len(a), 5):
        b = a[i-5 : i]  #5个5个为一组
        b.sort()
        M.append(b[2])  #找中位数
    x = Select(M, int(len(M)/2))   #返回中位数
    s1, s2 = partition(a, x)
    if(k <= len(s1)):
        return Select(s1, k)
    else:
        return Select(s2, k - len(s1))

def main():
    print("请输入数列，数字之间用一个空格隔开")
    arr = input("")
    a = [int(i) for i in arr.split()]
    print("请输入k")
    k = int(input("k = "))
    print(Select(a, k))
    return

if __name__=="__main__":
    main()