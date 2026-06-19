# What Happened Here? 🗺️

> 站在这里，过去发生过什么？

一个基于地点与时间的历史探索网站。选择一个地标，通过时间轴浏览它在不同年代的重要历史事件、照片和背景故事。

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ 功能特色

- 🔍 **地点搜索** - 支持中英文模糊搜索
- 📅 **历史时间线** - 滚动动画展示历史事件
- 🖼️ **历史照片** - 点击放大查看珍贵影像
- 🗺️ **地图定位** - 在 OpenStreetMap 上查看地点位置
- 🔗 **相关推荐** - 发现同城市、同国家的其他地标

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可访问。

## 📍 当前收录地点

| 地点 | 国家 | 城市 |
|------|------|------|
| 东京站 | 🇯🇵 日本 | 东京 |
| 埃菲尔铁塔 | 🇫🇷 法国 | 巴黎 |
| 紫禁城 | 🇨🇳 中国 | 北京 |
| 时代广场 | 🇺🇸 美国 | 纽约 |
| 大本钟 | 🇬🇧 英国 | 伦敦 |

## 🏗️ 技术栈

| 技术 | 用途 |
|------|------|
| [Next.js](https://nextjs.org/) | React 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | 样式系统 |
| [Framer Motion](https://www.framer.com/motion/) | 动画效果 |
| [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) | 地图展示 |

## 📦 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. Source 选择 "GitHub Actions"
4. 推送代码后会自动部署

## 📁 项目结构

```
what-happened-here/
├── public/
│   ├── data/           # 地点数据 (JSON)
│   └── images/         # 历史照片
├── src/
│   ├── app/            # 页面路由
│   ├── components/     # React 组件
│   ├── lib/            # 工具函数
│   └── types/          # TypeScript 类型
└── ...
```

## ➕ 添加新地点

1. 在 `public/data/` 下创建 `{location-id}.json`
2. 在 `public/data/locations.json` 中添加索引
3. 将图片放入 `public/images/`
4. 重新构建：`npm run build`

详细数据格式请参考 [CLAUDE.md](./CLAUDE.md)。

## 📄 开源协议

MIT

## 🙏 致谢

- 历史照片来源：[Unsplash](https://unsplash.com/)
- 地图数据：[OpenStreetMap](https://www.openstreetmap.org/)
