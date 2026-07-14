import { useState, useMemo } from 'react';
import type { Article } from '@/types/news';

interface TrendsDetailTableProps {
  articles: Article[];
  loading: boolean;
}

type SortField = 'date' | 'source';
type SortDir = 'asc' | 'desc';

export default function TrendsDetailTable({ articles, loading }: TrendsDetailTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sortedArticles = useMemo(() => {
    const sorted = [...articles];
    sorted.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'date') {
        cmp = a.publishedAt.localeCompare(b.publishedAt);
      } else {
        const sourceA = a.source.name || '';
        const sourceB = b.source.name || '';
        cmp = sourceA.localeCompare(sourceB);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [articles, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <i className="ri-expand-up-down-fill text-foreground-400 text-xs ml-1"></i>;
    return sortDir === 'asc'
      ? <i className="ri-sort-asc text-foreground-800 text-xs ml-1"></i>
      : <i className="ri-sort-desc text-foreground-800 text-xs ml-1"></i>;
  };

  if (loading) {
    return (
      <div className="bg-background-100 rounded-2xl border border-background-200/70 p-5 mb-8">
        <div className="h-5 w-32 skeleton-shimmer rounded mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 skeleton-shimmer rounded mb-2" />
        ))}
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div className="bg-background-100 rounded-2xl border border-background-200/70 overflow-hidden mb-8">
      <div className="p-5 border-b border-background-200/70">
        <h4 className="text-sm font-semibold text-foreground-800 flex items-center gap-2">
          <i className="ri-table-line text-primary-500 text-base"></i>
          Tabla de detalle
          <span className="text-xs font-normal text-foreground-500 ml-2">({articles.length} noticias)</span>
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-background-200/70 bg-background-200/30">
              <th
                className="text-left px-5 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('date')}
              >
                Fecha <SortIcon field="date" />
              </th>
              <th
                className="text-left px-5 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('source')}
              >
                Fuente <SortIcon field="source" />
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider whitespace-nowrap">Autor</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider">Titular</th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-foreground-600 uppercase tracking-wider whitespace-nowrap">Enlace</th>
            </tr>
          </thead>
          <tbody>
            {sortedArticles.map((article, index) => (
              <tr key={index} className="border-b border-background-200/50 hover:bg-background-50 transition-colors">
                <td className="px-5 py-3 text-foreground-600 whitespace-nowrap text-xs">
                  {new Date(article.publishedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-5 py-3 text-foreground-800 font-medium whitespace-nowrap text-xs">
                  {article.source.name || 'Desconocido'}
                </td>
                <td className="px-5 py-3 text-foreground-500 text-xs max-w-[120px] truncate" title={article.author || ''}>
                  {article.author || 'No disponible'}
                </td>
                <td className="px-5 py-3 text-foreground-800 text-xs max-w-[300px] truncate" title={article.title}>
                  {article.title}
                </td>
                <td className="px-5 py-3 text-center whitespace-nowrap">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <i className="ri-external-link-line"></i>
                    Abrir
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}