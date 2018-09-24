;This file will be executed next to the application bundle image
;I.e. current directory will contain folder AsTeRICS Ergo with application files
[Setup]
AppId={{AsTeRICS Ergo}}
AppName=AsTeRICS Ergo
AppVersion=4.2.1
;AppVerName=AsTeRICS Ergo 4.2.1
AppPublisher=Asterics consortium
AppComments=Assistive Technology for Occupational Therapy
AppCopyright=Copyright (C) 2017
;AppPublisherURL=http://java.com/
;AppSupportURL=http://java.com/
;AppUpdatesURL=http://java.com/
DefaultDirName={localappdata}\AsTeRICS Ergo
DisableStartupPrompt=Yes
DisableDirPage=Yes
DisableProgramGroupPage=Yes
DisableReadyPage=Yes
DisableFinishedPage=No
DisableWelcomePage=No
DefaultGroupName=Asterics consortium
;Optional License
LicenseFile=
;WinXP or above
MinVersion=0,5.1 
OutputBaseFilename=AsTeRICS Ergo-4.2.1
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
SetupIconFile=AsTeRICS Ergo\AsTeRICS Ergo.ico
UninstallDisplayIcon={app}\AsTeRICS Ergo.ico
UninstallDisplayName=AsTeRICS Ergo
WizardImageStretch=No
WizardSmallImageFile=AsTeRICS Ergo-setup-icon.bmp   
ArchitecturesInstallIn64BitMode=


[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "de"; MessagesFile: "compiler:Languages\German.isl"
Name: "es"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "fr"; MessagesFile: "compiler:Languages\French.isl"

[Files]
Source: "AsTeRICS Ergo\AsTeRICS Ergo.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "AsTeRICS Ergo\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\AsTeRICS Ergo"; Filename: "{app}\AsTeRICS Ergo.exe"; IconFilename: "{app}\AsTeRICS Ergo.ico"; Check: returnTrue()
Name: "{commondesktop}\AsTeRICS Ergo"; Filename: "{app}\AsTeRICS Ergo.exe";  IconFilename: "{app}\AsTeRICS Ergo.ico"; Check: returnTrue()


[Run]
Filename: "{app}\AsTeRICS Ergo.exe"; Parameters: "-Xappcds:generatecache"; Check: returnFalse()
Filename: "{app}\AsTeRICS Ergo.exe"; Description: "{cm:LaunchProgram,AsTeRICS Ergo}"; Flags: nowait postinstall skipifsilent; Check: returnTrue()
Filename: "{app}\AsTeRICS Ergo.exe"; Parameters: "-install -svcName ""AsTeRICS Ergo"" -svcDesc ""Assistive Technology Application based on AsTeRICS for Occupational Therapy"" -mainExe ""AsTeRICS Ergo.exe""  "; Check: returnFalse()
Filename: "{app}\app\tools\fixfirewall.bat";

[UninstallRun]
Filename: "taskkill"; Parameters: "/f /im ""AsTeRICS Ergo.exe"""; Flags: runhidden
Filename: "{app}\AsTeRICS Ergo.exe "; Parameters: "-uninstall -svcName AsTeRICS Ergo -stopOnUninstall"; Check: returnFalse()

[UninstallDelete]
Type: filesandordirs; Name: "{app}\app\profile"
Type: filesandordirs; Name: "{app}\app\tmp"

[Code]
function returnTrue(): Boolean;
begin
  Result := True;
end;

function returnFalse(): Boolean;
begin
  Result := False;
end;

function InitializeSetup(): Boolean;
var
  UninstallPath : String;
  RegPath : String;
  InfoString: String;
  ResultCode: Integer;
begin
  RegPath := 'Software\Microsoft\Windows\CurrentVersion\Uninstall\{AsTeRICS Ergo}}_is1';
  if RegValueExists(HKEY_LOCAL_MACHINE, RegPath, 'UninstallString') then  //Your App GUID/ID
  begin
    RegQueryStringValue(HKEY_LOCAL_MACHINE, RegPath, 'UninstallString', UninstallPath);
  end;

  RegPath := 'Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\{AsTeRICS Ergo}}_is1';
  if RegValueExists(HKEY_LOCAL_MACHINE,RegPath, 'UninstallString') then  //Your App GUID/ID
  begin
    RegQueryStringValue(HKEY_LOCAL_MACHINE, RegPath, 'UninstallString', UninstallPath);
  end;

  if Length(UninstallPath) > 0 then
  begin
	  if ExpandConstant('{language}') = 'de' then
		begin
		InfoString := 'Es wurde eine alte Version von AsTeRICS Ergo auf Ihrem Computer festgestellt. M' + #$00F6 + 'chten Sie diese deinstallieren (empfohlen)? Die Konfiguration der alten Version bleibt dabei erhalten und wird nicht gel' + #$00F6 + 'scht.';
		end
	  else
		begin
		InfoString := 'An old version of AsTeRCIS Ergo was detected. Do you want to uninstall it (recommended)? The configuration of the old version will not be deleted.';
		end;
	  if MsgBox(InfoString, mbConfirmation, MB_YESNO) = IDYES then
	  begin
		Exec(RemoveQuotes(ExpandConstant(UninstallPath)),'', '', SW_SHOW,ewWaitUntilTerminated, ResultCode);
	  end; 
  end;

  Result := True;
end;  
