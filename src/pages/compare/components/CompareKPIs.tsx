import type { ComparisonResult } from '@/types/news';

interface CompareKPIsProps {
  result: ComparisonResult | null;
  loading: boolean;
  topicA: string;
  topicB: string;
}

export default function CompareKPIs({ result, loading, topicA, topicB }: CompareKPIsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[0, 1].map((col) => (
          <div key={col} className="bg-background-100 rounded-2xl border border-background-200/70 p-5">
            <div className="h-5 w-32 skeleton-shimmer rounded mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="p-3 rounded-lg bg-background-50">
                  <div className="h-3 w-16 skeleton-shimmer rounded mb-2" />
                  <div className="h-6 w-12 skeleton-shimmer rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!result) return null;

  const formatPeakDay = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const TopicKPICard = ({ topic, metrics, isWinner, colorClass }: {
    topic: string;
    metrics: typeof result.topicA;
    isWinner: boolean;
    colorClass: string;
  }) => (
    <div className={`bg-background-100 rounded-2xl border-2 p-5 transition-all ${isWinner ? `${colorClass} shadow-sm` : 'border-background-200/70'}`}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-base font-semibold text-foreground-800 truncate">{topic}</h3>
        {isWinner && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-700 bg-accent-100 px-2 py-0.5 rounded-full whitespace-nowrap">
            <i className="ri-trophy-line text-xs"></i>
            Mayor cobertura
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background-50 rounded-lg p-3 border border-background-200/50">
          <p className="text-xs text-foreground-500 mb-0.5">Total de noticias</p>
          <p className="text-xl font-bold text-foreground-900">{metrics.totalNews}</p>
        </div>
        <div className="bg-background-50 rounded-lg p-3 border border-background-200/50">
          <p className="text-xs text-foreground-500 mb-0.5">Fuentes</p>
          <p className="text-xl font-bold text-foreground-900">{metrics.totalSources}</p>
        </div>
        <div className="bg-background-50 rounded-lg p-3 border border-background-200/50">
          <p className="text-xs text-foreground-500 mb-0.5">Promedio diario</p>
          <p className="text-xl font-bold text-foreground-900">{metrics.avgPerDay}</p>
        </div>
        <div className="bg-background-50 rounded-lg p-3 border border-background-200/50">
          <p className="text-xs text-foreground-500 mb-0.5">Pico: {formatPeakDay(metrics.peakDay)}</p>
          <p className="text-xl font-bold text-foreground-900">{metrics.peakCount}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Comparison Summary Banner */}
      <div className="bg-accent-100/70 rounded-xl border border-accent-200/60 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <i className="ri-scales-line text-accent-600 text-lg"></i>
            <span className="text-sm font-semibold text-foreground-800">Resultado de la comparación</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-foreground-600">
              {result.winner === 'A' ? topicA : result.winner === 'B' ? topicB : 'Empate'} lidera con{' '}
              <strong className="text-foreground-900">
                {result.winner === 'A' ? result.topicA.totalNews : result.winner === 'B' ? result.topicB.totalNews : result.topicA.totalNews}
              </strong>{' '}
              noticias
            </span>
            <span className="text-foreground-400">|</span>
            <span className="text-foreground-600">
              Diferencia: <strong className="text-foreground-900">{result.absoluteDifference}</strong> noticias ({result.percentageDifference}%)
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-side KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopicKPICard
          topic={topicA}
          metrics={result.topicA}
          isWinner={result.winner === 'A'}
          colorClass="border-primary-300/60"
        />
        <TopicKPICard
          topic={topicB}
          metrics={result.topicB}
          isWinner={result.winner === 'B'}
          colorClass="border-accent-300/60"
        />
      </div>
    </div>
  );
}