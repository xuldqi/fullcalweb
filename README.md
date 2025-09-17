# FullCal
完整的多国税务计算器系统 - 100%复刻 tuttocalcolato.it

## 🌟 功能特色
- 📊 **20+ 计算器**: 税务、贷款、投资、健康、体育等
- 🌍 **8国支持**: 美国、中国、英国、德国、日本、法国、加拿大、澳大利亚
- 💰 **7种货币**: USD, CNY, GBP, EUR, JPY, CAD, AUD
- 🔒 **隐私优先**: 100%本地计算，无外部依赖
- 📱 **响应式设计**: 完美支持移动设备
- ⚡ **离线支持**: PWA架构，可离线使用

## 📋 计算器列表

### 💼 金融类
- 个人所得税计算器
- 抵押贷款计算器
- 贷款计算器
- 投资回报计算器
- 复利计算器

### 📊 工具类
- 时间计算器
- 单位转换器
- 百分比计算器
- 折扣计算器

### 💪 健康类
- BMI计算器
- 卡路里计算器
- 理想体重计算器

### 🏃 运动类
- 跑步配速计算器
- 燃烧卡路里计算器

## 🚀 部署说明

### 方法1: GitHub Pages (推荐)
1. Fork 此仓库
2. 在 Settings > Pages 中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://yourusername.github.io/fullcal`

### 方法2: 服务器部署
1. 下载所有文件到 web 服务器
2. 配置 Nginx/Apache (配置文件已包含)
3. 设置正确的文件权限
4. 配置 SSL 证书

## 🌐 在线演示
- 演示地址: https://fullcal.colletools.com
- 服务器: 107.174.250.34

## 🔧 技术架构
- **前端**: 纯 HTML5 + CSS3 + JavaScript
- **框架**: 无依赖，纯原生开发
- **样式**: CSS Grid + Flexbox 响应式布局
- **数据**: JSON 配置文件，支持多国税务规则
- **缓存**: LocalStorage 本地存储

## 📦 项目结构
```
├── index.html              # 主页面
├── css/
│   └── style.css           # 样式文件
├── js/
│   ├── main.js             # 主逻辑
│   ├── calculators.js      # 计算器界面
│   ├── calculator-implementations.js  # 计算逻辑
│   ├── tax-config.js       # 税务配置
│   └── auto-tax-updater.js # 自动更新系统
├── data/                   # 各国税务数据
│   ├── us-tax-2024.json
│   ├── cn-tax-2024.json
│   └── ...
└── nginx-config/           # 服务器配置
    └── fullcal.conf
```

## 🌍 支持的国家和地区

| 国家 | 货币 | 税务系统 | 特殊规则 |
|------|------|----------|----------|
| 🇺🇸 美国 | USD | 联邦+州税 | 累进税率 |
| 🇨🇳 中国 | CNY | 个税+社保 | 专项扣除 |
| 🇬🇧 英国 | GBP | PAYE | 国保缴费 |
| 🇩🇪 德国 | EUR | 教会税+团结税 | 分级税率 |
| 🇯🇵 日本 | JPY | 所得税+住民税 | 雇佣保险 |
| 🇫🇷 法国 | EUR | 累进税 | 社会缴费 |
| 🇨🇦 加拿大 | CAD | 联邦+省税 | CPP/EI |
| 🇦🇺 澳大利亚 | AUD | 个税+Medicare | 超级年金 |

## 📄 开源协议
MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南
欢迎提交 Issues 和 Pull Requests 来完善这个项目！

---
⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！