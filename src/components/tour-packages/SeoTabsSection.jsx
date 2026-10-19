import { useState } from 'react'
import { Search, Compass, MapPin, Flag, Sparkles } from 'lucide-react'
import { SEO_TABS_DATA } from '@/data/tourPackagesData'

export default function SeoTabsSection({ onSelectItem }) {
  const [activeTab, setActiveTab] = useState('pois')
  const [tabFilter, setTabFilter] = useState('')

  const tabs = [
    { id: 'pois', label: 'Top attractions worldwide', icon: Sparkles },
    { id: 'cities', label: 'Top destinations', icon: MapPin },
    { id: 'countries', label: 'Top countries to visit', icon: Flag },
    { id: 'categories', label: 'Top attraction categories', icon: Compass },
  ]

  const rawData = SEO_TABS_DATA[activeTab] || []
  const filteredData = rawData.filter((item) =>
    tabFilter ? item.name.toLowerCase().includes(tabFilter.toLowerCase()) : true
  )

  return (
    <section
      id="seo-content-block"
      className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Explore more travel inspiration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Discover premier destinations, bucket-list sights, and thrilling activities curated across every continent.
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isSelected = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setTabFilter('')
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Quick search inside the active tab */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={tabFilter}
              onChange={(e) => setTabFilter(e.target.value)}
              placeholder={`Filter in this tab...`}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-800"
            />
          </div>
        </div>

        {/* Active Tab Content Grid */}
        <div className="mt-6">
          {filteredData.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
              {filteredData.map((item, idx) => (
                <li key={`${item.name}-${idx}`} className="group">
                  <button
                    type="button"
                    onClick={() => onSelectItem && onSelectItem(item.name)}
                    className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-white hover:shadow-xs transition-all flex flex-col cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                      {item.rank ? `${item.rank}. ${item.name}` : item.name}
                    </span>
                    {item.count && (
                      <span className="text-[11px] text-slate-500 font-normal">
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center text-xs sm:text-sm text-slate-500">
              No results found matching &ldquo;{tabFilter}&rdquo;. Try another term.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
