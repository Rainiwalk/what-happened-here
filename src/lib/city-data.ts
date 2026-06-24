import { City, CitySummary, Route, GeographicForce } from "@/types";
import { getDataUrl } from "./fetch";

// 客户端缓存
let clientCitiesCache: CitySummary[] | null = null;

/**
 * 获取所有城市摘要列表（客户端使用）
 */
export async function getAllCities(): Promise<CitySummary[]> {
  if (clientCitiesCache) {
    return clientCitiesCache;
  }

  const response = await fetch(getDataUrl("/data/cities-index.json"));
  if (!response.ok) {
    throw new Error("Failed to fetch cities index");
  }

  clientCitiesCache = await response.json();
  return clientCitiesCache!;
}

/**
 * 根据 ID 获取城市详情（客户端使用）
 */
export async function getCityById(id: string): Promise<City> {
  const response = await fetch(getDataUrl(`/data/cities/${id}.json`));
  if (!response.ok) {
    throw new Error(`City not found: ${id}`);
  }

  return response.json();
}

/**
 * 搜索城市（模糊匹配）
 */
export async function searchCities(query: string): Promise<CitySummary[]> {
  const cities = await getAllCities();
  const lowerQuery = query.toLowerCase();

  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerQuery) ||
      city.nameLocal?.toLowerCase().includes(lowerQuery) ||
      city.province.toLowerCase().includes(lowerQuery) ||
      city.summary.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 获取相关城市
 * 优先使用 JSON 中指定的 relatedCities，不足 3 个时用同省份城市补充
 */
export async function getRelatedCities(
  currentId: string,
  province: string,
  relatedIds?: string[]
): Promise<CitySummary[]> {
  const cities = await getAllCities();
  const result: CitySummary[] = [];

  // 优先从 relatedCities 中取
  if (relatedIds && relatedIds.length > 0) {
    for (const rid of relatedIds) {
      if (result.length >= 3) break;
      const found = cities.find((c) => c.id === rid && c.id !== currentId);
      if (found) result.push(found);
    }
  }

  // 不足 3 个时用同省份城市补充
  if (result.length < 3) {
    const existingIds = new Set([currentId, ...result.map((c) => c.id)]);
    const fillers = cities
      .filter((c) => !existingIds.has(c.id) && c.province === province)
      .slice(0, 3 - result.length);
    result.push(...fillers);
  }

  // 还不够则用其他城市补充
  if (result.length < 3) {
    const existingIds = new Set([currentId, ...result.map((c) => c.id)]);
    const fillers = cities
      .filter((c) => !existingIds.has(c.id))
      .slice(0, 3 - result.length);
    result.push(...fillers);
  }

  return result;
}

// 客户端路由缓存
let clientRoutesCache: Route[] | null = null;

/**
 * 获取所有历史通道（客户端使用）
 */
export async function getAllRoutes(): Promise<Route[]> {
  if (clientRoutesCache) return clientRoutesCache;

  const response = await fetch(getDataUrl("/data/routes.json"));
  if (!response.ok) throw new Error("Failed to fetch routes");

  clientRoutesCache = await response.json();
  return clientRoutesCache!;
}

/**
 * 获取城市所属的历史通道（客户端使用）
 */
export async function getRoutesForCity(cityId: string): Promise<Route[]> {
  const routes = await getAllRoutes();
  return routes.filter((route) => route.cities.includes(cityId));
}

// 客户端地理力量缓存
let clientForcesCache: { cities: Record<string, GeographicForce[]> } | null = null;

/**
 * 获取城市的地理力量（客户端使用）
 */
export async function getForcesForCity(cityId: string): Promise<GeographicForce[]> {
  if (!clientForcesCache) {
    const response = await fetch(getDataUrl("/data/geographical-forces.json"));
    if (!response.ok) throw new Error("Failed to fetch geographical forces");
    clientForcesCache = await response.json();
  }
  return clientForcesCache!.cities[cityId] || [];
}
