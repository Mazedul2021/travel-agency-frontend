import { useState } from 'react'
import Header from '@/components/layout/Header'
import HeroBanner from './components/HeroBanner'
import DashboardTabs from './components/DashboardTabs'
import ApplicationsView from './components/Applications/ApplicationsView'
import PassportPickupView from './components/PassportPickup/PassportPickupView'
import InvoicesCommissionView from './components/InvoicesCommission/InvoicesCommissionView'
import ProfileView from './components/Profile/ProfileView'
import SupportView from './components/Support/SupportView'

// Modals
import NewApplicationModal from './components/Applications/NewApplicationModal'
import ApplicationDetailModal from './components/Applications/ApplicationDetailModal'
import NewPickupModal from './components/PassportPickup/NewPickupModal'
import PickupDetailModal from './components/PassportPickup/PickupDetailModal'
import CommissionDetailModal from './components/InvoicesCommission/CommissionDetailModal'
import CommissionReportModal from './components/InvoicesCommission/CommissionReportModal'

export default function B2BDashboard({
  onNavigateToStorefront,
  onLogout,
  currentUser,
  initialTab = 'profile',
}) {
  // Navigation State: 'profile' | 'applications' | 'pickup' | 'invoices' | 'support'
  const [activeTab, setActiveTab] = useState(initialTab || 'profile')

  // Modals state
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)

  const [isNewPickupModalOpen, setIsNewPickupModalOpen] = useState(false)
  const [selectedPickup, setSelectedPickup] = useState(null)

  const [selectedCommission, setSelectedCommission] = useState(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      {/* 1. Global Navigation Bar - Unified Storefront Header */}
      <Header
        isDashboardView={true}
        onNavigateToStorefront={onNavigateToStorefront}
        onNavigateToDashboard={() => setActiveTab('profile')}
        onLogout={onLogout}
      />

      {/* 2. Panoramic Partner Hero Banner */}
      <HeroBanner activeTab={activeTab} currentUser={currentUser} />

      {/* 3. Floating 5-Tab Dashboard Navigation Bar */}
      <div className="w-full max-w-full min-w-0">
        <DashboardTabs
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab)
          }}
        />
      </div>

      {/* 4. Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <ProfileView
              onOpenNewApplication={() => setIsNewAppModalOpen(true)}
              onOpenNewPickup={() => setIsNewPickupModalOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenCommissionVoucher={() =>
                setSelectedCommission({ invoiceNo: 'INV-2025-0187', view: 'voucher' })
              }
            />
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="animate-fade-in">
            <ApplicationsView
              onOpenNewModal={() => setIsNewAppModalOpen(true)}
              onSelectApplication={(app) => setSelectedApplication(app)}
            />
          </div>
        )}

        {activeTab === 'pickup' && (
          <div className="animate-fade-in">
            <PassportPickupView
              onOpenNewPickupModal={() => setIsNewPickupModalOpen(true)}
              onSelectPickup={(pickup) => setSelectedPickup(pickup)}
            />
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="animate-fade-in">
            <InvoicesCommissionView
              onSelectCommission={(row) => setSelectedCommission(row)}
              onOpenSupportModal={() => setActiveTab('support')}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'support' && (
          <div className="animate-fade-in">
            <SupportView />
          </div>
        )}
      </main>

      {/* 5. Rich Dark Navy Footer Matching Reference Screenshot */}
      <footer className="bg-[#071933] text-white border-t border-slate-800/80 pt-10 sm:pt-12 pb-8 mt-10 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-white/10 text-xs">
            {/* Col 1: Brand Info */}
            <div className="col-span-1 xs:col-span-2 md:col-span-1 lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 120 100"
                  className="w-8 h-6.5 shrink-0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 20 C 8 11, 16 8, 26 8 L 94 8 C 104 8, 107 15, 102 23 L 80 50 C 76 55, 68 57, 60 57 L 22 57 C 12 57, 8 52, 8 44 Z"
                    fill="#0284c7"
                  />
                  <path
                    d="M20 54 L 38 78 C 40 81, 44 80, 43 76 L 36 54 Z"
                    fill="#0284c7"
                  />
                  <path
                    d="M96 20 L 52 86 C 48 92, 40 94, 34 89 C 28 84, 28 76, 33 69 L 75 14 C 78 9, 85 8, 89 11 Z"
                    fill="#f97316"
                  />
                  <path
                    d="M82 22 L 78 26 L 73 24 L 71 27 L 76 29 L 74 34 L 77 34 L 80 30 L 85 32 L 86 29 L 82 27 L 85 24 Z"
                    fill="#ffffff"
                  />
                </svg>
                <span className="text-lg font-black italic text-white tracking-tight">
                  ABL Travels
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70">
                Travel Beyond Borders
              </p>
            </div>

            {/* Col 2: Visa Services */}
            <div>
              <h5 className="font-bold text-white text-[13px] mb-3">Visa Services</h5>
              <ul className="space-y-2 text-white/75">
                <li><a href="#" className="hover:text-white transition-colors">Tourist Visa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Visa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Visa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Family Visa</a></li>
              </ul>
            </div>

            {/* Col 3: Tour Packages */}
            <div>
              <h5 className="font-bold text-white text-[13px] mb-3">Tour Packages</h5>
              <ul className="space-y-2 text-white/75">
                <li><a href="#" className="hover:text-white transition-colors">International Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Domestic Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Group Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customized Tours</a></li>
              </ul>
            </div>

            {/* Col 4: Quick Links */}
            <div>
              <h5 className="font-bold text-white text-[13px] mb-3">Quick Links</h5>
              <ul className="space-y-2 text-white/75">
                <li><button type="button" onClick={() => setActiveTab('profile')} className="hover:text-white transition-colors cursor-pointer">B2B Partner</button></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><button type="button" onClick={() => setActiveTab('support')} className="hover:text-white transition-colors cursor-pointer">Support</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 5: Contact Us */}
            <div className="col-span-1 xs:col-span-2 md:col-span-1 lg:col-span-1">
              <h5 className="font-bold text-white text-[13px] mb-3">Contact Us</h5>
              <ul className="space-y-2.5 text-white/75 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#0284c7] mt-0.5">📍</span>
                  <span>House #1/B, Road #126, Gulshan 01, Dhaka 1212, Bangladesh</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0284c7]">📞</span>
                  <span>01717-999637, +880 1346-808815</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0284c7]">✉️</span>
                  <span>abltravels.visa@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Col 6: Follow Us */}
            <div>
              <h5 className="font-bold text-white text-[13px] mb-3">Follow Us</h5>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="size-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="size-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="size-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="size-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Storefront Return */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
            <p>© {new Date().getFullYear()} ABL Travels. All rights reserved.</p>
            {onNavigateToStorefront && (
              <button
                type="button"
                onClick={onNavigateToStorefront}
                className="text-[#29b6f6] hover:underline font-semibold cursor-pointer"
              >
                ← Return to Storefront Website
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* 6. Interactive Dialogs & Modals */}
      <NewApplicationModal
        isOpen={isNewAppModalOpen}
        onClose={() => setIsNewAppModalOpen(false)}
        onCreated={() => {}}
      />

      <ApplicationDetailModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />

      <NewPickupModal
        isOpen={isNewPickupModalOpen}
        onClose={() => setIsNewPickupModalOpen(false)}
        onCreated={() => {}}
      />

      <PickupDetailModal
        pickup={selectedPickup}
        onClose={() => setSelectedPickup(null)}
      />

      <CommissionDetailModal
        commission={selectedCommission}
        onClose={() => setSelectedCommission(null)}
      />

      <CommissionReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  )
}
