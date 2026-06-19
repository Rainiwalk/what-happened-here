import { City, CitySummary } from "@/types";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

/**
 * 获取所有城市摘要列表（服务端使用）
 */
export function getAllCitiesSync(): CitySummary[] {
  const filePath = join(process.cwd(), "public", "data", "cities-index.json");
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * 根据 ID 获取城市详情（服务端使用）
 */
export function getCityByIdSync(id: string): City {
  const filePath = join(
    process.cwd(),
    "public",
    "data",
    "cities",
    `${id}.json`
  );
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * 获取所有城市 ID（用于 generateStaticParams）
 */
export function getAllCityIds(): string[] {
  const dataDir = join(process.cwd(), "public", "data", "cities");
  const files = readdirSync(dataDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));
}

/**
 * 获取相邻城市（上一个/下一个）
 * 按照 cities-index.json 的顺序
 */
export function getAdjacentCities(currentId: string): {
  prev: { id: string; name: string; nameLocal: string } | null;
  next: { id: string; name: string; nameLocal: string } | null;
} {
  const cities = getAllCitiesSync();
  const currentIndex = cities.findIndex((c) => c.id === currentId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prevIndex = currentIndex === 0 ? cities.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === cities.length - 1 ? 0 : currentIndex + 1;

  return {
    prev: { id: cities[prevIndex].id, name: cities[prevIndex].name, nameLocal: cities[prevIndex].nameLocal ?? "" },
    next: { id: cities[nextIndex].id, name: cities[nextIndex].name, nameLocal: cities[nextIndex].nameLocal ?? "" },
  };
}
