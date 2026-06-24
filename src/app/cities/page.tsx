import { getAllCitiesSync } from "@/lib/server-city-data";
import type { Metadata } from "next";
import CitiesPageContent from "@/components/CitiesPageContent";

export const metadata: Metadata = {
  title: "全部城市 - What Happened Here?",
  description: "浏览所有已收录的城市，按省份分组查看，探索每座城市的历史脉络。",
};

export default function CitiesPage() {
  const cities = getAllCitiesSync();

  // 按省份分组
  const grouped = cities.reduce<Record<string, typeof cities>>((acc, city) => {
    const province = city.province;
    if (!acc[province]) acc[province] = [];
    acc[province].push(city);
    return acc;
  }, {});

  // 按省份名称排序
  const sortedProvinces = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">全部城市</h1>
          <p className="mt-4 text-lg text-gray-600">
            共收录 <span className="text-amber-600 font-semibold">{cities.length}</span> 座城市
          </p>
        </div>

        <CitiesPageContent groupedCities={grouped} sortedProvinces={sortedProvinces} />
      </div>
    </div>
  );
}
