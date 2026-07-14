import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { EmptyState } from '@/components/feature/EmptyState';
import TrendsSearchForm from '@/pages/trends/components/TrendsSearchForm';
import TrendsKPIs from '@/pages/trends/components/TrendsKPIs';
import TrendsCharts from '@/pages/trends/components/TrendsCharts';
import FrequentWords from '@/pages/trends/components/FrequentWords';
import TrendsDetailTable from '@/pages/trends/components/TrendsDetailTable';
import { analyzeTrends } from '@/services/newsApi';
import { computeTrendMetrics } from '@/services/trendsAnalyzer';
import type { TrendMetrics, Article, ApiStatus } from '@/types/news';
import { useTranslation } from 'react-i18next';
import { useState, useCallback } from 'react';

export default function Trends() {
  const { t } = useTranslation();

  const [topic, setTopic] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [language, setLanguage] = useState('');
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [articles, setArticles] = useState<Article[]>([]);
  const [metrics, setMetrics] = useState<TrendMetrics | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = useCallback(async () => {
    if (!topic.trim()) return;

    setStatus('loading');
    setErrorMessage('');
    setArticles([]);
    setMetrics(null);

    try {
      const data = await analyzeTrends(
        topic.trim(),
        dateFrom || undefined,
        dateTo || undefined,
        language || undefined
      );

      if (data.length === 0) {
        setStatus('empty');
        return;
      }

      setArticles(data);
      const computed = computeTrendMetrics(data, topic.trim());
      setMetrics(computed);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'RATE_LIMITED') {
        setErrorMessage(t('status.rateLimited'));
        setStatus('rate_limited');
      } else {
        setErrorMessage(t('status.error'));
        setStatus('error');
      }
    }
  }, [topic, dateFrom, dateTo, language, t]);

  const handleClear = () => {
    setTopic('');
    setDateFrom('');
    setDateTo('');
    setLanguage('');
    setStatus('idle');
    setArticles([]);
    setMetrics(null);
    setErrorMessage('');
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground-900 mb-2">
              {t('trends.title')}
            </h1>
            <p className="text-sm text-foreground-600 max-w-2xl">
              Analiza la evolución de cualquier tema en los medios. Descubre patrones de cobertura, las fuentes más activas y las palabras que dominan el debate.
            </p>
          </div>

          {/* Search Form */}
          <TrendsSearchForm
            topic={topic}
            dateFrom={dateFrom}
            dateTo={dateTo}
            language={language}
            onTopicChange={setTopic}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onLanguageChange={setLanguage}
            onAnalyze={handleAnalyze}
            loading={status === 'loading'}
          />

          {/* Active filters */}
          {(topic || dateFrom || dateTo || language) && status !== 'idle' && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-foreground-500">Filtros activos:</span>
              {topic && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full">
                  Tema: {topic}
                </span>
              )}
              {dateFrom && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full">
                  Desde: {dateFrom}
                </span>
              )}
              {dateTo && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full">
                  Hasta: {dateTo}
                </span>
              )}
              {language && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full">
                  Idioma: {language.toUpperCase()}
                </span>
              )}
              <button
                onClick={handleClear}
                className="text-xs text-foreground-500 hover:text-foreground-700 underline cursor-pointer ml-2"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="bg-background-100 rounded-2xl border border-background-200/70 p-8 text-center mb-8">
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-full bg-red-100">
                <i className="ri-error-warning-line text-2xl text-red-500"></i>
              </div>
              <p className="text-foreground-800 font-medium mb-1">{errorMessage}</p>
              <button onClick={handleAnalyze} className="mt-4 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                <i className="ri-refresh-line"></i>
                {t('status.retry')}
              </button>
            </div>
          )}

          {/* Rate Limited */}
          {status === 'rate_limited' && (
            <div className="bg-background-100 rounded-2xl border border-background-200/70 p-8 text-center mb-8">
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-full bg-amber-100">
                <i className="ri-timer-line text-2xl text-amber-600"></i>
              </div>
              <p className="text-foreground-800 font-medium mb-1">{errorMessage}</p>
              <button onClick={handleAnalyze} className="mt-4 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                <i className="ri-refresh-line"></i>
                Intentar nuevamente
              </button>
            </div>
          )}

          {/* Empty */}
          {status === 'empty' && (
            <EmptyState onClear={handleClear} />
          )}

          {/* KPI Indicators */}
          <TrendsKPIs metrics={metrics} loading={status === 'loading'} topic={topic} />

          {/* Charts */}
          <TrendsCharts metrics={metrics} loading={status === 'loading'} />

          {/* Frequent Words */}
          <FrequentWords words={metrics?.frequentWords || []} loading={status === 'loading'} />

          {/* Detail Table */}
          <TrendsDetailTable articles={articles} loading={status === 'loading'} />

          {/* Idle State */}
          {status === 'idle' && (
            <div className="bg-background-100 rounded-2xl border border-background-200/70 p-12 text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-accent-100">
                <i className="ri-line-chart-line text-3xl text-accent-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-foreground-800 mb-2">
                Análisis de tendencias
              </h3>
              <p className="text-sm text-foreground-500 max-w-md mx-auto mb-6">
                Ingresa un tema como &ldquo;inteligencia artificial&rdquo;, &ldquo;cambio climático&rdquo; o &ldquo;criptomonedas&rdquo; y descubre cómo ha evolucionado su cobertura mediática.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Inteligencia artificial', 'Ciberseguridad', 'Cambio climático', 'Blockchain', 'Energía renovable'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => { setTopic(suggestion); }}
                    className="whitespace-nowrap px-4 py-2 text-xs rounded-full bg-background-50 border border-background-200/70 text-foreground-700 hover:border-accent-300 hover:text-foreground-900 transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}