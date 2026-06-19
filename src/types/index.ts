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

export interface Location {
  id: string;
  name: string;
  nameLocal?: string; // 本地语言名称
  country: string;
  city?: string;
  lat: number;
  lng: number;
  summary: string;
  coverImage: string;
  timeline: TimelineEvent[];
  images: HistoricalImage[];
  relatedLocations?: string[]; // 相关地点 ID 列表
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
