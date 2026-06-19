/**
 * 获取带 basePath 的完整路径
 * 用于静态资源（图片、数据文件等）
 */
export function getPath(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/what-happened-here" : "";
  return `${basePath}${path}`;
}

/**
 * Base path 常量
 * 用于客户端组件
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/what-happened-here" : "";
