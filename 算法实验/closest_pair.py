from math import sqrt
import matplotlib.pyplot as plt
from matplotlib import font_manager
my_font = font_manager.FontProperties(fname=r'C:\WINDOWS\FONTS\MSYHL.TTC')

# 计算两点间的距离公式
def distance(a,b):
  return sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2)

def closest_pair(p,n):
  #边界条件
  if n == 2:
    return p[0],p[1]
  if n == 3:
    mid_d = min(distance(p[0],p[1]),min(distance(p[1],p[2]),distance(p[0],p[2])))
    if mid_d == distance(p[0],p[1]):
      return p[0],p[1]
    elif mid_d == distance(p[1],p[2]):
      return p[1],p[2]
    elif mid_d == distance(p[0],p[2]):
      return p[0],p[2]

  p.sort(key = lambda item:item[0])  #先将点排序

  left_points = p[:int(n/2)]   #坐标点分为左右两个部分
  right_points = p[int(n/2):]
  mid = int(n/2)
  mid_line = (p[mid-1][0] + p[mid][0]) / 2  #中线横坐标

  p1,p2 = closest_pair(left_points,mid)
  p3,p4 = closest_pair(right_points,mid)
  if(distance(p1,p2) > distance(p3,p4)):
    p1 = p3
    p2 = p4

  min_d = distance(p1,p2)

  left = []    #从中线往两边走
  right = []
  index = mid-1
  # 中线左边符合要求的点
  while(index >= 0):
    if(mid_line-p[index][0] <= min_d):
      left.append(p[index])
      index -= 1
    else:
      break
  
  # 中线右边符合要求的点
  index = mid
  while(index < n):
    if(p[index][0]-mid_line <= min_d):
      right.append(p[index])
      index += 1
    else:
      break


  for i in range(len(left)):
    for j in range(len(right)):
      if(distance(left[i],right[j]) < min_d):
        min_d = distance(left[i],right[j])
        p1 = left[i]
        p2 = right[j]
  return p1, p2
  

def main():
  points = [(1, 4), (2, 5), (4, 2), (7, 2), (10, 3), (13, 4), (14, 4), (15, 3)]
  x_1 = []
  y_1 = []

  l = points.__len__()
  p1, p2 = closest_pair(points,l)
  min_distance = distance(p1,p2)

  print("最短距离为" + str(min_distance))
  print("p1 = " + str(p1))
  print("p2 = " + str(p2))

  for item in points:
    x_1.append(item[0])
    y_1.append(item[1])

  closest_x = [p1[0],p2[0]]
  closest_y = [p1[1],p2[1]]

  plt.figure(figsize=(8,5))
  plt.scatter(x_1,y_1,c='skyblue')
  plt.plot(closest_x,closest_y,c="orange")
  plt.title('closest-pair',fontsize = 15)

  plt.axvline(x = (p1[0]+p2[0])/2, c='red')
  plt.show()

if __name__=="__main__":
    main()