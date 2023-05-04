SET SCRIPT_DIR=%~dp0

cd %SCRIPT_DIR%\deps\ImageMagick-Windows
(rd /q /s ImageMagick) ^& if %ERRORLEVEL% leq 1 set ERRORLEVEL = 0
call CloneRepositories.cmd
rd /q /s ImageMagick
mklink /J ImageMagick ..\ImageMagick
cd %SCRIPT_DIR%

mkdir build\bin
if not exist "deps\ImageMagick-Windows\VisualMagick\bin\ffmpeg.exe" (
  powershell Invoke-WebRequest -Uri https://github.com/ImageMagick/ImageMagick-Windows/releases/download/20200615/ffmpeg-4.2.3-win64.exe -OutFile deps\ImageMagick-Windows\VisualMagick\bin\ffmpeg.exe
)
cd deps\ImageMagick-Windows\VisualMagick\configure
FOR /F "tokens=*" %%g IN ('"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -prerelease -products * -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe') do (SET MSBUILD=%%g)

"%MSBUILD%" configure.2022.sln /m /t:Rebuild /p:Configuration=Release,Platform=x64
configure.exe /noWizard /VS2022 /HDRI /Q16 /x64 /smt

exit /b 0
