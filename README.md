# What Happened Here? 🗺️

> 这里发生了什么？—— 用时间线了解一座城市是如何形成的

**城市时间线档案馆**：每座城市都有自己的故事。除非去城市博物馆，否则很少有人能轻松了解一座地方城市的历史。这个网站帮你用最轻松的方式，探索城市的前世今生。

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ 核心功能

### 🏙️ 城市时间线（主打）

用时间线理解一座城市是如何形成的。

- 📅 **30 个关键节点** - 从古代到现代的城市发展脉络
- 🏷️ **时代筛选** - 按古代/近代/现代分类浏览
- 🔍 **城市搜索** - 快速找到想了解的城市
- 🗺️ **地图定位** - 在地图上查看城市位置

### 🏛️ 世界地标

探索世界著名地标的历史故事。

- 🔍 地点搜索（中英文模糊匹配）
- 📅 历史时间线（滚动动画）
- 🖼️ 历史照片画廊
- 🔗 相关地标推荐

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可访问（开发模式下 basePath 为空，无需加子路径）。

## 📍 已收录城市

| 城市 | 省份 | 时间节点 | 特色 |
|------|------|----------|------|
| 🏙️ 唐山 | 河北 | 30 个 | 近代工业摇篮、1976大地震重建 |
| 🏙️ 保定 | 河北 | 30 个 | 直隶省会三百年、保定军校 |
| 🏙️ 天津 | 天津 | 30 个 | 天子渡津、九国租界、近代工业 |

## 🌍 已收录地标（30个）

<details>
<summary>点击展开完整列表</summary>

**亚洲 (7)**：东京站、长城、泰姬陵、吴哥窟、富士山、双子塔、鱼尾狮

**欧洲 (11)**：埃菲尔铁塔、紫禁城、大本钟、斗兽场、雅典卫城、勃兰登堡门、圣家堂、巨石阵、塔桥、凡尔赛宫、圣米歇尔山

**美洲 (6)**：时代广场、自由女神像、马丘比丘、基督救世主雕像、金门大桥、拉什莫尔山

**非洲/中东 (4)**：吉萨金字塔、桌山、佩特拉古城、哈利法塔

**大洋洲 (1)**：悉尼歌剧院

**特殊**：维苏威火山/庞贝

</details>

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

## ➕ 添加新地标

1. 在 `public/data/` 下创建 `{location-id}.json`
2. 在 `public/data/locations.json` 中添加索引
3. 将图片放入 `public/images/`
4. 重新构建：`npm run build`

## 📁 项目结构

```
what-happened-here/
├── public/
│   ├── data/
│   │   ├── cities/           # 城市数据
│   │   ├── cities-index.json # 城市索引
│   │   ├── locations.json    # 地标索引
│   │   └── *.json            # 地标数据
│   └── images/
│       ├── cities/           # 城市封面图
│       └── ...               # 地标图片
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页
│   │   ├── city/[id]/        # 城市详情页
│   │   └── location/[id]/    # 地标详情页
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
