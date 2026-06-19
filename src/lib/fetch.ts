/**
 * 获取考虑 basePath 的完整 URL
 * 解决 Next.js dev 模式下 basePath 未自动应用到 fetch 的问题
 */
export function getDataUrl(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/what-happened-here" : "";
  return `${basePath}${path}`;
}
