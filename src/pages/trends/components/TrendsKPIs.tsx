import type { TrendMetrics } from '@/types/news';
import KPICard from '@/components/feature/KPICard';

interface TrendsKPIsProps {
  metrics: TrendMetrics | null;
  loading: boolean;
  topic: string;
}

export default function TrendsKPIs({ metrics, loading, topic }: TrendsKPIsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-background-100 rounded-xl border border-background-200/70 p-5">
            <div className="h-3 w-20 skeleton-shimmer rounded mb-3" />
            <div className="h-7 w-16 skeleton-shimmer rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const formatPeakDay = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-foreground-600 mb-3">
        Indicadores para <span className="text-foreground-900 font-semibold">&ldquo;{topic}&rdquo;</span>
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon="ri-article-line" label="Total de noticias" value={metrics.totalNews.toLocaleString()} />
        <KPICard icon="ri-stack-line" label="Cantidad de fuentes" value={metrics.totalSources.toString()} />
        <KPICard icon="ri-bar-chart-line" label="Promedio diario" value={metrics.avgPerDay.toLocaleString()} />
        <KPICard icon="ri-calendar-check-line" label="Día con mayor cobertura" value={formatPeakDay(metrics.peakDay)} sub={`${metrics.peakCount} noticias`} />
      </div>
    </div>
  );
}