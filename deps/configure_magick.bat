SET SCRIPT_DIR=%~dp0

cd %SCRIPT_DIR%
(rd /q /s ImageMagick) ^& if %ERRORLEVEL% leq 1 set ERRORLEVEL = 0
cd ImageMagick-Windows
call CloneRepositories.IM7.cmd

cd %SCRIPT_DIR%
mklink /J ImageMagick ImageMagick-Windows\ImageMagick

cd %SCRIPT_DIR%\..
if not exist "deps\ImageMagick-Windows\Build\bin\ffmpeg.exe" (
  powershell Invoke-WebRequest -Uri https://github.com/ImageMagick/ImageMagick-Windows/releases/download/20200615/ffmpeg-4.2.3-win64.exe -OutFile deps\ImageMagick-Windows\Build\bin\ffmpeg.exe
)
cd deps\ImageMagick-Windows\Configure
FOR /F "tokens=*" %%g IN ('"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -prerelease -products * -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe') do (SET MSBUILD=%%g)

"%MSBUILD%" Configure.sln /m /t:Rebuild /p:Configuration=Release,Platform=x64
Configure.exe /noWizard /VS2022 /HDRI /Q16 /x64 /smt

exit /b 0
