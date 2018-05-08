ShA=new ActiveXObject("Shell.Application");
baseDir=WScript.ScriptFullName.substring(0, WScript.ScriptFullName.length-WScript.ScriptName.length);
WScript.Echo ("Path to current script =", baseDir);
ShA.ShellExecute(baseDir + "DPInstx64.exe","","","runas",5);
ShA.ShellExecute(baseDir + "DPInstx86.exe","","","runas",5);