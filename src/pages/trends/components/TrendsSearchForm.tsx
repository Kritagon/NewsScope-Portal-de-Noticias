import { LANGUAGES } from '@/types/news';

interface TrendsSearchFormProps {
  topic: string;
  dateFrom: string;
  dateTo: string;
  language: string;
  onTopicChange: (v: string) => void;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  onLanguageChange: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}

export default function TrendsSearchForm({
  topic,
  dateFrom,
  dateTo,
  language,
  onTopicChange,
  onDateFromChange,
  onDateToChange,
  onLanguageChange,
  onAnalyze,
  loading,
}: TrendsSearchFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) onAnalyze();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background-100 rounded-2xl border border-background-200/70 p-5 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label htmlFor="trends-topic" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Tema por analizar
          </label>
          <input
            id="trends-topic"
            type="text"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            placeholder="ej. Inteligencia artificial, cambio climático..."
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-400/30 transition-colors"
          />
        </div>

        <div className="w-full lg:w-40">
          <label htmlFor="trends-date-from" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Fecha desde
          </label>
          <input
            id="trends-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-400/30 transition-colors"
          />
        </div>

        <div className="w-full lg:w-40">
          <label htmlFor="trends-date-to" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Fecha hasta
          </label>
          <input
            id="trends-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-400/30 transition-colors"
          />
        </div>

        <div className="w-full lg:w-36">
          <label htmlFor="trends-lang" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Idioma
          </label>
          <select
            id="trends-lang"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-400/30 transition-colors appearance-none cursor-pointer"
          >
            <option value="">Todos</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="whitespace-nowrap px-6 py-2.5 bg-primary-500 text-background-50 dark:text-foreground-950 text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <i className="ri-loader-4-line animate-spin"></i>
              Analizando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <i className="ri-line-chart-line"></i>
              Analizar tendencia
            </span>
          )}
        </button>
      </div>
    </form>
  );
}