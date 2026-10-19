import { useEffect } from 'react'
import {
  Globe,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  FileCheck2,
  ChevronRight,
  HelpCircle,
  Award,
} from 'lucide-react'
import { VisaExplorer, TrustedWorldwide } from '@/components/sections'
import { goToVisa } from '@/hooks'

export default function VisaPage() {
  // Ensure page scrolls to top or hash target when opened
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1)) || document.getElementById('visa')
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="bg-white">




      {/* ======================================================== */}
      {/* 3. INTERACTIVE VISA EXPLORER SECTION                      */}
      {/* ======================================================== */}
      <VisaExplorer />


    </div>
  )
}
