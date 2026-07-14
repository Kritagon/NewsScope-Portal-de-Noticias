import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FilterPanel from '@/pages/explore/components/FilterPanel';
import NewsTable from '@/pages/explore/components/NewsTable';
import NewsCard from '@/components/feature/NewsCard';
import Pagination from '@/components/feature/Pagination';
import { LoadingGrid, EmptyState, ErrorState } from '@/components/feature/EmptyState';
import { searchNews } from '@/services/newsApi';
import type { Article, NewsFilters, ApiStatus } from '@/types/news';

export default function Explore() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const initialKeyword = searchParams.get('q') || '';

  const [filters, setFilters] = useState<NewsFilters>({
    keyword: initialKeyword,
    sortBy: 'publishedAt',
    page: 1,
    pageSize: 6,
  });

  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalResults / (filters.pageSize || 6));

  const fetchNews = useCallback(async (f: NewsFilters, page: number) => {
    setStatus('loading');
    try {
      const data = await searchNews({ ...f, page });
      const arts = data.articles || [];
      setArticles(arts);
      setTotalResults(data.totalResults);
      setCurrentPage(page);
      setStatus(arts.length === 0 ? 'empty' : 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      setStatus(msg === 'RATE_LIMITED' ? 'rate_limited' : 'error');
    }
  }, []);

  useEffect(() => {
    if (initialKeyword) {
      const initFilters = { ...filters, keyword: initialKeyword };
      setFilters(initFilters);
      fetchNews(initFilters, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = (newFilters: NewsFilters) => {
    setFilters(newFilters);
    fetchNews(newFilters, 1);
  };

  const handleClear = () => {
    const cleared: NewsFilters = {
      sortBy: 'publishedAt',
      page: 1,
      pageSize: 6,
    };
    setFilters(cleared);
    setArticles([]);
    setTotalResults(0);
    setStatus('idle');
  };

  const handleRetry = () => {
    fetchNews(filters, currentPage);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    fetchNews(filters, page);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground-900 mb-6 animate-fade-in-up">
            {t('explore.title')}
          </h1>

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onApply={handleApply}
            onClear={handleClear}
            loading={status === 'loading'}
          />

          {/* Results header */}
          {status === 'success' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 mb-4">
              <div className="flex items-center gap-2 text-sm text-foreground-600">
                <i className="ri-article-line text-lg text-accent-600"></i>
                <strong className="text-foreground-900">{totalResults.toLocaleString()}</strong>
                {t('explore.totalResults')}
                {filters.keyword && (
                  <span className="text-foreground-500">
                    para <strong className="text-foreground-800">&ldquo;{filters.keyword}&rdquo;</strong>
                  </span>
                )}
              </div>

              {/* View toggle */}
              <div className="flex items-center bg-background-100 rounded-lg p-1 border border-background-200/70">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'card'
                      ? 'bg-background-50 text-foreground-900 shadow-sm'
                      : 'text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  <i className="ri-layout-grid-line mr-1.5"></i>
                  {t('explore.cardView')}
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'table'
                      ? 'bg-background-50 text-foreground-900 shadow-sm'
                      : 'text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  <i className="ri-list-check mr-1.5"></i>
                  {t('explore.tableView')}
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {status === 'loading' && (
            <div className="mt-6">
              <LoadingGrid count={6} />
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6">
              <ErrorState onRetry={handleRetry} />
            </div>
          )}

          {status === 'rate_limited' && (
            <div className="mt-6">
              <ErrorState onRetry={handleRetry} message={t('status.rateLimited')} />
            </div>
          )}

          {status === 'empty' && (
            <div className="mt-6">
              <EmptyState onClear={handleClear} />
            </div>
          )}

          {status === 'success' && (
            <>
              {viewMode === 'card' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 stagger-children">
                  {articles.map((article, index) => (
                    <NewsCard key={`${article.url}-${index}`} article={article} />
                  ))}
                </div>
              ) : (
                <div className="mt-6">
                  <NewsTable articles={articles} />
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {status === 'idle' && (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center mt-6">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-secondary-100 mb-6">
                <i className="ri-search-2-line text-3xl text-foreground-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-foreground-700 mb-2">
                Realiza una búsqueda para comenzar
              </h3>
              <p className="text-foreground-500 text-sm max-w-md">
                Usa los filtros para buscar noticias por palabra clave, fecha, idioma o fuente. Los resultados se mostrarán aquí.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}