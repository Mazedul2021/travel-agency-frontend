import { useState, useRef, useEffect } from 'react'
import { Clock, X } from 'lucide-react'

export default function TourHero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  recentSearches,
  onClearRecentSearches,
  onRemoveRecentSearch,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsFocused(false)
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim())
    }
  }

  // Filtered recent searches matching current query
  const displayedRecent = recentSearches.filter((item) =>
    searchQuery ? item.toLowerCase().includes(searchQuery.toLowerCase()) : true
  )

  return (
    <section className="pt-8 pb-6 sm:pt-12 sm:pb-8 text-center bg-white">
      <div className="mx-auto max-w-4xl px-4">
        {/* Exact Hero Title from Picture */}
        <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-black tracking-tight text-[#181a1f] leading-tight mb-8">
          Experiences worth traveling for
        </h1>

        {/* Exact Centered Elevated Pill Search Bar from Picture */}
        <div className="relative max-w-[660px] mx-auto" ref={containerRef}>
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center rounded-full bg-white pl-6 pr-2 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200 transition-all focus-within:border-[#0071eb] focus-within:shadow-[0_4px_24px_rgba(0,113,235,0.14)]"
          >
            {/* Input Field */}
            <input
              type="text"
              name="q"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Find places and things to do"
              autoComplete="off"
              className="w-full bg-transparent text-[15px] sm:text-base text-[#181a1f] placeholder:text-slate-400 focus:outline-none pr-3"
              role="combobox"
              aria-label="Find places and things to do"
              aria-expanded={isFocused}
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1.5 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Blue Pill Search Button from Picture */}
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0071eb] hover:bg-[#005ec4] active:scale-95 px-7 py-2.5 text-[15px] font-bold text-white shadow-sm transition-all cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Autocomplete / Recent Searches Dropdown Panel */}
          {isFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl text-left animate-fade-in">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {searchQuery ? 'Suggestions' : 'Recent Searches'}
                </h3>
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearRecentSearches}
                    className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <ul className="mt-1 divide-y divide-slate-50 max-h-56 overflow-y-auto">
                {displayedRecent.length > 0 ? (
                  displayedRecent.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => {
                        onSearchSubmit(item)
                        setIsFocused(false)
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0071eb] transition-colors">
                          <Clock className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-medium text-slate-800 group-hover:text-[#0071eb]">
                          {item}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemoveRecentSearch(item)
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        aria-label={`Remove ${item}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="px-3 py-3 text-center text-xs text-slate-400">
                    Press &ldquo;Search&rdquo; to find experiences for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
