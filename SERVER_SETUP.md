# 🚀 服务器部署指南

## 📦 自动部署 (推荐)

在服务器上执行一条命令即可完成所有配置：

```bash
# SSH连接到服务器
ssh root@107.174.250.34

# 下载并执行部署脚本
curl -fsSL https://raw.githubusercontent.com/xuldqi/fullcalweb/main/server-deploy.sh | bash
```

## 🔧 手动部署步骤

如果自动脚本无法执行，可以手动操作：

### 1. 创建目录并拉取代码
```bash
mkdir -p /var/www/fullcal
cd /var/www/fullcal
git clone https://github.com/xuldqi/fullcalweb.git .
```

### 2. 配置Nginx
```bash
# 创建虚拟主机配置
cp nginx-config/fullcal.conf /etc/nginx/sites-available/fullcal

# 启用站点
ln -sf /etc/nginx/sites-available/fullcal /etc/nginx/sites-enabled/

# 测试并重载
nginx -t && systemctl reload nginx
```

### 3. 设置权限
```bash
chown -R www-data:www-data /var/www/fullcal
chmod -R 755 /var/www/fullcal
```

## 🌐 DNS配置确认

确保您的DNS记录正确：
```
类型: A
主机: fullcal
数据: 107.174.250.34
TTL: 3600
```

## ✅ 完成后测试

1. **HTTP访问**: http://fullcal.colletools.com
2. **IP访问**: http://107.174.250.34 
3. **功能测试**: 验证所有计算器正常工作

## 🔒 SSL证书 (可选)

```bash
# 安装Let's Encrypt证书
certbot --nginx -d fullcal.colletools.com
```

## 🔄 更新网站

以后更新网站内容：
```bash
cd /var/www/fullcal
git pull origin main
```

---
**现在您可以在服务器上快速部署FullCal了！** 🎉