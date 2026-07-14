import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, SORT_OPTIONS } from '@/types/news';
import type { NewsFilters } from '@/types/news';

interface FilterPanelProps {
  filters: NewsFilters;
  onApply: (filters: NewsFilters) => void;
  onClear: () => void;
  loading: boolean;
}

export default function FilterPanel({ filters, onApply, onClear, loading }: FilterPanelProps) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);

  const [keyword, setKeyword] = useState(filters.keyword || '');
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '');
  const [dateTo, setDateTo] = useState(filters.dateTo || '');
  const [language, setLanguage] = useState(filters.language || '');
  const [sources, setSources] = useState(filters.sources || '');
  const [sortBy, setSortBy] = useState(filters.sortBy || 'publishedAt');
  const [pageSize, setPageSize] = useState(filters.pageSize || 6);

  const handleApply = () => {
    onApply({
      keyword: keyword.trim() || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      language: language || undefined,
      sources: sources.trim() || undefined,
      sortBy: sortBy as NewsFilters['sortBy'],
      page: 1,
      pageSize,
    });
  };

  const handleClear = () => {
    setKeyword('');
    setDateFrom('');
    setDateTo('');
    setLanguage('');
    setSources('');
    setSortBy('publishedAt');
    setPageSize(6);
    onClear();
  };

  const hasActiveFilters = keyword || dateFrom || dateTo || language || sources || sortBy !== 'publishedAt';

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between p-4 md:p-5 cursor-pointer lg:cursor-default"
      >
        <div className="flex items-center gap-2">
          <i className="ri-filter-3-line text-lg text-accent-600"></i>
          <span className="text-sm font-semibold text-foreground-900">{t('explore.title')}</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-accent-100 text-accent-700 text-xs font-medium rounded-full whitespace-nowrap">
              {t('explore.activeFilters')}
            </span>
          )}
        </div>
        <i className={`ri-arrow-down-s-line text-lg text-foreground-500 transition-transform lg:hidden ${collapsed ? '' : 'rotate-180'}`}></i>
      </button>

      <div className={`px-4 md:px-5 pb-4 md:pb-5 space-y-4 ${collapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {/* Keyword */}
          <div className="sm:col-span-2 xl:col-span-2">
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">{t('explore.searchLabel')}</label>
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleApply(); }}
                placeholder="Inteligencia artificial, economía, salud..."
                className="w-full pl-9 pr-3 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all"
              />
            </div>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">{t('explore.dateFrom')}</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">{t('explore.dateTo')}</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">{t('explore.language')}</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all cursor-pointer"
            >
              <option value="">Todos</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Sources */}
          <div>
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">{t('explore.source')}</label>
            <input
              type="text"
              value={sources}
              onChange={(e) => setSources(e.target.value)}
              placeholder="bbc-news, cnn..."
              className="w-full px-3 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">{t('explore.sortBy')}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
              ))}
            </select>
          </div>

          {/* Page Size */}
          <div>
            <label className="block text-xs font-medium text-foreground-700 mb-1.5">{t('explore.pageSize')}</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/10 transition-all cursor-pointer"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleApply}
            disabled={loading}
            className="px-5 py-2.5 bg-accent-500 text-background-50 dark:text-foreground-950 rounded-lg text-sm font-semibold hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-search-line mr-1.5"></i>
            {t('explore.search')}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2.5 text-sm font-medium text-foreground-600 hover:text-foreground-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-close-line mr-1"></i>
            {t('explore.clearFilters')}
          </button>
        </div>
      </div>
    </div>
  );
}