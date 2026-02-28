#!/bin/bash
# Start backend server on port 5000
echo "Starting backend server..."
cd server
npm start &
BACKEND_PID=$!
sleep 3

# Create test users
echo "Setting up test users..."
node ensureTestUsers.js

# Start frontend on port 5173
echo "Starting frontend server..."
cd ../client
npm run dev &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Login Credentials:"
echo "  Admin: admin@test.com / password123"
echo "  Coordinator: coordinator@test.com / password123"
echo "  Student: student@test.com / password123"

wait
