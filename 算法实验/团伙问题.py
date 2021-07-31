import numpy as np

def find(x):
  while (x != parent[x]):
    parent[x] = parent[parent[x]]
    x = parent[x]
  return x

def Union(x,y):
  a = find(x)
  b = find(y)
  if (a != b):
    parent[a] = b

if __name__ == '__main__':
  parent=[0]*20
  nums=[0]*20
  count = 0  # 团伙数，初始是每个人都是一个团伙
  n = int(input("请输入有几个人(n)："))
  m = int(input("请输入你要给出多少条信息(m)："))
  for i in range(1,2*n+1):
      parent[i]=i
  info = [[0 for i in range(3)] for j in range(m)]
  print("请输入这n条信息分别是什么，每行第一个数字代表两人的关系，1为敌人，0为朋友:")
  for i in range(m):
    row = input().split(",")
    info[i] = row
  print("给出的信息为：\n",np.matrix(info))

  # 遍历每一条关系做处理
  for i in range(m):
    flag = int(info[i][0])
    x = int(info[i][1])
    y = int(info[i][2])
    # 为朋友
    if flag == 0:
      Union(x, y) #是朋友就合并
    # 为敌人
    else:
    # 反集 a+n表示a的敌人(parent 数组中从n+1开始的都表示前面对应人的敌人)
    # 如果a和b是敌人，合并n+b和a，n+a和b
    # 如果c和a是敌人，合并n+c和a，n+a和c
    # 那么b和c就并在一起了
      Union(x, y + n)
      Union(x + n, y)

  for i in range(1,n+1):
    temp=find(i)  # 找所有节点的根节点是谁
    if not nums[temp]:
      nums[temp]=1 
      count+=1

  print("团伙数为：",count)
