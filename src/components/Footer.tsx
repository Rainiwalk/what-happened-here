import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              What Happened Here?
            </h3>
            <p className="text-sm text-gray-600">
              城市时间线档案馆 —— 用时间线了解一座城市是如何形成的。
            </p>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">🏙️ 城市时间线</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/city/tangshan" className="hover:text-gray-900 transition-colors">
                  唐山
                </Link>
              </li>
              <li>
                <Link href="/city/baoding" className="hover:text-gray-900 transition-colors">
                  保定
                </Link>
              </li>
              <li>
                <Link href="/city/tianjin" className="hover:text-gray-900 transition-colors">
                  天津
                </Link>
              </li>
            </ul>
          </div>

          {/* Landmarks */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">🏛️ 世界地标</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/location/tokyo-station" className="hover:text-gray-900 transition-colors">
                  东京站
                </Link>
              </li>
              <li>
                <Link href="/location/eiffel-tower" className="hover:text-gray-900 transition-colors">
                  埃菲尔铁塔
                </Link>
              </li>
              <li>
                <Link href="/location/forbidden-city" className="hover:text-gray-900 transition-colors">
                  紫禁城
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} What Happened Here? — 城市时间线档案馆
          </p>
        </div>
      </div>
    </footer>
  );
}
