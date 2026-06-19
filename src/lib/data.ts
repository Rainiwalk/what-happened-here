import { Location, LocationSummary } from "@/types";
import { getDataUrl } from "./fetch";

// 地点索引缓存（客户端使用）
let clientLocationsCache: LocationSummary[] | null = null;

/**
 * 获取所有地点摘要列表（客户端使用）
 */
export async function getAllLocations(): Promise<LocationSummary[]> {
  if (clientLocationsCache) {
    return clientLocationsCache;
  }

  const response = await fetch(getDataUrl("/data/locations.json"));
  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  clientLocationsCache = await response.json();
  return clientLocationsCache!;
}

/**
 * 根据 ID 获取地点详情（客户端使用）
 */
export async function getLocationById(id: string): Promise<Location> {
  const response = await fetch(getDataUrl(`/data/${id}.json`));
  if (!response.ok) {
    throw new Error(`Location not found: ${id}`);
  }

  return response.json();
}

/**
 * 搜索地点（模糊匹配）
 */
export async function searchLocations(
  query: string
): Promise<LocationSummary[]> {
  const locations = await getAllLocations();
  const lowerQuery = query.toLowerCase();

  return locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(lowerQuery) ||
      loc.nameLocal?.toLowerCase().includes(lowerQuery) ||
      loc.country.toLowerCase().includes(lowerQuery) ||
      loc.city?.toLowerCase().includes(lowerQuery) ||
      loc.summary.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 获取相关地点
 */
export async function getRelatedLocations(
  currentId: string,
  country: string
): Promise<LocationSummary[]> {
  const locations = await getAllLocations();

  // 优先返回同国家的地点，排除当前地点
  return locations
    .filter((loc) => loc.id !== currentId)
    .sort((a, b) => {
      // 同国家的排在前面
      if (a.country === country && b.country !== country) return -1;
      if (a.country !== country && b.country === country) return 1;
      return 0;
    })
    .slice(0, 3);
}
