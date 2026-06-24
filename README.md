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

目前共收录 **39** 座城市，覆盖 22 个省级行政区，包含：

| 类型 | 城市 |
|------|------|
| 古都 | 西安、南京、洛阳、北京、开封、成都、杭州、大同、邯郸... |
| 近代都会 | 上海、天津、广州、武汉、哈尔滨、重庆、青岛、深圳... |
| 特色之城 | 拉萨、敦煌、喀什、景德镇、延安、泉州、桂林、昆明... |

## 🏗️ 技术栈

| 技术 | 用途 |
|------|------|
| [Next.js](https://nextjs.org/) | React 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | 样式系统 |
| [Framer Motion](https://www.framer.com/motion/) | 动画效果 |
| [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) | 地图展示 |

## ➕ 添加新城市

1. 在 `public/data/cities/` 下创建 `{city-id}.json`
2. 在 `public/data/cities-index.json` 中添加索引（可选：设置 `"featured": true` 使其出现在首页精选）
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
│   │   ├── page.tsx          # 首页（精选城市）
│   │   ├── cities/           # 全部城市列表页
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
