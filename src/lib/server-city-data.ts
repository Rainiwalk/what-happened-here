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
