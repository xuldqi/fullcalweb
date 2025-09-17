#!/bin/bash

# FullCal 服务器快速部署脚本
# 在服务器上执行此脚本即可完成配置

echo "🚀 开始配置 FullCal 服务器..."

# 1. 创建网站目录
echo "📁 创建网站目录..."
mkdir -p /var/www/fullcal
chown -R www-data:www-data /var/www/fullcal 2>/dev/null || chown -R nginx:nginx /var/www/fullcal
chmod -R 755 /var/www/fullcal

# 2. 从GitHub拉取最新代码
echo "📦 从GitHub拉取FullCal代码..."
cd /var/www/fullcal
if [ ! -d ".git" ]; then
    # 首次克隆
    git clone https://github.com/xuldqi/fullcalweb.git .
else
    # 更新代码
    git pull origin main
fi

# 3. 配置Nginx虚拟主机
echo "⚙️ 配置Nginx..."
cat > /etc/nginx/sites-available/fullcal << 'EOF'
server {
    listen 80;
    server_name fullcal.colletools.com;
    root /var/www/fullcal;
    index index.html;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static files
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /data/ {
        expires 1d;
    }
}
EOF

# 4. 启用站点
echo "🔗 启用FullCal站点..."
ln -sf /etc/nginx/sites-available/fullcal /etc/nginx/sites-enabled/

# 5. 测试配置
echo "🧪 测试Nginx配置..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx配置测试通过"
    systemctl reload nginx
    echo "🎉 Nginx已重新加载"
else
    echo "❌ Nginx配置有误，请检查"
    exit 1
fi

# 6. 设置正确权限
echo "🔒 设置文件权限..."
chown -R www-data:www-data /var/www/fullcal 2>/dev/null || chown -R nginx:nginx /var/www/fullcal
chmod -R 755 /var/www/fullcal
chmod 644 /var/www/fullcal/index.html

# 7. 显示状态
echo ""
echo "🎯 FullCal 部署完成！"
echo "📋 部署信息："
echo "   - 网站目录: /var/www/fullcal"
echo "   - Nginx配置: /etc/nginx/sites-available/fullcal"
echo "   - 域名: fullcal.colletools.com"
echo ""
echo "🌐 测试访问："
echo "   - http://fullcal.colletools.com"
echo "   - http://$(curl -s ifconfig.me)"
echo ""
echo "📝 如需SSL证书，执行："
echo "   certbot --nginx -d fullcal.colletools.com"
echo ""
echo "✅ 部署脚本执行完成！"