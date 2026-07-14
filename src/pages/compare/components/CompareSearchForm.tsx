import { LANGUAGES } from '@/types/news';

interface CompareSearchFormProps {
  topicA: string;
  topicB: string;
  dateFrom: string;
  dateTo: string;
  language: string;
  onTopicAChange: (v: string) => void;
  onTopicBChange: (v: string) => void;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
  onLanguageChange: (v: string) => void;
  onCompare: () => void;
  loading: boolean;
}

export default function CompareSearchForm({
  topicA,
  topicB,
  dateFrom,
  dateTo,
  language,
  onTopicAChange,
  onTopicBChange,
  onDateFromChange,
  onDateToChange,
  onLanguageChange,
  onCompare,
  loading,
}: CompareSearchFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicA.trim() && topicB.trim()) onCompare();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background-100 rounded-2xl border border-background-200/70 p-5 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label htmlFor="compare-topic-a" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Tema A
          </label>
          <input
            id="compare-topic-a"
            type="text"
            value={topicA}
            onChange={(e) => onTopicAChange(e.target.value)}
            placeholder="ej. Inteligencia artificial"
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-400/30 transition-colors"
          />
        </div>

        <div className="hidden lg:flex items-center pt-6">
          <span className="text-sm font-semibold text-foreground-500 px-2">vs</span>
        </div>

        <div className="flex-1 w-full">
          <label htmlFor="compare-topic-b" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Tema B
          </label>
          <input
            id="compare-topic-b"
            type="text"
            value={topicB}
            onChange={(e) => onTopicBChange(e.target.value)}
            placeholder="ej. Ciberseguridad"
            className="w-full px-4 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-accent-300 focus:ring-2 focus:ring-accent-400/30 transition-colors"
          />
        </div>

        <div className="w-full lg:w-36">
          <label htmlFor="compare-date-from" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Fecha desde
          </label>
          <input
            id="compare-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-400/30 transition-colors"
          />
        </div>

        <div className="w-full lg:w-36">
          <label htmlFor="compare-date-to" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Fecha hasta
          </label>
          <input
            id="compare-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg bg-background-50 border border-background-200/70 text-foreground-900 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-400/30 transition-colors"
          />
        </div>

        <div className="w-full lg:w-36">
          <label htmlFor="compare-lang" className="block text-sm font-medium text-foreground-700 mb-1.5">
            Idioma
          </label>
          <select
            id="compare-lang"
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
          disabled={loading || !topicA.trim() || !topicB.trim()}
          className="whitespace-nowrap px-6 py-2.5 bg-accent-500 text-background-50 dark:text-foreground-950 text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <i className="ri-loader-4-line animate-spin"></i>
              Comparando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <i className="ri-scales-line"></i>
              Comparar temas
            </span>
          )}
        </button>
      </div>
    </form>
  );
}