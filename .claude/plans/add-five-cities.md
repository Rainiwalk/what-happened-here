# 新增 5 座城市计划

## 目标城市
- 北京 (beijing) - 首都，政治文化中心
- 上海 (shanghai) - 经济中心，东方巴黎
- 广州 (guangzhou) - 南方门户，千年商都
- 深圳 (shenzhen) - 改革开放窗口
- 重庆 (chongqing) - 山城，战时首都

## 实施步骤

1. **创建城市数据文件** - 在 `public/data/cities/` 下创建 5 个 JSON 文件，每个包含 30 个时间节点
2. **更新城市索引** - 在 `public/data/cities-index.json` 中添加 5 个新条目
3. **添加封面图片** - 在 `public/images/cities/` 下添加 5 张封面图

## 数据格式要求

- `id`: 小写英文名
- `name`: 英文名
- `nameLocal`: 中文名
- `province`: 省/直辖市
- `lat`, `lng`: 坐标
- `summary`: 一句话简介
- `description`: 详细描述
- `coverImage`: `/images/cities/{id}.jpg`
- `timeline`: 30 个事件，每个包含 `year`, `era`, `title`, `description`
  - `era`: `ancient` (古代), `modern` (近代), `contemporary` (现代)

## 注意事项

- 中文引号使用 Unicode 弯引号（"..."），不要使用 ASCII 双引号
- JSON 必须是合法格式
- 图片路径不带 `/WhatHappenedHere` 前缀
