#!/bin/bash

# FullCal Server Connection Script
# Server: 107.174.250.34
# User: root
# Password: M9pj4x52BPPl1aLbH6

echo "=== FullCal Server Connection Guide ==="
echo ""
echo "Server Details:"
echo "IP: 107.174.250.34"
echo "User: root"
echo "Password: M9pj4x52BPPl1aLbH6"
echo ""

echo "Connection Methods:"
echo ""

echo "1. SSH Command Line:"
echo "ssh root@107.174.250.34"
echo "然后输入密码: M9pj4x52BPPl1aLbH6"
echo ""

echo "2. SCP Upload Files:"
echo "scp -r calweb/* root@107.174.250.34:/var/www/html/"
echo ""

echo "3. Using SSH with password (sshpass):"
echo "sshpass -p 'M9pj4x52BPPl1aLbH6' ssh root@107.174.250.34"
echo ""

echo "4. PuTTY (Windows):"
echo "Host: 107.174.250.34"
echo "Port: 22"
echo "Username: root"
echo "Password: M9pj4x52BPPl1aLbH6"
echo ""

echo "=== Server Setup Commands ==="
echo ""

# Check if server has web server installed
echo "# Check server status"
echo "ssh root@107.174.250.34 << 'EOF'"
echo "echo 'Checking server...'"
echo "uname -a"
echo "cat /etc/os-release"
echo "which nginx apache2 httpd"
echo "systemctl status nginx"
echo "systemctl status apache2"
echo "ls -la /var/www/"
echo "EOF"