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
  description: string;
  coverImage: string;
  timeline: CityTimelineEvent[];
  relatedCities?: string[];
}

export interface CitySummary {
  id: string;
  name: string;
  nameLocal?: string;
  province: string;
  coverImage: string;
  summary: string;
  featured?: boolean;
}

// 历史通道相关类型
export interface Route {
  id: string;
  name: string;
  icon: string;
  description: string;
  cities: string[];
}

// 地理力量相关类型
export interface GeographicForce {
  title: string;
  icon: string;
  description: string;
  impact: string;
}
