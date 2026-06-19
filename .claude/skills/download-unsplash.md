# download-unsplash

从 Unsplash 下载城市封面图片到项目中。

## 使用方式

```
/download-unsplash
```

可选参数：
- 城市ID（如 `suzhou`）
- Unsplash 图片URL
- `all` — 批量处理所有缺少封面图的城市

## 执行流程

### Step 1: 确定目标城市

- 如果用户指定了城市ID，直接使用
- 如果用户输入 `all`，扫描 `public/images/cities/` 找出缺少封面图或封面图为 0 字节的城市
- 如果未指定，列出所有缺少封面图的城市供用户选择

缺少封面图的判断标准：
- 文件不存在
- 文件大小为 0 字节

### Step 2: 搜索建议（引导用户手动搜索）

由于 Unsplash 有反爬保护，采用「用户搜索 + 自动下载」模式：

1. 为用户提供精确的 Unsplash 搜索关键词建议
2. 引导用户在浏览器中打开 Unsplash 搜索页面
3. 用户找到合适的图片后，复制图片的 Unsplash 页面 URL

#### 搜索关键词建议表

| 城市ID | 城市名 | 推荐搜索词 |
|--------|--------|-----------|
| suzhou | 苏州 | `Suzhou garden classical` 或 `Humble Administrator's Garden` |
| wuhan | 武汉 | `Wuhan skyline Yangtze` 或 `Wuhan city night` |
| changsha | 长沙 | `Changsha city China` 或 `Yuelu Mountain Changsha` |
| harbin | 哈尔滨 | `Harbin ice snow` 或 `Harbin Saint Sophia Cathedral` |
| kaifeng | 开封 | `Kaifeng ancient China` 或 `Kaifeng tower` |
| quanzhou | 泉州 | `Quanzhou temple China` 或 `Quanzhou maritime` |
| yangzhou | 扬州 | `Yangzhou canal China` 或 `Yangzhou Slender West Lake` |
| qingdao | 青岛 | `Qingdao seaside` 或 `Qingdao Zhanqiao pier` |
| lasa | 拉萨 | `Lhasa Potala Palace` 或 `Lhasa Tibet temple` |
| dunhuang | 敦煌 | `Dunhuang Mogao caves` 或 `Dunhuang desert silk road` |
| 其他 | — | `{EnglishName} {landmark} {province} China` |

搜索技巧：
- 使用英文搜索，效果远好于中文
- 加上城市地标名称提高准确性
- 优先选择城市天际线、地标建筑、风景照
- 避免人像为主的照片

#### 快速打开 Unsplash

为用户提供可直接点击的搜索链接：
```
https://unsplash.com/s/photos/{搜索词用连字符连接}
```

### Step 3: 获取图片URL

用户会提供以下两种形式之一：

**方式A — Unsplash 页面URL：**
```
https://unsplash.com/photos/xxxxx
```

**方式B — 直接图片URL：**
```
https://images.unsplash.com/photo-xxxxx
```

如果是方式A，需要从页面中提取实际图片URL：
1. 使用 `WebFetch` 访问该页面
2. 提取 `og:image` meta 标签中的图片URL
3. 或提取页面中最大的 `images.unsplash.com` 图片URL

### Step 4: 下载图片

使用 Bash 下载图片：

```bash
curl -L -o "D:/MyProjects/what-happened-here/public/images/cities/{city-id}.jpg" "{image-url}"
```

URL 参数优化：
- 如果是 Unsplash 图片URL，追加 `?w=1200&q=80` 控制尺寸和质量
- 确保使用 `-L` 参数跟随重定向

### Step 5: 验证

下载后验证：
1. 检查文件大小（应 > 50KB，城市封面图通常在 100KB-500KB）
2. 使用 `Read` 工具预览图片，确认：
   - 图片能正常加载
   - 内容确实是对应城市的风景/地标
   - 不是人像为主的照片
3. 如有问题，提示用户重新选择

### Step 6: 报告结果

输出格式：
```
✅ 成功下载 {城市名} 封面图
   📁 文件: public/images/cities/{city-id}.jpg
   📏 大小: {size} KB
   📷 来源: Unsplash - 摄影师 {photographer}
```

## 批量模式

当用户选择 `all` 时：
1. 列出所有缺少封面图的城市及推荐搜索词
2. 逐一处理每个城市
3. 每个城市完成后暂停，等待用户确认再继续下一个
4. 最终汇总报告

## 错误处理

| 问题 | 处理方式 |
|------|---------|
| 下载失败（网络错误） | 提示重试，建议检查网络 |
| 文件过小（< 10KB） | 警告可能下载失败，建议重新下载 |
| 图片内容不匹配 | 提示用户重新在 Unsplash 搜索 |
| 用户提供的URL无效 | 引导用户复制正确的 Unsplash 页面URL |
