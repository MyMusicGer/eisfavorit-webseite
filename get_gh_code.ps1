$Code = & "C:\Program Files\GitHub CLI\gh.exe" auth login --web --hostname github.com -p https << 'EOF'
Y
EOF
Write-Output $Code
