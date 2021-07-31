import numpy as np

def knapstack(W,N,weight,val):  #N=4  W=5
  # dp表初始化
  dp = [[0 for i in range(W+1)] for j in range(N+1)]

  for i in range(1,N+1):  #1~N(4)
    for w in range(1,W+1):   # 1~5
      if (w-int(weight[i-1]) < 0):
        # 背包容量不够，只能选择不装入背包
        dp[i][w] = dp[i-1][w]
      else:
        # 装入背包或者不装入背包，择优选择
        dp[i][w] = max(dp[i-1][w], dp[i-1][w-int(weight[i-1])] + int(val[i-1]))

  print("dp:\n",np.matrix(dp))
  return dp[N][W]

def main():
  # W = int(input("请输入背包的重量："))
  # N = int(input("请输入一共有几个物品："))
  # weight = input("请依次输入每个物品的重量，用逗号隔开：").split(",")
  # val = input("请依次输入每个物品的价值，用逗号隔开：").split(",")

  W = 5
  N = 4
  weight = [2,1,3,2]
  val = [12,10,20,15]

  result = knapstack(W,N,weight,val)
  print("背包能承受的装下的物品最大价值是：",result)

if __name__ == '__main__':
    main()
    