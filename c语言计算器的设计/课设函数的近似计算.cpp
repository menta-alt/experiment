#include<stdio.h>
#include<math.h>
#include<stdlib.h>
#define pi 3.1415926
double CAL_LNX();
double CAL_SINX();
double CAL_COSX();
double Calculation(double a);
double angle_to_radian(double k);
double my_sin(double x);
double my_cos(double x1);
double My_choice(int c);
int fact(int i);


/*自然对数*/
double CAL_LNX() {
	double a;//a为指数
	printf("***************欢迎使用自然对数的近似计算系统！***************\n");
	printf("ln");
    scan:
	scanf_s("%lf", &a);
	if (a <= 0) {
		printf("input error!\n");
		printf("please input another number: \n");
		goto scan;
	}
	printf("结果是：ln%f=%f\n",a, Calculation(a));
	return 0;
}

/*自然函数的近似计算*/
double Calculation(double a) {
	int n, i;
	double x, y = 1, Result = 0;
	double  FENSHU = 0;
	x = (double)(a - 1) / (a + 1);
	for (n = 1;;n++) {
		FENSHU = (double)1 / (2 * n + 1) * pow(pow(x, 2), n);
		y = y + FENSHU;

		/*误差分析*/
		if (FENSHU < 0.000001) {
			Result = 2 * x * y;
			return Result;
		}
	}
}

/*sinx的计算*/
double CAL_SINX() {
	double a;
	float b;
	printf("***************欢迎使用正弦的近似计算系统！***************\n");
	printf("sin");
	scanf_s("%lf", &a);
	b = (float)a;
	a = angle_to_radian(a);
	printf("sin%.2f=%f\n", b, my_sin(a));
	return 0;
}

/*sina的近似计算*/
double my_sin(double x) {
	double fenzi, fenmu, fore, y = 0;
	int n, f = 0;
	for (n = 1;;n += 2) {
		fenzi = pow(x, n);
		fore = pow((-1), f++);
		fenmu = fact(n);
		y = y + (double)fore * fenzi / fenmu;
		if ((double)fenzi / fenmu < 1e-6)
			break;
	}
	return y;
}

/*度数与弧度的转换*/
double angle_to_radian(double k) {
	return  k / 180 * pi;
}

/*计算阶乘*/
int fact(int i) {
	if (i <= 1)
		return 1;
	else
		return i * fact(i - 1);
}

/*cosx*/
double CAL_COSX() {
	double a1;
	float b1;
	printf("***************欢迎使用余弦的近似计算系统！***************\n");
	printf("cos");
	scanf_s("%lf", &a1);
	b1 = (float)a1;
	a1 = angle_to_radian(a1);
	printf("cos%.2f=%f\n", b1, my_cos(a1));
	return 0;
}

/*近似计算cosa1*/
double my_cos(double x1) {
	double fenzi, fenmu, fore, y = 0;
	int n, f = 0;
	for (n = 0;;n += 2) {
		fenzi = pow(x1, n);
		fore = pow((-1), f++);
		fenmu = fact(n);
		y = y + (double)fore * fenzi / fenmu;
		if ((double)fenzi / fenmu < 1e-6)
			break;
	}
	return y;
}

/*用户选择函数类型*/
double My_choice(int c) {
	switch (c) {
	case 0: CAL_SINX();
		break;
	case 1:CAL_COSX();
		break;
	case 2:CAL_LNX();
		break;
	}
	return 0;
}

int main(void) {
	int my_choice, sec_choice;
menu:
	printf("   **********欢迎使用自然对数与正余弦函数的近似计算系统！*********\n"
		   "   **                请选择您需要计算的函数类型：               **\n"
		   "   **                sinx:0                                     **\n"
		   "   **                cosx:1                                     **\n"                                  
		   "   **                lnx:2                                      **\n"
	       "   ***************************************************************\n");
	scanf_s("%d", &my_choice);
	system("cls");
	My_choice(my_choice);
	printf("若想再次选择函数类型，请按1回到主页面\n");
	scanf_s("%d", &sec_choice);
	system("cls");
	if (sec_choice == 1)
		goto menu;
	return 0;
}








