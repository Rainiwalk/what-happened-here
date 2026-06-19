# What Happened Here? 🗺️

> 5分钟，了解一座城

大多数人知道一座城市今天是什么样子，却很少知道它是如何变成今天这个样子的。

用5分钟时间，看懂一座城市的前世今生。

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ 核心功能

### 🏙️ 城市时间线

用时间线理解一座城市是如何形成的。

- 📅 **30 个关键节点** - 从古代到现代的城市发展脉络
- 🏷️ **时代筛选** - 按古代/近代/现代分类浏览
- 🔍 **城市搜索** - 快速找到想了解的城市
- 🗺️ **地图定位** - 在地图上查看城市位置
- 🗺️ **历史通道** - 丝绸之路、大运河等城市间的历史联系
- ➡️ **城市导航** - 左右箭头快速切换到其他城市

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可访问（开发模式下 basePath 为空，无需加子路径）。

## 📍 已收录城市

| 城市 | 省份 | 特色 |
|------|------|------|
| 🏙️ 唐山 | 河北 | 近代工业摇篮、1976大地震重建 |
| 🏙️ 保定 | 河北 | 直隶省会三百年、保定军校 |
| 🏙️ 天津 | 天津 | 天子渡津、九国租界、近代工业 |
| 🏙️ 西安 | 陕西 | 十三朝古都、丝绸之路起点 |
| 🏙️ 南京 | 江苏 | 六朝古都、民国首都 |
| 🏙️ 成都 | 四川 | 天府之国、蜀汉都城 |
| 🏙️ 杭州 | 浙江 | 南宋都城、西湖所在地 |
| 🏙️ 洛阳 | 河南 | 十三朝古都、龙门石窟 |
| 🏙️ 北京 | 北京 | 首都、三千年建城史 |
| 🏙️ 上海 | 上海 | 东方巴黎、全球金融中心 |
| 🏙️ 广州 | 广东 | 千年商都、海上丝绸之路起点 |
| 🏙️ 深圳 | 广东 | 改革开放窗口、创新之城 |
| 🏙️ 重庆 | 重庆 | 山城、战时陪都、火锅之都 |
| 🏙️ 苏州 | 江苏 | 园林之城、人间天堂、吴文化发祥地 |
| 🏙️ 武汉 | 湖北 | 九省通衢、辛亥首义之城 |
| 🏙️ 长沙 | 湖南 | 楚汉名城、岳麓书院、橘子洲头 |
| 🏙️ 哈尔滨 | 黑龙江 | 冰城、东方莫斯科、中西文化交融 |
| 🏙️ 开封 | 河南 | 八朝古都、北宋东京、清明上河图 |
| 🏙️ 泉州 | 福建 | 海上丝绸之路起点、世界宗教博物馆 |
| 🏙️ 扬州 | 江苏 | 运河之城、烟花三月下扬州、盐商文化 |
| 🏙️ 青岛 | 山东 | 啤酒之城、帆船之都、欧韵港城 |
| 🏙️ 拉萨 | 西藏 | 日光城、藏传佛教圣地、布达拉宫 |
| 🏙️ 敦煌 | 甘肃 | 丝路明珠、莫高窟、飞天艺术 |
| 🏙️ 昆明 | 云南 | 春城、滇池、西南联大、南诏古都 |
| 🏙️ 郑州 | 河南 | 商代都城、铁路枢纽、中原腹地 |
| 🏙️ 喀什 | 新疆 | 丝路重镇、西域文化、维吾尔风情 |
| 🏙️ 大同 | 山西 | 北魏都城、云冈石窟、煤都转型 |
| 🏙️ 景德镇 | 江西 | 千年瓷都、御窑遗址、陶瓷文化 |
| 🏙️ 桂林 | 广西 | 山水甲天下、灵渠、抗战文化城 |
| 🏙️ 延安 | 陕西 | 革命圣地、黄帝陵、延安精神 |

## 🏗️ 技术栈

| 技术 | 用途 |
|------|------|
| [Next.js](https://nextjs.org/) | React 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | 样式系统 |
| [Framer Motion](https://www.framer.com/motion/) | 动画效果 |
| [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) | 地图展示 |

## 📦 部署到 GitHub Pages

### 前置条件

1. 将代码推送到 GitHub 仓库 `WhatHappenedHere`
2. 进入仓库 Settings → Pages
3. Source 选择 "GitHub Actions"

### 自动部署

推送代码到 `main` 分支后，GitHub Actions 会自动构建并部署。

部署后访问：`https://your-username.github.io/WhatHappenedHere`

### 本地预览

```bash
# 构建静态文件
npm run build

# 本地预览（使用 serve）
npx serve out
```

## ➕ 添加新城市

1. 在 `public/data/cities/` 下创建 `{city-id}.json`
2. 在 `public/data/cities-index.json` 中添加索引
3. 将封面图片放入 `public/images/cities/`
4. 重新构建：`npm run build`

详细数据格式请参考 [AGENTS.md](./AGENTS.md)。

## 📋 Development Rules

- 使用统一 Commit Message 规范
- 历史内容更新使用 `Data`
- 新功能使用 `Feat`
- 详细规范见 [AGENTS.md](./AGENTS.md)

## 📁 项目结构

```
what-happened-here/
├── public/
│   ├── data/
│   │   ├── cities/           # 城市数据
│   │   └── cities-index.json # 城市索引
│   └── images/
│       └── cities/           # 城市封面图
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页
│   │   └── city/[id]/        # 城市详情页
│   ├── components/           # React 组件
│   └── lib/                  # 数据工具函数
└── ...
```

## 💡 项目灵感

> "世界知名景点每个人都可以通过各种平台了解到它的历史，但是到了一些城市级，除非去城市博物馆，不然很少有人想去百科里看它的发展。我的网站正好帮他们找到轻松的方式。"

## 📄 开源协议

MIT

## 🙏 致谢

- 历史照片来源：[Unsplash](https://unsplash.com/)
- 地图数据：[OpenStreetMap](https://www.openstreetmap.org/)
