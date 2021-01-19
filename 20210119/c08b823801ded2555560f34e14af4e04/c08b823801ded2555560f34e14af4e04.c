#include <stdio.h>
int main()
{
	int a = -5000;
	char* pa = (int*)&a;
	printf("%d", *pa);
}