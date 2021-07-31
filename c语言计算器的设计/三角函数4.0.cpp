#include<stdio.h>
#include<math.h>
#include<time.h>
#include<stdlib.h>
#define pi 3.1415926

double my_sin(double x);
int fact(int i);
double angle_to_radian(double k);

int main(void) {
	double a;
	float b;
	printf("输入度数：");
	scanf_s("%lf", &a);
	b = (float)a;
	a = angle_to_radian(a);
	printf("sin%.2f=%f", b, my_sin(a));
	return 0;
}

/*度数与弧度的转换*/
double angle_to_radian(double k) {
	return  k / 180 *pi;
}

/*sina的近似计算*/
double my_sin(double x) {
	double fenzi, fenmu, fore, y = 0;
	int n;
	for (n = 1;;n += 2) {
		fenzi = pow(x, n);
		fore = pow((-1), (n - 1));
		fenmu = fact(n);
		y = y + (double)fore * fenzi / fenmu;
		if ((double)fenzi / fenmu <1e-6)
			break;
	}
	return y;
}

/*计算阶乘*/
int fact(int i) {
	if (i <= 1)
		return 1;
	else
		return i * fact(i - 1);
}




