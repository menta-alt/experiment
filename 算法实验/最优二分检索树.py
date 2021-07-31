import numpy as np

def optimalBST(P):
    n = len(P)  #4
    C = [[0 for i in range(n+1)] for j in range(n+2)]  # 主表
    R = [[0 for i in range(n+1)] for j in range(n+2)]  # 根表
    # 初始化主表和根表
    # 根表记录哪个k做根节点
    for i in range(1, n + 1):  # 1~4
        C[i][i - 1] = 0  # 空树
        C[i][i] = P[i - 1]
        R[i][i] = i
    C[n + 1][n] = 0
    # 对角线计数
    for r in range(1, n):  # 1~n-1(3)
        for i in range(1, n - r + 1):  # 1~n-r
            j = i + r  # d+1~n
            min_val = 99999
            for k in range(i, j + 1):  # i<=k<=j
                if (C[i][k - 1] + C[k + 1][j] < min_val):
                    min_val = C[i][k - 1] + C[k + 1][j]
                    kmin = k
            R[i][j] = kmin
            sum = 0
            # 计算概率的总和
            for s in range(i-1, j):  # i-1~j-1
                sum += P[s]

            C[i][j] = min_val + sum
    print("Main table is :\n",np.matrix(C))
    return C[1][n], np.matrix(R)


def main():
    n = int(input("请输入二叉树节点的个数：")) #4
    print("请输入每个键的查找概率：")
    keys = []
    for i in range(n):
      keys.append(float(input("p:")))

    # keys = [0.1, 0.2, 0.4, 0.3]
    result = optimalBST(keys)

    print("最优检索平均次数为: ",result[0])
    print("root table is：\n",result[1])


if __name__ == '__main__':
    main()
