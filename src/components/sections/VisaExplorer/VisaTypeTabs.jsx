import { useRef } from 'react'

export default function VisaTypeTabs({ types, activeId, onSelect }) {
  const tabRefs = useRef([])

  const moveTo = (index) => {
    const next = (index + types.length) % types.length
    onSelect(types[next].id)
    tabRefs.current[next]?.focus()
  }

  const handleKeyDown = (event, index) => {
    const keyActions = {
      ArrowRight: () => moveTo(index + 1),
      ArrowLeft: () => moveTo(index - 1),
      Home: () => moveTo(0),
      End: () => moveTo(types.length - 1),
    }
    const action = keyActions[event.key]
    if (!action) return
    event.preventDefault()
    action()
  }

  return (
    <div
      role="tablist"
      aria-label="Visa type"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {types.map((type, index) => {
        const isActive = type.id === activeId
        return (
          <button
            key={type.id}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`visa-tab-${type.id}`}
            aria-selected={isActive}
            aria-controls="visa-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(type.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`rounded-xl border px-5 py-4 text-left transition-all ${isActive
                ? 'border-navy bg-navy text-white shadow-lg shadow-navy/20'
                : 'border-slate-200 bg-white text-navy shadow-sm hover:-translate-y-0.5 hover:border-primary hover:shadow-card'
              }`}
          >
            <span className="block text-[15px] font-bold leading-snug">{type.label}</span>
            <span
              className={`mt-1 block text-[13px] leading-snug ${isActive ? 'text-white/80' : 'text-body'
                }`}
            >

            </span>
          </button>
        )
      })}
    </div>
  )
}
