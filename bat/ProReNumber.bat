rem Author: Unknown - Please notify me for credit
rem Adapted by: hauptmech <hauptmech@gmail.com> circa 2012

@echo off
title ProReNumber

if !%1==! goto :nopath
if not exist %1*.* goto :badpath

path=%path%;C:\Program Files\proeWildfire 4.0\bin


:start
time /t
call :subrenumber "%1"
time /t
goto:eof

:subrenumber
cd /d "%1"

echo Changing Attributes.. %1
IF EXIST *.* attrib -R -H *.*
time /t

echo Purging.............. %1
call purge.bat
time /t

echo Renumbering.......... %1
for /F "tokens=2,3,4,5,6,7,8,9 delims=. " %%I in ('dir /b *.asm.* *.prt.* *.drw.* *.frm.* *.gph.* *.win.* *.tbl.* *.sym.* *.txt.*') do (
if %%K GTR 1 Call :ReNameFile %%I %%J %%K
)
time /t
goto :Cleaning

:ReNameFile
if exist %1.%2.%3 ren %1.%2.%3 %1.%2.1
goto :complete

:Cleaning
echo Cleaning............. %1
IF EXIST .* del /q .*
IF EXIST *.als del /q *.als
IF EXIST *.log.* del /q *.log.*
IF EXIST *.inf.* del /q *.inf.*
IF EXIST *.crc.* del /q *.crc.*
IF EXIST *.ref.* del /q *.ref.*
IF EXIST *.ptd.* del /q *.ptd.*
IF EXIST *.tst.* del /q *.tst.*
IF EXIST *.memb.* del /q *.memb.*
IF EXIST *.ers.* del /q *.ers.*
IF EXIST *.info.* del /q *.info.*
IF EXIST *.lst.* del /q *.lst.*
IF EXIST *.ncl.* del /q *.ncl.*
IF EXIST *.shd.* del /q *.shd.*
IF EXIST *.tph.* del /q *.tph.*
IF EXIST *.ger.* del /q *.ger.*
IF EXIST *.m_p.* del /q *.m_p.*
IF EXIST *.plt.* del /q *.plt.*
IF EXIST *.err.* del /q *.err.*
IF EXIST *.xrp del /q *.xrp
rem IF EXIST trail.txt* del /q trail.txt*
IF EXIST pdm_trl* del /q pdm_trl*
IF EXIST std.out del /q std.out
IF EXIST rename_this_*.* del /q rename_this_*.*
IF EXIST prt????.prt* del /q prt????.prt*
IF EXIST asm????.asm* del /q asm????.asm*
IF EXIST dgm????.dgm* del /q dgm????.dgm*
IF EXIST drw????.drw* del /q drw????.drw*
IF EXIST s2d????.sec* del /q s2d????.sec*
IF EXIST lay????.lay* del /q lay????.lay*
IF EXIST ptcs.txt del /q ptcs.txt
IF EXIST ptcf.cmd del /q ptcf.cmd
goto :complete

:nopath
echo.
echo ERROR - No path provided.
echo.
pause
goto :complete

:badpath
echo.
echo ERROR - "%1" is not a valid path.
echo.
pause
goto :complete

:complete
echo.