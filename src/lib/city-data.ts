import { City, CitySummary, Route } from "@/types";
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
 */
export async function getRelatedCities(
  currentId: string,
  province: string
): Promise<CitySummary[]> {
  const cities = await getAllCities();

  return cities
    .filter((city) => city.id !== currentId)
    .sort((a, b) => {
      if (a.province === province && b.province !== province) return -1;
      if (a.province !== province && b.province === province) return 1;
      return 0;
    })
    .slice(0, 3);
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
