@echo off
del js.txt
for /r %%i in (*.js) do echo %%i >> js.txt
java Main
zip a -y -tzip "./output" "./output" -mx5
FOR %%? IN (output.zip) DO (
	ECHO File Name Only       : %%~n?
	ECHO File Size            : %%~z?
	ECHO Last-Modified Date   : %%~t?
)
