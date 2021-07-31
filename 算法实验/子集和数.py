import numpy as np

n = int(input("请输入一共有几个正数："))
print("请依次输入这"+ str(n) +"个正数,用逗号隔开：")
W = input().split(',')
W.sort(key = lambda item:int(item))
M = int(input("请输入和数："))
X = [0 for i in range(n)]
count = 0  #解法的个数

def subSet(sum,rest,k):  #k从0开始,第一个正数
  global count
  X[k] = 1  
  # 得到解,sum为遍历的该数之前正数的和
  if ((sum + int(W[k])) == M):
    print("子集：",tuple(X))
    count += 1
  # 不能得到解，测试x[k] = 1 是否满足规范函数,满足就继续下一步
  elif ((sum + rest) >= M) and ((sum + int(W[k]) + int(W[k+1])) <= M):
    subSet(sum + int(W[k]), rest - int(W[k]), k + 1)
  # 测试x[k] = 0 是否满足规范函数,满足就继续下一步
  X[k] = 0
  if ((sum + rest - int(W[k])) >= M) and ((sum + int(W[k+1])) <= M):
    subSet(sum, rest - int(W[k]), k+1)
 

print("排序后的正数数组为：",W)
r = 0 
for num in W:
  r += int(num)
subSet(0,r,0)
print("共有"+str(count)+"种解法")
