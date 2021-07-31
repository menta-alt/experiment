#include<stdio.h>
#include<math.h>
#include<stdlib.h>
#define pi 3.1415926

/*用户选择函数类型*/
int My_choice(int c) {
	switch (c) {
	case 0: CAL_SINX();
		break;
	case 1:CAL_COSX();
		break;
	case 2:CAL_LNX();
		break;
	}
}

int main（void){
int my_choice,sec_choice;
menu:
printf("***********欢迎使用自然对数与正余弦函数的近似计算系统！********\n"
	"请选择您需要计算的函数类型：\n"
	"sinx:0\n"
	"cosx:1\n"
	"lnx:2\n")
	scanf_s("%d\n", &my_choice);
    My_choice(my_choice);
	system("cls");
	printf("若想再次选择函数类型，请按1回到主页面\n");
	scanf_s("%d", &sec_choice);
	if(sec_choice==1)
	goto menu;
	return 0;
}

/*自然对数*/
double CAL_LNX() {
	double a;//a为指数

	/*用户输入指数*/
	printf("请输入自然对数的指数：");
    scan:
	scanf_s("%lf", &a);
	if (a <= 0) {
		printf("input error!\n");
		printf("please input another number: \n");
		goto scan;
	}
	printf("结果是：%f", Calculation(a));

	/*自然函数的近似计算*/
	int n, i;
	double x, y = 1, Result = 0;
	double  FENSHU = 0;
	double Calculation(double a) {
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
	return 0;
}

/*sinx的计算*/
double CAL_SINX() {
		double a;
		float b;
		printf("请输入度数：");
		scanf_s("%lf", &a);
		b = (float)a;
		a = angle_to_radian(a);
		printf("sin%.2f=%f", b, my_sin(a));

	/*度数与弧度的转换*/
	double angle_to_radian(double k) {
		return  k / 180 * pi;
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

	/*计算阶乘*/
	int fact(int i) {
		if (i <= 1)
			return 1;
		else
			return i * fact(i - 1);
	}
	return 0;
}








