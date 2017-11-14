@echo off
set PORT=8091,8092
set RULE_NAME="Open Port %PORT% in for AsTeRICS-Ergo"
set RULE_NAME_OUT="Open Port %PORT% out for AsTeRICS-Ergo"

:: disable existing, auto-generated rules for "asterics ergo.exe"
netsh advfirewall firewall set rule name="asterics ergo.exe" new enable=no
netsh advfirewall firewall set rule name="asterics ergo" new enable=no

:: add or set rule for in-traffic
netsh advfirewall firewall show rule name=%RULE_NAME% >nul
if not ERRORLEVEL 1 (
    echo Rule %RULE_NAME% already existing. Make sure that correct properties are set and rule is activated...
	netsh advfirewall firewall set rule name=%RULE_NAME% new enable=yes program="%LOCALAPPDATA%\asterics ergo\asterics ergo.exe" dir=in action=allow protocol=TCP localport=%PORT%
) else (
    echo Rule %RULE_NAME% does not exist. Creating...
    netsh advfirewall firewall add rule name=%RULE_NAME% program="%LOCALAPPDATA%\asterics ergo\asterics ergo.exe" dir=in action=allow protocol=TCP localport=%PORT%
)

:: add or set rule for out-traffic
netsh advfirewall firewall show rule name=%RULE_NAME_OUT% >nul
if not ERRORLEVEL 1 (
    echo Rule %RULE_NAME_OUT% already existing. Make sure that correct properties are set and rule is activated...
	netsh advfirewall firewall set rule name=%RULE_NAME_OUT% new enable=yes program="%LOCALAPPDATA%\asterics ergo\asterics ergo.exe" dir=in action=allow protocol=TCP localport=%PORT%
) else (
    echo Rule %RULE_NAME_OUT% does not exist. Creating...
    netsh advfirewall firewall add rule name=%RULE_NAME_OUT% program="%LOCALAPPDATA%\asterics ergo\asterics ergo.exe" dir=in action=allow protocol=TCP localport=%PORT%
)