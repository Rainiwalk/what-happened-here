import { Location, LocationSummary } from "@/types";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

/**
 * 获取所有地点摘要列表（服务端使用）
 */
export function getAllLocationsSync(): LocationSummary[] {
  const filePath = join(process.cwd(), "public", "data", "locations.json");
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * 根据 ID 获取地点详情（服务端使用）
 */
export function getLocationByIdSync(id: string): Location {
  const filePath = join(process.cwd(), "public", "data", `${id}.json`);
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * 获取所有地点 ID（用于 generateStaticParams）
 */
export function getAllLocationIds(): string[] {
  const dataDir = join(process.cwd(), "public", "data");
  const files = readdirSync(dataDir);
  return files
    .filter((file) => file.endsWith(".json") && file !== "locations.json")
    .map((file) => file.replace(".json", ""));
}
