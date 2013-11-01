rem Author: hauptmech <hauptmech@gmail.com> circa 2012
rem
@echo off
shift
shift

:mysub1
call ProReNumber %1 
rem echo "testing.. %1" 
for /F "delims=|" %%A in ('dir /B /AD-H') do (
cd %%A
call :mysub1 "%%~fA"
cd ..
)
echo.
