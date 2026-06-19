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
              一个基于地点与时间的历史探索网站。探索世界各地重要地标的历史故事。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/location/tokyo-station" className="hover:text-gray-900 transition-colors">
                  Tokyo Station
                </a>
              </li>
              <li>
                <a href="/location/eiffel-tower" className="hover:text-gray-900 transition-colors">
                  Eiffel Tower
                </a>
              </li>
              <li>
                <a href="/location/forbidden-city" className="hover:text-gray-900 transition-colors">
                  Forbidden City
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Built With</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Next.js + TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>Mapbox GL</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} What Happened Here? — A portfolio
            project
          </p>
        </div>
      </div>
    </footer>
  );
}
