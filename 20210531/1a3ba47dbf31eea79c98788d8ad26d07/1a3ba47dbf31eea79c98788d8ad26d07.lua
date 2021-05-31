function split(szFullString, szSeparator) local nFindStartIndex = 1 local nSplitIndex = 1 local nSplitArray = {}while true do local nFindLastIndex = string.find(szFullString, szSeparator, nFindStartIndex) if not nFindLastIndex then nSplitArray[nSplitIndex] = string.sub(szFullString, nFindStartIndex, string.len(szFullString)) break end nSplitArray[nSplitIndex] = string.sub(szFullString, nFindStartIndex, nFindLastIndex - 1) nFindStartIndex = nFindLastIndex + string.len(szSeparator) nSplitIndex = nSplitIndex + 1 end return nSplitArray end function xgxc(szpy, qmxg) for x = 1, #(qmxg) do xgpy = szpy + qmxg[x]["offset"] xglx = qmxg[x]["type"] xgsz = qmxg[x]["value"] xgdj = qmxg[x]["freeze"] if xgdj == nil or xgdj == "" then gg.setValues({[1] = {address = xgpy, flags = xglx, value = xgsz}}) else gg.addListItems({[1] = {address = xgpy, flags = xglx, freeze = xgdj, value = xgsz}}) end xgsl = xgsl + 1 xgjg = true end end function xqmnb(qmnb) gg.clearResults() gg.setRanges(qmnb[1]["memory"]) gg.searchNumber(qmnb[3]["value"], qmnb[3]["type"]) if gg.getResultCount() == 0 then gg.toast(qmnb[2]["name"] .. "开启失败") else gg.refineNumber(qmnb[3]["value"], qmnb[3]["type"])gg.refineNumber(qmnb[3]["value"], qmnb[3]["type"]) gg.refineNumber(qmnb[3]["value"], qmnb[3]["type"]) if gg.getResultCount() == 0 then gg.toast(qmnb[2]["name"] .. "开启失败") else sl = gg.getResults(999999) sz = gg.getResultCount() xgsl = 0 if sz > 999999 then sz = 999999 end for i = 1, sz do pdsz = true for v = 4, #(qmnb) do if pdsz == true then pysz = {} pysz[1] = {} pysz[1].address = sl[i].address + qmnb[v]["offset"] pysz[1].flags = qmnb[v]["type"] szpy = gg.getValues(pysz) pdpd = qmnb[v]["lv"] .. ";" .. szpy[1].value szpd = split(pdpd, ";") tzszpd = szpd[1] pyszpd = szpd[2] if tzszpd == pyszpd then pdjg = true pdsz = true else pdjg = false pdsz = false end end end if pdjg == true then szpy = sl[i].address xgxc(szpy, qmxg) end end if xgjg == true then else gg.toast(qmnb[2]["name"] .. "开启失败") end end end end

function Main()
menu = gg.choice({
"完美改忍者",
"退出脚本"
},nil,"——————")
if menu == 1 then a1() end
if menu == 2 then Exit() end
XGCK=-1
end

function a1()
tm=gg.prompt({"请输入忍者代码","请输入忍者代码"},{"90","90"},{"txet","txet"})
if tm==nil then
Main()
else
ma=tm[2].."001"
za=tm[2].."0851"
zb=tm[2].."1051"
mb=tm[2].."0451"
mc=tm[2].."0351"
md=tm[2].."0251"
me=tm[2].."0151"
am=tm[1].."001"
bm=tm[1].."0451"
cm=tm[1].."0351"
dm=tm[1].."0251"
em=tm[1].."0151"
gg.clearResults()
gg.setRanges(gg.REGION_ANONYMOUS)
gg.searchNumber(ma, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
if gg.getResultCount() == 0 then
gg.toast("开启失败")
else
for i=1,gg.getResultCount() do
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+36
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==960 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+40
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==360 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+4
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
aa1=t[#t].value
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+44
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
aa2=t[#t].value
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+112
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
aa3=t[#t].value
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+116
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
aa4=t[#t].value
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+120
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
aa5=t[#t].value
end
gg.clearResults()
qmnb = {
{["memory"] = 32},
{["name"] = ""},
{["value"] = am, ["type"] = 4},
{["lv"] = 960, ["offset"] = 36, ["type"] = 4},
{["lv"] = 360, ["offset"] = 40, ["type"] = 4},
}
qmxg = {
{["value"] = aa1, ["offset"] = 4, ["type"] = 4},
{["value"] = aa2, ["offset"] = 44, ["type"] = 4},
{["value"] = za, ["offset"] = 96, ["type"] = 4},
{["value"] = zb, ["offset"] = 100, ["type"] = 4},
{["value"] = aa3, ["offset"] = 112, ["type"] = 4},
{["value"] = aa4, ["offset"] = 116, ["type"] = 4},
{["value"] = aa5, ["offset"] = 120, ["type"] = 4},
}
xqmnb(qmnb)
gg.toast("模型开启成功")
end
end
end

gg.clearResults()
gg.setRanges(gg.REGION_ANONYMOUS)
gg.searchNumber(mb, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
if gg.getResultCount() == 0 then
gg.toast("开启失败")
else
for i=1,gg.getResultCount() do
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+8
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==39 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+12
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==0 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+36
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ab1=t[#t].value
t={}
t[#t]={}
t[#t].address=gg.getResults(100)[i].address+40
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ab2=t[#t].value
end
gg.clearResults()
qmnb = {
{["memory"] = 32},
{["name"] = ""},
{["value"] = bm, ["type"] = 4},
{["lv"] = 39, ["offset"] = 8, ["type"] = 4},
{["lv"] = 0, ["offset"] = 12, ["type"] = 4},
}
qmxg = {
{["value"] = mb, ["offset"] = 0, ["type"] = 4},
{["value"] = ab1, ["offset"] = 36, ["type"] = 4},
{["value"] = ab2, ["offset"] = 40, ["type"] = 4},
}
xqmnb(qmnb)
gg.toast("奥义打击感开启成功")
end
end
end

gg.clearResults()
gg.setRanges(gg.REGION_ANONYMOUS)
gg.searchNumber(mc, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
if gg.getResultCount() == 0 then
gg.toast("开启失败")
else
for i=1,gg.getResultCount() do
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+8
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==38 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+12
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==0 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+36
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ac1=t[#t].value
t={}
t[#t]={}
t[#t].address=gg.getResults(100)[i].address+40
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ac2=t[#t].value
end
gg.clearResults()
qmnb = {
{["memory"] = 32},
{["name"] = ""},
{["value"] = cm, ["type"] = 4},
{["lv"] = 38, ["offset"] = 8, ["type"] = 4},
{["lv"] = 0, ["offset"] = 12, ["type"] = 4},
}
qmxg = {
{["value"] = mc, ["offset"] = 0, ["type"] = 4},
{["value"] = ac1, ["offset"] = 36, ["type"] = 4},
{["value"] = ac2, ["offset"] = 40, ["type"] = 4},
}
xqmnb(qmnb)
gg.toast("一技能打击感开启成功")
end
end
end

gg.clearResults()
gg.setRanges(gg.REGION_ANONYMOUS)
gg.searchNumber(md, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
if gg.getResultCount() == 0 then
gg.toast("开启失败")
else
for i=1,gg.getResultCount() do
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+8
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==37 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+12
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==0 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+36
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ad1=t[#t].value
t={}
t[#t]={}
t[#t].address=gg.getResults(100)[i].address+40
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ad2=t[#t].value
end
gg.clearResults()
qmnb = {
{["memory"] = 32},
{["name"] = ""},
{["value"] = dm, ["type"] = 4},
{["lv"] = 37, ["offset"] = 8, ["type"] = 4},
{["lv"] = 0, ["offset"] = 12, ["type"] = 4},
}
qmxg = {
{["value"] = md, ["offset"] = 0, ["type"] = 4},
{["value"] = ad1, ["offset"] = 36, ["type"] = 4},
{["value"] = ad2, ["offset"] = 40, ["type"] = 4},
}
xqmnb(qmnb)
gg.toast("二技能打击感开启成功")
end
end
end

gg.clearResults()
gg.setRanges(gg.REGION_ANONYMOUS)
gg.searchNumber(me, gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)
if gg.getResultCount() == 0 then
gg.toast("开启失败")
else
for i=1,gg.getResultCount() do
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+8
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==4 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+12
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
if t[#t].value==0 then
t={}
t[#t+1]={}
t[#t].address=gg.getResults(100)[i].address+36
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ae1=t[#t].value
t={}
t[#t]={}
t[#t].address=gg.getResults(100)[i].address+40
t[#t].flags=gg.TYPE_DWORD
t=gg.getValues(t)
ae2=t[#t].value
end
gg.clearResults()
qmnb = {
{["memory"] = 32},
{["name"] = ""},
{["value"] = em, ["type"] = 4},
{["lv"] = 4, ["offset"] = 8, ["type"] = 4},
{["lv"] = 0, ["offset"] = 12, ["type"] = 4},
}
qmxg = {
{["value"] = me, ["offset"] = 0, ["type"] = 4},
{["value"] = ae1, ["offset"] = 36, ["type"] = 4},
{["value"] = ae2, ["offset"] = 40, ["type"] = 4},
}
xqmnb(qmnb)
gg.toast("普攻打击感开启成功")
end
end
end
end
end


function Exit()
os.exit()
end

function HOME()
Main()
end

while(true)do
if gg.isVisible(true) then
XGCK=1
gg.setVisible(false)
end
gg.clearResults()
if XGCK==1 then
Main()
end
end