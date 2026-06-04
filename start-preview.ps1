$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Workspace = Split-Path -Parent $Root
$NodeDir = Join-Path $Workspace '.tools\node-v22.16.0-win-x64'
$NodeExe = Join-Path $NodeDir 'node.exe'
$CurrentPath = [Environment]::GetEnvironmentVariable('Path', 'Process')
if (-not $CurrentPath) {
  $CurrentPath = [Environment]::GetEnvironmentVariable('PATH', 'Process')
}
[Environment]::SetEnvironmentVariable('PATH', $null, 'Process')
[Environment]::SetEnvironmentVariable('Path', "$NodeDir;$CurrentPath", 'Process')

if (-not (Test-Path -LiteralPath $NodeExe)) {
  Write-Host "Portable Node was not found:"
  Write-Host "  $NodeExe"
  exit 1
}

$Logs = Join-Path $Root 'logs'
if (-not (Test-Path -LiteralPath $Logs)) {
  New-Item -ItemType Directory -Path $Logs | Out-Null
}

$EnvFile = Join-Path $Root '.env'
$EnvExample = Join-Path $Root '.env.example'
if ((-not (Test-Path -LiteralPath $EnvFile)) -and (Test-Path -LiteralPath $EnvExample)) {
  Copy-Item -LiteralPath $EnvExample -Destination $EnvFile
}

$ServerFile = Join-Path $Root 'server\index.js'
$ViteFile = Join-Path $Root 'node_modules\vite\bin\vite.js'

& $NodeExe $ViteFile 'build'

$ApiPortOpen = Test-NetConnection -ComputerName 127.0.0.1 -Port 5511 -InformationLevel Quiet
if (-not $ApiPortOpen) {
  Start-Process -FilePath $NodeExe -ArgumentList @($ServerFile) -WorkingDirectory $Root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $Logs 'server.log') -RedirectStandardError (Join-Path $Logs 'server.err.log')
}

$WebPortOpen = Test-NetConnection -ComputerName 127.0.0.1 -Port 5510 -InformationLevel Quiet
if (-not $WebPortOpen) {
  Start-Process -FilePath $NodeExe -ArgumentList @($ViteFile, '--host', '127.0.0.1', '--port', '5510') -WorkingDirectory $Root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $Logs 'vite.log') -RedirectStandardError (Join-Path $Logs 'vite.err.log')
}

Write-Host 'Preview started:'
Write-Host '  http://127.0.0.1:5510'
Write-Host 'API:'
Write-Host '  http://127.0.0.1:5511'
