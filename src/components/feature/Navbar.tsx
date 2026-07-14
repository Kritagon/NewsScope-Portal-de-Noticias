import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isDemoMode } from '@/services/newsApi';

const NAV_ITEMS = [
  { path: '/', icon: 'ri-home-4-line', labelKey: 'nav.home' },
  { path: '/explorar', icon: 'ri-search-line', labelKey: 'nav.explore' },
  { path: '/tendencias', icon: 'ri-line-chart-line', labelKey: 'nav.trends' },
  { path: '/comparador', icon: 'ri-scales-3-line', labelKey: 'nav.compare' },
  { path: '/fuentes', icon: 'ri-rss-line', labelKey: 'nav.sources' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const demo = isDemoMode();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-900/95 backdrop-blur-md border-b border-primary-700/30">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-500">
              <i className="ri-newspaper-line text-lg text-background-50"></i>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-heading font-bold text-background-50 tracking-tight">NewsScope</span>
              {demo && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-accent-500/20 text-accent-400 font-medium whitespace-nowrap">
                  {t('demo.badge')}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.path)
                    ? 'bg-accent-500/15 text-accent-400'
                    : 'text-background-300 hover:text-background-50 hover:bg-primary-800/50'
                }`}
              >
                <i className={`${item.icon} text-base`}></i>
                <span>{t(item.labelKey)}</span>
              </Link>
            ))}
          </div>

          {/* Search + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>('#navbar-search');
                input?.focus();
                if (input) {
                  window.location.href = `/explorar?q=${encodeURIComponent(input.value)}`;
                }
              }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary-800/60 text-background-400 text-sm border border-primary-700/40 hover:border-primary-600/60 transition-colors cursor-pointer"
            >
              <i className="ri-search-line text-base"></i>
              <span className="min-w-[140px] text-left">{t('nav.search')}</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-background-300 hover:text-background-50 hover:bg-primary-800/50 transition-colors cursor-pointer"
              aria-label={t('nav.menu')}
            >
              <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-900 border-t border-primary-700/30 animate-mobile-menu-in">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-accent-500/15 text-accent-400'
                    : 'text-background-300 hover:text-background-50 hover:bg-primary-800/50'
                }`}
              >
                <i className={`${item.icon} text-lg`}></i>
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/explorar"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-background-300 hover:text-background-50 hover:bg-primary-800/50 transition-colors"
              >
                <i className="ri-search-line text-lg"></i>
                {t('nav.search')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}