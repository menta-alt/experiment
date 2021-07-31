import numpy as np


def matrix_mul(m):
    n = len(m)  # 5

    # 初始化cost表
    C = [[0 for i in range(n)] for j in range(n)]

    for i in range(1, n):  # 1~4
        C[i][i] = 0

    # 对角线更新数表
    for r in range(1, n-1):  # 1~3
        for i in range(1, n - r):  # 行
            j = i + r   # 列
            min_val = 9999999
            for k in range(i, j):  # i<=k<j
                # m[i - 1] * m[k] * m[j] 本次矩阵乘法的规模
                cost = C[i][k] + C[k + 1][j] + m[i - 1] * m[k] * m[j]
                if (cost < min_val):
                    min_val = cost

            C[i][j] = min_val

    print("cost 矩阵为：\n", np.matrix(C))
    return C[1][n-1]


def main():
    m = [50,20,1,10,100]  # m0,m1,m2,m3,m4
    # m = [30,35,15,5,10,20,25]

    result = matrix_mul( m)
    print("矩阵连乘的最小相乘次数为：", result)


if __name__ == '__main__':
    main()
