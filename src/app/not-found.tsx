import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <span className="text-8xl">🗺️</span>
        <h1 className="mt-6 text-4xl font-bold text-gray-900">
          Location Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          抱歉，找不到这个地点的历史记录。
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
