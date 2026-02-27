$processInfo = New-Object System.Diagnostics.ProcessStartInfo
$processInfo.FileName = "C:\Program Files\GitHub CLI\gh.exe"
$processInfo.Arguments = "auth login --web --hostname github.com -p https"
$processInfo.RedirectStandardOutput = $true
$processInfo.RedirectStandardError = $true
$processInfo.UseShellExecute = $false
$processInfo.CreateNoWindow = $true

$process = [System.Diagnostics.Process]::Start($processInfo)
$stdout = $process.StandardOutput.ReadToEnd()
$stderr = $process.StandardError.ReadToEnd()
$process.WaitForExit()

Write-Output "STDOUT:"
Write-Output $stdout
Write-Output "STDERR:"
Write-Output $stderr
