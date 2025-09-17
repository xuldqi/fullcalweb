# 🚀 GitHub仓库创建和部署指南

## 📦 Git仓库已初始化
✅ 本地仓库已创建并提交所有文件

## 🌐 创建GitHub仓库

### 方法1: 使用GitHub CLI (推荐)
```bash
# 如果已安装 gh CLI
gh repo create fullcal --public --description "完整的多国税务计算器系统 - 100%复刻 tuttocalcolato.it"
git branch -M main
git remote add origin https://github.com/yourusername/fullcal.git
git push -u origin main
```

### 方法2: 手动创建 (简单)
1. 访问 https://github.com/new
2. 仓库名称: `fullcal`
3. 描述: `完整的多国税务计算器系统 - 100%复刻 tuttocalcolato.it`
4. 选择 Public
5. 不要初始化 README (我们已经有了)
6. 点击 Create repository

然后在终端执行:
```bash
git branch -M main
git remote add origin https://github.com/你的用户名/fullcal.git
git push -u origin main
```

## ⚡ 快速部署到服务器

创建GitHub仓库后，服务器部署变得超级简单：

```bash
# SSH连接到服务器 (如果连接成功)
ssh root@107.174.250.34

# 直接从GitHub克隆
cd /var/www/html
git clone https://github.com/你的用户名/fullcal.git .

# 设置权限
chown -R www-data:www-data /var/www/html/
chmod -R 755 /var/www/html/

# 配置Nginx
cp nginx-config/fullcal.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/fullcal.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 🔧 GitHub Pages 部署 (备选方案)

如果服务器连接有问题，可以直接用GitHub Pages:

1. 创建仓库后，进入 Settings > Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 `main`
4. 保存设置
5. 访问 `https://你的用户名.github.io/fullcal`

## 🌍 域名指向

无论用哪种方法部署，都可以配置DNS:
```
Type: CNAME
Name: fullcal
Target: 你的用户名.github.io (GitHub Pages)
或者: colletools.com (服务器)
```

---
**GitHub方式部署更简单可靠！** 🎉