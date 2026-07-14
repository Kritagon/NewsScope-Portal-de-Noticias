import { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SourcesFilter from '@/pages/sources/components/SourcesFilter';
import SourcesCategoryChart from '@/pages/sources/components/SourcesCategoryChart';
import { ErrorState, EmptyState } from '@/components/feature/EmptyState';
import { fetchSources, isDemoMode } from '@/services/newsApi';
import type { NewsSource, ApiStatus } from '@/types/news';
import type { SourcesFilters } from '@/pages/sources/components/SourcesFilter';

const CATEGORY_COLORS: Record<string, string> = {
  general: 'bg-secondary-100 text-secondary-800',
  business: 'bg-accent-100 text-accent-800',
  technology: 'bg-primary-100 text-primary-800',
  science: 'bg-secondary-100 text-secondary-700',
  health: 'bg-red-50 text-red-700',
  sports: 'bg-amber-50 text-amber-700',
  entertainment: 'bg-pink-50 text-pink-700',
};

export default function Sources() {
  const [status, setStatus] = useState<ApiStatus>('loading');
  const [allSources, setAllSources] = useState<NewsSource[]>([]);
  const [filters, setFilters] = useState<SourcesFilters>({
    search: '',
    category: '',
    language: '',
    country: '',
  });
  const [demo, setDemo] = useState(false);

  const loadSources = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await fetchSources();
      const srcs = data.sources || [];
      setAllSources(srcs);
      setDemo(isDemoMode());
      setStatus(srcs.length === 0 ? 'empty' : 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      setStatus(msg === 'RATE_LIMITED' ? 'rate_limited' : 'error');
    }
  }, []);

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  const filteredSources = useMemo(() => {
    let result = [...allSources];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((s) => s.category === filters.category);
    }

    if (filters.language) {
      result = result.filter((s) => s.language === filters.language);
    }

    if (filters.country) {
      result = result.filter((s) => s.country === filters.country);
    }

    return result;
  }, [allSources, filters]);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 animate-fade-in-up">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground-900">
                Fuentes de noticias
              </h1>
              <p className="text-sm text-foreground-500 mt-1">
                Explora el catálogo completo de medios disponibles en NewsAPI
              </p>
            </div>
            {demo && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-amber-700 whitespace-nowrap">
                <i className="ri-database-2-line"></i>
                Modo demostración
              </span>
            )}
          </div>

          {/* Filter */}
          {status === 'success' && (
            <SourcesFilter
              filters={filters}
              onChange={setFilters}
              totalCount={filteredSources.length}
            />
          )}

          {/* Loading */}
          {status === 'loading' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-background-50 rounded-xl border border-background-200/70 p-5"
                >
                  <div className="h-5 skeleton-shimmer rounded w-2/3 mb-3"></div>
                  <div className="h-3 skeleton-shimmer rounded w-full mb-2"></div>
                  <div className="h-3 skeleton-shimmer rounded w-4/5 mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 skeleton-shimmer rounded-full w-20"></div>
                    <div className="h-6 skeleton-shimmer rounded-full w-14"></div>
                    <div className="h-6 skeleton-shimmer rounded-full w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="mt-6">
              <ErrorState onRetry={loadSources} />
            </div>
          )}

          {/* Rate Limited */}
          {status === 'rate_limited' && (
            <div className="mt-6">
              <ErrorState onRetry={loadSources} message="Se alcanzó el límite de consultas. Intenta de nuevo más tarde." />
            </div>
          )}

          {/* Empty (no sources from API at all) */}
          {status === 'empty' && (
            <div className="mt-6">
              <EmptyState />
            </div>
          )}

          {/* Success */}
          {status === 'success' && (
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
              {/* Main content */}
              <div className="flex-1 min-w-0">
                {filteredSources.length === 0 ? (
                  <EmptyState
                    onClear={() =>
                      setFilters({ search: '', category: '', language: '', country: '' })
                    }
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredSources.map((source) => (
                      <div
                        key={source.id}
                        className="bg-background-50 border border-background-200/70 rounded-xl p-5 hover:border-accent-300/60 transition-all group"
                      >
                        {/* Name */}
                        <h3 className="text-base font-heading font-semibold text-foreground-900 mb-2 group-hover:text-accent-700 transition-colors">
                          {source.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-foreground-600 leading-relaxed mb-4 line-clamp-3">
                          {source.description}
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              CATEGORY_COLORS[source.category] || 'bg-secondary-100 text-secondary-800'
                            }`}
                          >
                            {source.category}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-background-100 border border-background-200/70 rounded-full text-xs text-foreground-600">
                            <i className="ri-global-line text-xs"></i>
                            {source.language?.toUpperCase()}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-background-100 border border-background-200/70 rounded-full text-xs text-foreground-600">
                            <i className="ri-map-pin-line text-xs"></i>
                            {source.country?.toUpperCase()}
                          </span>
                        </div>

                        {/* Visit link */}
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors whitespace-nowrap"
                        >
                          Visitar sitio
                          <i className="ri-external-link-line text-xs"></i>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar - Category chart */}
              {filteredSources.length > 0 && (
                <div className="lg:w-80 shrink-0">
                  <div className="lg:sticky lg:top-24">
                    <SourcesCategoryChart sources={filteredSources} />

                    {/* Quick stats */}
                    <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 mt-4">
                      <h3 className="text-sm font-heading font-semibold text-foreground-900 mb-3 flex items-center gap-2">
                        <i className="ri-bar-chart-line text-accent-600"></i>
                        Estadísticas rápidas
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground-500">Total fuentes</span>
                          <span className="font-semibold text-foreground-900">{filteredSources.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground-500">Idiomas</span>
                          <span className="font-semibold text-foreground-900">
                            {new Set(filteredSources.map((s) => s.language)).size}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground-500">Países</span>
                          <span className="font-semibold text-foreground-900">
                            {new Set(filteredSources.map((s) => s.country)).size}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground-500">Categorías</span>
                          <span className="font-semibold text-foreground-900">
                            {new Set(filteredSources.map((s) => s.category)).size}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}