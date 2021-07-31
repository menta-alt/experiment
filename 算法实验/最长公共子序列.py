def LCS(str1,str2):
  m = len(str1)  #3
  n = len(str2)  #6
  dp = [[0]*(n+1)]*(m+1)  # base case 初始化 dp[0][..]=dp[..][0]=0

  # 递归计算dp二维数组，dp[m][n]即为答案
  for i in range(1,m+1):  #1~6
    for j in range(1,n+1):  #1~3
      if(str1[i-1] == str2[j-1]):   
        dp[i][j] = dp[i-1][j-1] + 1
      else:
        dp[i][j] = max(dp[i][j-1],dp[i-1][j])  #s1[i] s2[j] 至少有一个不在lcs中，最后取长度最大的,之前的已经是最优

  return dp[m][n]

def main():
  s1 = 'ace'
  s2 = 'babcde'
  lcs = LCS(s1,s2)
  print("最长公共子序列lcs为：",lcs)

if __name__ == '__main__':
    main()
    