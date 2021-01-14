import os
if os.path.isfile('name'):
    file=open("name","r")
    back=file.read()
    name=[]
    i=0
    j=""
    while i<len(back):
        while back[i]!='|':
            j=j+back[i]
            i+=1
        name.append(j)
        j=''
        i+=1
else:
    file=open("name","w")
    file.write("\u9ec4\u51ef\u60a6\u007c\u66fe\u4e16\u8c6a\u007c\u5434\u94ed\u9e4f\u007c\u674e\u5a67\u007c\u8d56\u96e8\u8431\u007c\u674e\u4f73\u714a\u007c\u8d56\u6797\u950c\u007c\u5f20\u96c5\u77b3\u007c\u6797\u8bed\u6668\u007c\u9648\u5b50\u742a\u007c\u8d56\u5b50\u9633\u007c\u674e\u96e8\u6b22\u007c\u9648\u7fbd\u676d\u007c\u6768\u4f73\u8c6a\u007c\u5f20\u5764\u677e\u007c\u674e\u5b50\u6db5\u007c\u66fe\u806a\u53d1\u007c\u5362\u6676\u6676\u007c\u5362\u94ed\u6d69\u007c\u9ec4\u6cfd\u709c\u007c\u5468\u4e8e\u7fd4\u007c\u6797\u82b7\u58a8\u007c\u77f3\u6893\u57ce\u007c\u8d56\u4e1c\u5b87\u007c\u4f55\u82cf\u5029\u007c\u9648\u5353\u8431\u007c\u5362\u5b87\u6db5\u007c\u66fe\u6977\u6770\u007c\u6797\u73ca\u73ca\u007c\u5e84\u4ef2\u9716\u007c\u674e\u4e50\u742a\u007c\u90ed\u94b0\u5f64\u007c\u674e\u5b87\u6d9b\u007c\u9ec4\u5b87\u6668\u007c\u9648\u6cfd\u950b\u007c\u8d56\u5b87\u97e9\u007c\u674e\u6893\u7814\u007c\u8521\u5b50\u6db5\u007c\u6768\u96e8\u946b\u007c\u66fe\u7426\u51ef\u007c\u5362\u5efa\u5b8f\u007c\u6797\u8212\u840d\u007c\u8d75\u5b87\u78ca\u007c\u9ec4\u5bb6\u5f6c\u007c\u674e\u6587\u707f\u007c\u8d56\u674e\u9510\u007c\u6797\u5b87\u65b0\u007c\u6797\u535a\u6770\u007c\u5362\u5b50\u8f69\u007c\u8521\u8367\u83b9\u007c\u5f20\u5723\u6770\u007c\u6797\u5386\u661f\u007c")
    file.close()
    print("/已新建name/")
    file=open("name","r")
    back=file.read()
    name=[]
    i=0
    j=""
    while i<len(back):
        while back[i]!='|':            
            j=j+back[i]
            i+=1
        name.append(j)
        j=''
        i+=1
if os.path.isfile('score'):
    file=open("score","r")
    back=file.read()
    score=[]
    i=0
    j=""
    while i<len(back):
        while back[i]!='|':
            j=j+back[i]
            i+=1
        score.append(int(j))
        j=''
        i+=1
else:
    file=open("score","w")    
    k=''
    score=[]
    for i in range(4):
        score.append(int(input('初次使用，请输入第'+str(i+1)+'组的分数')))
    for i in range(4):
        k=k+str(score[i])+'|'
    file.write(k)
    file.close()
    print("/已新建score/")
if os.path.isfile('error'):
    file=open("error","r")
    back=file.read()
    error=[]
    i=0
    j=""
    while i<len(back):
        while back[i]!='|':
            j=j+back[i]
            i+=1
        error.append(int(j))
        j=''
        i+=1
else:
    file=open("error","w")    
    file.write('0|1|2|2|0|1|0|0|2|0|12|0|7|0|2|6|1|0|0|4|2|1|3|5|7|2|3|3|1|7|0|3|2|1|10|7|11|2|6|6|5|3|5|23|0|9|3|5|9|7|6|22|')
    file.close()
    print("/已新建error/")
    file=open("error","r")
    back=file.read()
    error=[]
    i=0
    j=""
    while i<len(back):
        while back[i]!='|':            
            j=j+back[i]
            i+=1
        error.append(int(j))
        j=''
        i+=1
print()
print("Welcome！")
while True:
    answer=input("执行什么? （输入help获得帮助）")
    print()
    if answer=='1':
        i=int(input('修改哪一组？（填数字）'))
        score[i-1]=score[i-1]+int(input('增加的分数？（负数为扣分）'))
        file=open('score','w')
        k=''
        for i in range(4):
            k=k+str(score[i])+'|'
        file.write(k)
        file.close()
        print('/修改成功/')
    elif answer=='2':
        i=input('修改谁没完成作业的次数？（填名字或编号）')
        if i in name:
            j=name.index(i)
        else:
            j=int(i)-1
        i=input('增加的次数？（输入负数减少）')
        error[j]=error[j]+int(i)
        k=''
        for i in range(52):
            k=k+str(error[i])+'|'
        file=open('error','w')
        file.write(k)
        file.close()
        print('修改成功')
    elif answer[0:6]=='check ':
        i=eval(answer[6:len(answer)])
        for x in range(len(i)):
            print(str(x+1)+'.'+str(i[x]))        
    elif answer[0:4]=='stu ':
        if answer[4:len(answer)] in name:
            print(answer[4:len(answer)]+'\n编号'+str(name.index(answer[4:len(answer)])+1)+'\n有'+str(error[name.index(answer[4:len(answer)])])+'次没完成作业')
        else: 
            print(name[int(answer[4:len(answer)])-1]+'\n编号'+answer[4:len(answer)]+'\n有'+str(error[int(answer[4:len(answer)])-1])+'次没完成作业')
    elif answer=='quit':
        break
    elif answer=='help':
        print('输入quit=退出\n输入1=为xx组修改分数\n输入2=修改某人没完成作业的次数\n输入check （查看的名字）来查看name（全班名字），score（四组分数），error（作业没完成的次数）\n输入stu （名字或编号）查看某人的详细信息')
    print()