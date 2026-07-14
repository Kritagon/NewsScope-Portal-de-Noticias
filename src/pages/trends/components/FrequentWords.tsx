import type { TrendMetrics } from '@/types/news';

interface FrequentWordsProps {
  words: { word: string; count: number }[];
  loading: boolean;
}

export default function FrequentWords({ words, loading }: FrequentWordsProps) {
  if (loading) {
    return (
      <div className="bg-background-100 rounded-2xl border border-background-200/70 p-5 mb-8">
        <h4 className="text-sm font-semibold text-foreground-800 mb-4 flex items-center gap-2">
          <i className="ri-font-size text-primary-500 text-base"></i>
          Palabras frecuentes
        </h4>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="h-8 w-24 skeleton-shimmer rounded-full" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="bg-background-100 rounded-2xl border border-background-200/70 p-5 mb-8">
        <h4 className="text-sm font-semibold text-foreground-800 mb-4 flex items-center gap-2">
          <i className="ri-font-size text-primary-500 text-base"></i>
          Palabras frecuentes
        </h4>
        <p className="text-sm text-foreground-500 py-4 text-center">Sin datos para analizar</p>
      </div>
    );
  }

  const maxCount = words[0]?.count || 1;
  const fontSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return 'text-base font-semibold px-4 py-2';
    if (ratio > 0.5) return 'text-sm font-medium px-3.5 py-1.5';
    if (ratio > 0.25) return 'text-xs px-3 py-1';
    return 'text-xs px-2.5 py-1';
  };

  return (
    <div className="bg-background-100 rounded-2xl border border-background-200/70 p-5 mb-8">
      <h4 className="text-sm font-semibold text-foreground-800 mb-4 flex items-center gap-2">
        <i className="ri-font-size text-primary-500 text-base"></i>
        Palabras frecuentes en los titulares
      </h4>
      <div className="flex flex-wrap gap-2">
        {words.map((w) => (
          <span
            key={w.word}
            className={`${fontSize(w.count)} rounded-full bg-secondary-100 text-secondary-800 cursor-default transition-colors hover:bg-secondary-200`}
            title={`${w.count} apariciones`}
          >
            {w.word}
            <span className="ml-1.5 text-secondary-500 text-[10px]">{w.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}