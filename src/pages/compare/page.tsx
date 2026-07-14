import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import CompareSearchForm from '@/pages/compare/components/CompareSearchForm';
import CompareKPIs from '@/pages/compare/components/CompareKPIs';
import CompareCharts from '@/pages/compare/components/CompareCharts';
import { compareTopics } from '@/services/newsApi';
import { computeComparisonResult } from '@/services/trendsAnalyzer';
import type { ComparisonResult, ApiStatus } from '@/types/news';

const today = new Date();
const oneMonthAgo = new Date(today);
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

function formatDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default function Compare() {
  const [topicA, setTopicA] = useState('inteligencia artificial');
  const [topicB, setTopicB] = useState('ciberseguridad');
  const [dateFrom, setDateFrom] = useState(formatDateInput(oneMonthAgo));
  const [dateTo, setDateTo] = useState(formatDateInput(today));
  const [language, setLanguage] = useState('');
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const doCompare = useCallback(async () => {
    if (!topicA.trim() || !topicB.trim()) return;
    setStatus('loading');
    setErrorMessage('');
    try {
      const { articlesA, articlesB } = await compareTopics(
        topicA.trim(),
        topicB.trim(),
        dateFrom || undefined,
        dateTo || undefined,
        language || undefined
      );

      if (articlesA.length === 0 && articlesB.length === 0) {
        setStatus('empty');
        setResult(null);
        return;
      }

      const comparison = computeComparisonResult(articlesA, topicA.trim(), articlesB, topicB.trim());
      setResult(comparison);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      if (message === 'RATE_LIMITED') {
        setStatus('rate_limited');
        setErrorMessage('Límite de peticiones alcanzado. Espera un momento y vuelve a intentarlo.');
      } else {
        setStatus('error');
        setErrorMessage(message);
      }
      setResult(null);
    }
  }, [topicA, topicB, dateFrom, dateTo, language]);

  useEffect(() => {
    doCompare();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100">
                <i className="ri-scales-line text-accent-600 text-lg"></i>
              </span>
              <h1 className="text-2xl font-heading font-bold text-foreground-900">Comparador de Cobertura</h1>
            </div>
            <p className="text-sm text-foreground-600 max-w-2xl">
              Enfrenta dos temas y descubre cuál genera más cobertura mediática. Compara tendencias, fuentes y volúmenes de noticias con gráficos interactivos.
            </p>
          </div>

          {/* Search Form */}
          <CompareSearchForm
            topicA={topicA}
            topicB={topicB}
            dateFrom={dateFrom}
            dateTo={dateTo}
            language={language}
            onTopicAChange={setTopicA}
            onTopicBChange={setTopicB}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onLanguageChange={setLanguage}
            onCompare={doCompare}
            loading={status === 'loading'}
          />

          {/* Status Messages */}
          {status === 'empty' && (
            <div className="bg-background-100 rounded-2xl border border-background-200/70 p-8 text-center mb-8">
              <span className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-background-200/50">
                <i className="ri-search-line text-2xl text-foreground-400"></i>
              </span>
              <h3 className="text-lg font-semibold text-foreground-700 mb-1">Sin resultados</h3>
              <p className="text-sm text-foreground-500">
                No encontramos noticias para esos temas. Prueba cambiando los términos, el rango de fechas o el idioma.
              </p>
            </div>
          )}

          {status === 'rate_limited' && (
            <div className="bg-background-100 rounded-2xl border border-background-200/70 p-8 text-center mb-8">
              <span className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-accent-100">
                <i className="ri-timer-line text-2xl text-accent-600"></i>
              </span>
              <h3 className="text-lg font-semibold text-foreground-700 mb-1">Demasiadas peticiones</h3>
              <p className="text-sm text-foreground-500 mb-4">{errorMessage}</p>
              <button onClick={doCompare} className="whitespace-nowrap px-5 py-2 bg-accent-500 text-background-50 dark:text-foreground-950 text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors cursor-pointer">
                Reintentar
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-background-100 rounded-2xl border border-background-200/70 p-8 text-center mb-8">
              <span className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-red-100">
                <i className="ri-error-warning-line text-2xl text-red-500"></i>
              </span>
              <h3 className="text-lg font-semibold text-foreground-700 mb-1">Error al comparar</h3>
              <p className="text-sm text-foreground-500 mb-4">{errorMessage}</p>
              <button onClick={doCompare} className="whitespace-nowrap px-5 py-2 bg-accent-500 text-background-50 dark:text-foreground-950 text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors cursor-pointer">
                Reintentar
              </button>
            </div>
          )}

          {/* Results */}
          {(status === 'success' || status === 'loading') && (
            <>
              <CompareKPIs result={result} loading={status === 'loading'} topicA={topicA} topicB={topicB} />
              <CompareCharts result={result} loading={status === 'loading'} topicA={topicA} topicB={topicB} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}