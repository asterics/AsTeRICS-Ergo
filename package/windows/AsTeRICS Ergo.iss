;This file will be executed next to the application bundle image
;I.e. current directory will contain folder AsTeRICS Ergo with application files
[Setup]
AppId={{fxApplication}}
AppName=AsTeRICS Ergo
AppVersion=3.1.0
AppVerName=AsTeRICS Ergo 3.1.0
AppPublisher=Asterics consortium
AppComments=Assistive Technology for Occupational Therapy
AppCopyright=Copyright (C) 2017
;AppPublisherURL=http://java.com/
;AppSupportURL=http://java.com/
;AppUpdatesURL=http://java.com/
DefaultDirName={pf}\AsTeRICS Ergo
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
OutputBaseFilename=AsTeRICS Ergo-3.1.0
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
Name: "en"; MessagesFile: "compiler:Default.isl"
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

[UninstallRun]
Filename: "{app}\AsTeRICS Ergo.exe "; Parameters: "-uninstall -svcName AsTeRICS Ergo -stopOnUninstall"; Check: returnFalse()

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
begin
// Possible future improvements:
//   if version less or same => just launch app
//   if upgrade => check if same app is running and wait for it to exit
//   Add pack200/unpack200 support? 
  Result := True;
end;  
