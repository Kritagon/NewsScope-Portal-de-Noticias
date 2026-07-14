import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import HeroBanner from '@/pages/home/components/HeroBanner';
import FeaturedNews from '@/pages/home/components/FeaturedNews';
import NewsGrid from '@/pages/home/components/NewsGrid';
import KPICard from '@/components/feature/KPICard';
import CategorySelector from '@/components/feature/CategorySelector';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { SkeletonKPI } from '@/components/feature/SkeletonCard';
import { fetchTopHeadlines } from '@/services/newsApi';
import { CATEGORIES } from '@/types/news';
import type { Article, ApiStatus } from '@/types/news';

export default function Home() {
  const { t } = useTranslation();
  const [category, setCategory] = useState('general');
  const [status, setStatus] = useState<ApiStatus>('loading');
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article | null>(null);
  const [kpiData, setKpiData] = useState({
    newsCount: 0,
    sourcesCount: 0,
    categoriesCount: CATEGORIES.length,
    lastUpdate: '',
  });

  const fetchNews = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await fetchTopHeadlines({
        country: 'us',
        category: category === 'general' ? undefined : category,
        pageSize: 10,
      });

      const arts = data.articles || [];
      setArticles(arts.length > 1 ? arts.slice(1) : []);
      setFeatured(arts[0] || null);

      const sources = new Set(arts.map((a) => a.source.name));
      setKpiData({
        newsCount: data.totalResults,
        sourcesCount: sources.size,
        categoriesCount: CATEGORIES.length,
        lastUpdate: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      });

      setStatus(arts.length === 0 ? 'empty' : 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      setStatus(msg === 'RATE_LIMITED' ? 'rate_limited' : 'error');
    }
  }, [category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <>
      <Navbar />

      <HeroBanner />

      {/* KPIs */}
      <section className="px-4 md:px-6 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {status === 'loading' ? (
              <>
                <SkeletonKPI />
                <SkeletonKPI />
                <SkeletonKPI />
                <SkeletonKPI />
              </>
            ) : (
              <>
                <KPICard
                  icon="ri-newspaper-line"
                  label={t('kpi.newsConsulted')}
                  value={kpiData.newsCount.toLocaleString()}
                />
                <KPICard
                  icon="ri-stack-line"
                  label={t('kpi.sourcesAvailable')}
                  value={kpiData.sourcesCount}
                />
                <KPICard
                  icon="ri-grid-line"
                  label={t('kpi.categories')}
                  value={kpiData.categoriesCount}
                />
                <KPICard
                  icon="ri-time-line"
                  label={t('kpi.lastUpdate')}
                  value={kpiData.lastUpdate}
                  sub="Hora local"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Category Selector */}
      <section className="px-4 md:px-6 pt-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-heading font-bold text-foreground-900 mb-4">
            {t('home.categoriesTitle')}
          </h2>
          <CategorySelector selected={category} onSelect={setCategory} />
        </div>
      </section>

      {/* Featured News */}
      <FeaturedNews article={featured} loading={status === 'loading'} />

      {/* News Grid */}
      <NewsGrid articles={articles} loading={status === 'loading'} />

      <Footer />
    </>
  );
}