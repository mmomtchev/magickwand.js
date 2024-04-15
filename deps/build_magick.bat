SET SCRIPT_DIR=%~dp0

FOR /F "tokens=*" %%g IN ('"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -prerelease -products * -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe') do (SET MSBUILD=%%g)

cd %SCRIPT_DIR%\ImageMagick-Windows
"%MSBUILD%" IM7.Static.sln /m /t:Rebuild %2
cd %SCRIPT_DIR%\..

SET DEST=%1\ImageMagick
ECHO SCRIPT_DIR IS %SCRIPT_DIR%, DEST IS %DEST%, %1
rd /q /s %DEST%
mkdir %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\ImageMagick\config\colors.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\ImageMagick\config\english.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\ImageMagick\config\locale.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\ImageMagick\config\log.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\ImageMagick\config\mime.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\ImageMagick\config\quantization-table.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\Output\bin\configure.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\Output\bin\delegates.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\Output\bin\policy.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\Output\bin\sRGB.icc" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\Output\bin\thresholds.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\Output\bin\type-ghostscript.xml" %DEST%
copy "%SCRIPT_DIR%\ImageMagick-Windows\Output\bin\type.xml" %DEST%

copy "%SCRIPT_DIR%\ImageMagick-Windows\ImageMagick\LICENSE" %DEST%\LICENSE.txt
