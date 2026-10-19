import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

/**
 * Breadcrumb navigation trail.
 *
 * items: [{ label: string, href?: string }]
 * The final item is treated as the current page and is not linked.
 * A "Home" crumb pointing at "/" is always rendered at the start so the
 * trail never starts halfway down the hierarchy.
 */
export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null

  const crumbs = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] text-slate-500">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          const key = `${crumb.label}-${index}`

          return (
            <li key={key} className="flex items-center gap-1.5 min-w-0">
              {index > 0 && (
                <ChevronRight className="size-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="truncate font-semibold text-slate-800"
                >
                  {crumb.label}
                </span>
              ) : crumb.href ? (
                <Link
                  to={crumb.href}
                  className="inline-flex items-center gap-1.5 truncate text-slate-500 transition-colors hover:text-[#2563eb]"
                >
                  {index === 0 && <Home className="size-3.5" aria-hidden="true" />}
                  <span>{crumb.label}</span>
                </Link>
              ) : (
                <span className="truncate text-slate-500">{crumb.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
