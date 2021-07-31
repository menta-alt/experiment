
# 给定图的邻接矩阵
g = [[0,1,1,1,0],
      [1,0,1,1,1],
      [1,1,0,1,0],
      [1,1,1,0,1],
      [0,1,0,1,0]]
n = len(g)  #顶点数
color = [0 for i in range(n)] # 节点的颜色数组
m = int(input("请输入颜色的个数："))  #颜色数
sum = 0  #解法的个数

def isValid(g,k,color):
    for i in range(1,k):  #1~k-1(前k个)
      if ((g[k-1][i-1] == 1) and (color[k-1] == color[i-1])):  #有冲突
        return 0
    return 1

def GraphColor(k):  #k 需要填充的第几个点的颜色
  global sum
  if (k == n + 1):  #表示前面所有的顶点颜色都已经填完 
    print("color:",color)  # 所有节点都填充了颜色
    sum += 1
  else:
    for c in range(1,m+1): #1~m  # 递归回溯
      color[k-1] = c
      # 判断是否满足条件,若满足条件则继续向下，若不满足条件则回溯
      if(isValid(g,k,color) == 1):
        GraphColor(k+1)

GraphColor(1)
print("共有"+str(sum)+"种解法")