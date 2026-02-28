# Start Backend and Frontend Servers
Write-Host "🚀 Starting Smart Campus Application" -ForegroundColor Cyan

# Kill any existing node processes
Write-Host "Cleaning up any existing processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Start Backend Server
Write-Host "Starting backend server..." -ForegroundColor Yellow
$backendPath = "C:\Users\cvbnd\OneDrive\Desktop\clubmanagement1\smart-campus\ClubConnect\server"
$backend = Start-Process -FilePath "powershell.exe" -ArgumentList "-Command", "cd '$backendPath'; npm start" -PassThru -WindowStyle Normal

Write-Host "Backend PID: $($backend.Id)" -ForegroundColor Green
Start-Sleep -Seconds 3

# Setup test users
Write-Host "Setting up test users..." -ForegroundColor Yellow
& "node" "$backendPath\ensureTestUsers.js" | Out-Host

# Start Frontend Server
Write-Host "Starting frontend server..." -ForegroundColor Yellow
$clientPath = "C:\Users\cvbnd\OneDrive\Desktop\clubmanagement1\smart-campus\ClubConnect\client"
$frontend = Start-Process -FilePath "powershell.exe" -ArgumentList "-Command", "cd '$clientPath'; npm run dev" -PassThru -WindowStyle Normal

Write-Host "Frontend PID: $($frontend.Id)" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Servers Started!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Login Credentials:" -ForegroundColor Yellow
Write-Host "  Admin:       admin@test.com / password123" -ForegroundColor White
Write-Host "  Coordinator: coordinator@test.com / password123" -ForegroundColor White
Write-Host "  Student:     student@test.com / password123" -ForegroundColor White
Write-Host ""
