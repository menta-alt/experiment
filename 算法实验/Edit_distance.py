import numpy as np

def EditDis(s1, s2):
    m = len(s1)  # 11
    n = len(s2)  # 10

    # 初始化数表
    E = [[0 for i in range(n + 1)] for j in range(m + 1)]
    # 初始化第一列
    for i in range(0, m + 1):  # 0~11
        E[i][0] = i
    # 初始化第一行
    for j in range(0, n + 1):  # 0~10
        E[0][j] = j

    for i in range(1, m + 1):  # 行
        for j in range(1, n + 1):  # 列
            if (s1[i-1] == s2[j-1]):
                diff = 0
            else:
                diff = 1
            E[i][j] = min(E[i - 1][j] + 1, E[i][j - 1] + 1, E[i - 1][j - 1] + diff)
    print("动态规划的数表：")
    print(np.matrix(E))

    return E[m][n]


def main():
    # str1 = input("请输入字符串1，字符间用空格隔开！").split(" ")
    # str2 = input("请输入字符串2，字符间用空格隔开！").split(" ")
    str1 = 'EXPONENTIAL'
    str2 = 'POLYNOMIAL'

    result = EditDis(str1, str2)
    print("\n未匹配上的最小的字符个数为：",result)


if __name__ == '__main__':
    main()
