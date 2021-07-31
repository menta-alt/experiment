import numpy as np
from numpy.core.records import array

def main():
  INF = np.inf

  # 初始的邻接矩阵
  D = [[0,INF,4,INF],
       [1,0,6,3],
       [INF,INF,0,INF],
       [INF,5,1,0]]
  n = len(D)  # 节点的个数
  print("初始的D：\n",np.matrix(D))

  for k in range(n):  # k确定中间的行列，即第几个中间矩阵
    for i in range(n):
      for j in range(n):
        if(D[i][k]+D[k][j] < D[i][j]):
          D[i][j] = D[i][k]+D[k][j] 

  print("更改后的D：\n",np.matrix(D))

if __name__ == '__main__':
    main()
    
      