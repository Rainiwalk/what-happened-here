export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface HistoricalImage {
  url: string;
  year: string;
  caption?: string;
}

// 地标相关类型（世界著名景点）
export interface Location {
  id: string;
  name: string;
  nameLocal?: string;
  country: string;
  city?: string;
  lat: number;
  lng: number;
  summary: string;
  coverImage: string;
  timeline: TimelineEvent[];
  images: HistoricalImage[];
  relatedLocations?: string[];
}

export interface LocationSummary {
  id: string;
  name: string;
  nameLocal?: string;
  country: string;
  city?: string;
  coverImage: string;
  summary: string;
}

// 城市时间线相关类型
export type Era = "ancient" | "modern" | "contemporary";

export interface CityTimelineEvent {
  year: string;
  era: Era;
  title: string;
  description: string;
  image?: string;
}

export interface City {
  id: string;
  name: string;
  nameLocal?: string;
  province: string;
  lat: number;
  lng: number;
  summary: string;
  description: string; // 更详细的城市介绍
  coverImage: string;
  timeline: CityTimelineEvent[];
  images: HistoricalImage[];
  relatedCities?: string[];
  relatedLocations?: string[]; // 相关地标
}

export interface CitySummary {
  id: string;
  name: string;
  nameLocal?: string;
  province: string;
  coverImage: string;
  summary: string;
}
