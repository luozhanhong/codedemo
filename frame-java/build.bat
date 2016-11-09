@echo off
title 编译java

rd /s /q %cd%\share-core\src\java\com\share\core\protocol\protobuf
%cd%\protobuf\protoc\protoc.exe --java_out=%cd%\share-core\src\java\ --proto_path=%cd%\protobuf\pb\ %cd%\protobuf\pb\demo.proto

rd /s/q %cd%\.gradle\

:开启gradle daemon模式
del /s/q %USERPROFILE%\.gradle\gradle.properties
echo org.gradle.daemon=false > %USERPROFILE%\.gradle\gradle.properties

cd %cd%
for /f "tokens=*" %%a in ('dir /b') do (
   echo %%a | findstr "gu\-" && del /s /q %cd%\%%a\.classpath || cd %cd%
)
for /f "tokens=*" %%a in ('dir /b') do (
   echo %%a | findstr "gu\-" && del /s /q %cd%\%%a\.project || cd %cd%
)
for /f "tokens=*" %%a in ('dir /b') do (
   echo %%a | findstr "gu\-" && rd /s /q %cd%\%%a\.settings || cd %cd%
)
for /f "tokens=*" %%a in ('dir /b') do (
   echo %%a | findstr "gu\-" && rd /s /q %cd%\%%a\bin || cd %cd%
)
gradle clean eclipse && rd /s /q %cd%\.gradle\