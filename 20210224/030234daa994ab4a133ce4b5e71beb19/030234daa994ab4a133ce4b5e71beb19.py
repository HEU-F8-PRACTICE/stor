# facility从2021-02-20 22:50开始编写
# 作者Fatasying
# 当前版本：develop

import os,time

class Facility:
    def __init__(self,file):
        self.file = file + '.fy' # 获取文件名+后缀
        self.VariableName = [] # 变量名列表
        self.VariableValue = [] # 变量内容列表
    def run(self): # 运行函数
        if os.path.isfile(self.file) == True:  # 文件是否存在
            print('The file \"%s\" is found.' % self.file)
        else:
            print('The file \"%s\" is not found!' % self.file)

print('----facility run----\n')
while True:
    print('--------------------')
    answer = int(input('What would you do:\n1.run code\n2.exit\n'))
    if answer == 1:
        file = input('Please input the name of the file(No suffix is required):')
        Frun = Facility(file) # 创建运行对象
        Frun.run() # 运行
    elif answer == 2:
        break
    else:
        print('\nFacility can\'t understand you!')

print('\n----facility over----')
