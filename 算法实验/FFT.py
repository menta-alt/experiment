import numpy as np
import matplotlib.pyplot as plt
import math
x = []
n = []
X = []

def FFT(p, W):
    global x
    N = len(p)
    if(N == 2):
        return [x[p[0]] + x[p[1]], x[p[0]] - x[p[1]]]
    y = []
    P1= [] #储存P1、P3、P5  基数序列
    P2= [] #储存P0、P2、P4  偶数序列
    for i in range(0, N):
        if(i % 2 == 0):
            P2.append(p[i])
        else:
            P1.append(p[i])

    G = FFT(P2, W[::2])
    H = FFT(P1, W[::2])
    for i in range(0, int(N/2)):
        y.append(G[i] + W[i] * H[i])
    for i in range(0, int(N/2)):
        y.append(G[i] - W[i] * H[i])
    return y

def main():
    N = 1024
    global n
    n = np.linspace(0, N, num=N)
    global x
    x =7*np.sin(2*np.pi*180*n) + 2.8*np.sin(2*np.pi*390*n)+5.1*np.sin(2*np.pi*600*n)  # 需要变换的波形
    #x =7 * np.sin(2 * np.pi * 70 * n) + 2.8 * np.sin(2 * np.pi * 300 * n) + 5.1 * np.sin(2 * np.pi * 417 * n)
    p = [i for i in range(0, N)]
    alpha = 0 - (2 * np.pi / N) * 1j
    W0 = math.e ** (alpha)
    W = []
    for i in range(0, int(N/2)):
        W.append(W0 ** i)
    global X
    X = FFT(p, W)
    return

if __name__=="__main__":
    main()


plt.subplot(211)
plt.plot(n[0:250], x[0:250])
plt.title('Original wave')

plt.subplot(212)
Xf = [abs(X[i]) for i in range(0, int(len(X)/2))]
plt.plot(np.arange(len(Xf)), Xf, 'red')
plt.title('FFT')
plt.show()