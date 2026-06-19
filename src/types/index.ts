// 城市时间线相关类型
export type Era = "ancient" | "modern" | "contemporary";

export interface CityTimelineEvent {
  year: string;
  era: Era;
  title: string;
  description: string;
  image?: string;
}

export interface HistoricalImage {
  url: string;
  year: string;
  caption?: string;
}

export interface City {
  id: string;
  name: string;
  nameLocal?: string;
  province: string;
  lat: number;
  lng: number;
  summary: string;
  description: string;
  coverImage: string;
  timeline: CityTimelineEvent[];
  images: HistoricalImage[];
  relatedCities?: string[];
}

export interface CitySummary {
  id: string;
  name: string;
  nameLocal?: string;
  province: string;
  coverImage: string;
  summary: string;
}
