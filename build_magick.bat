SET SCRIPT_DIR=%~dp0

FOR /F "tokens=*" %%g IN ('"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -prerelease -products * -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe') do (SET MSBUILD=%%g)

cd %SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick
"%MSBUILD%" VisualStaticMT.sln /m /t:Rebuild %2
cd %SCRIPT_DIR%

SET DEST=%1\ImageMagick
ECHO SCRIPT_DIR IS %SCRIPT_DIR%, DEST IS %DEST%, %1
rd /q /s %DEST%
mkdir %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\*.exe" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\config\colors.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\config\english.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\config\locale.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\config\log.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\config\mime.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\config\quantization-table.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\configure.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\ImageMagick.rdf" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\delegates.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\policy.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\sRGB.icc" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\thresholds.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\type-ghostscript.xml" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\bin\type.xml" %DEST%

copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\LICENSE" %DEST%\LICENSE.txt
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\VisualMagick\NOTICE.txt" %DEST%
copy "%SCRIPT_DIR%\deps\ImageMagick-Windows\ImageMagick\README.txt" %DEST%
