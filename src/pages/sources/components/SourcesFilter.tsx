import { CATEGORIES, LANGUAGES } from '@/types/news';

const COUNTRIES = [
  { code: '', label: 'Todos los países' },
  { code: 'us', label: 'Estados Unidos' },
  { code: 'gb', label: 'Reino Unido' },
  { code: 'es', label: 'España' },
  { code: 'fr', label: 'Francia' },
  { code: 'de', label: 'Alemania' },
  { code: 'mx', label: 'México' },
  { code: 'ar', label: 'Argentina' },
  { code: 'br', label: 'Brasil' },
  { code: 'it', label: 'Italia' },
  { code: 'jp', label: 'Japón' },
  { code: 'au', label: 'Australia' },
  { code: 'ca', label: 'Canadá' },
  { code: 'in', label: 'India' },
];

export interface SourcesFilters {
  search: string;
  category: string;
  language: string;
  country: string;
}

interface SourcesFilterProps {
  filters: SourcesFilters;
  onChange: (filters: SourcesFilters) => void;
  totalCount: number;
}

export default function SourcesFilter({ filters, onChange, totalCount }: SourcesFilterProps) {
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 md:p-5">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Buscar fuente por nombre..."
            className="w-full pl-9 pr-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 placeholder-foreground-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all min-w-[140px]"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}
            </option>
          ))}
        </select>

        {/* Language */}
        <select
          value={filters.language}
          onChange={(e) => onChange({ ...filters, language: e.target.value })}
          className="px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all min-w-[130px]"
        >
          <option value="">Todos los idiomas</option>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>

        {/* Country */}
        <select
          value={filters.country}
          onChange={(e) => onChange({ ...filters, country: e.target.value })}
          className="px-4 py-2.5 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all min-w-[150px]"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active filters chips */}
      {(filters.category || filters.language || filters.country || filters.search) && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-foreground-500">Filtros activos:</span>
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-100 text-accent-800 rounded-full text-xs font-medium">
              &ldquo;{filters.search}&rdquo;
              <button
                onClick={() => onChange({ ...filters, search: '' })}
                className="hover:text-accent-950 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-100 text-accent-800 rounded-full text-xs font-medium">
              {filters.category}
              <button
                onClick={() => onChange({ ...filters, category: '' })}
                className="hover:text-accent-950 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </span>
          )}
          {filters.language && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-100 text-accent-800 rounded-full text-xs font-medium">
              {LANGUAGES.find((l) => l.code === filters.language)?.label || filters.language}
              <button
                onClick={() => onChange({ ...filters, language: '' })}
                className="hover:text-accent-950 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </span>
          )}
          {filters.country && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-100 text-accent-800 rounded-full text-xs font-medium">
              {COUNTRIES.find((c) => c.code === filters.country)?.label || filters.country}
              <button
                onClick={() => onChange({ ...filters, country: '' })}
                className="hover:text-accent-950 cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </span>
          )}
          <button
            onClick={() => onChange({ search: '', category: '', language: '', country: '' })}
            className="text-xs text-foreground-500 hover:text-foreground-700 underline cursor-pointer"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* Count */}
      <div className="flex items-center gap-2 mt-3 text-sm text-foreground-600">
        <i className="ri-stack-line text-accent-600"></i>
        <strong className="text-foreground-900">{totalCount}</strong>
        fuentes encontradas
      </div>
    </div>
  );
}