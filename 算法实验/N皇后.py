import numpy as np
import copy

# 检查该皇后的放置是否是有效的
def isValid(board,row,col):
  n = len(board)
  # 检查正上方是否有皇后冲突
  for i in range(0,row):  #0~row-1
    if (board[i][col] == 'Q'):
      return False  # 不能放置，不合理
    
  # 检查左上方是否有皇后冲突
  i_1 = row - 1
  j_1 = col - 1
  while(i_1 >= 0 and j_1 >=0):
    if(board[i_1][j_1] == 'Q'):
      return False
    i_1 -= 1
    j_1 -= 1

  # 检查右上方是否有皇后冲突
  i_2 = row - 1
  j_2 = col + 1
  while(i_2 >= 0 and j_2 < n):
    if(board[i_2][j_2] == 'Q'):
      return False
    i_2 -= 1
    j_2 += 1

  return True #合理
        
# 回溯
def backtrack(board,row):
  n = len(board)
  # 结束条件，棋盘已经放满
  if (row == len(board)):
    print(np.matrix(board),"\n")
  
  for col in range(0,n):
    # 排除违规的选择
    if(not isValid(board,row,col)):
      continue
    # 做选择
    board[row][col] = 'Q'
    # 进入下一行决策
    backtrack(board,row+1)
    # 撤销选择(回溯)，递归了几次就回溯几次
    board[row][col] = '.'


def main():
  res = [] # 存放结果的容器
  count = 0
  n = int(input("Please input the size of chessboard:"))
  board = [['.' for i in range(n)] for j in range(n)]
  print("初始棋盘为:\n",np.matrix(board))
  print("\n"+str(n)+"皇后问题的解为: ")
  #从第0行开始放置皇后
  backtrack(board,0)


if __name__ == '__main__':
    main()
    