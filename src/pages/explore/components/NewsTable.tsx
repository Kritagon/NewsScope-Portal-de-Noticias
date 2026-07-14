import { useTranslation } from 'react-i18next';
import type { Article } from '@/types/news';

interface NewsTableProps {
  articles: Article[];
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function NewsTable({ articles }: NewsTableProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-xl border border-background-200/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-background-100 text-left">
            <th className="px-4 py-3 font-semibold text-foreground-700 whitespace-nowrap">{t('explore.tableDate')}</th>
            <th className="px-4 py-3 font-semibold text-foreground-700 whitespace-nowrap">{t('explore.tableSource')}</th>
            <th className="px-4 py-3 font-semibold text-foreground-700 whitespace-nowrap">{t('explore.tableAuthor')}</th>
            <th className="px-4 py-3 font-semibold text-foreground-700">{t('explore.tableTitle')}</th>
            <th className="px-4 py-3 font-semibold text-foreground-700 whitespace-nowrap">{t('explore.tableLink')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-background-200/50">
          {articles.map((article, index) => (
            <tr key={`${article.title}-${index}`} className="hover:bg-background-100/50 transition-colors">
              <td className="px-4 py-3 text-foreground-600 whitespace-nowrap text-xs">{formatDate(article.publishedAt)}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 bg-accent-100 text-accent-700 text-xs font-medium rounded-full whitespace-nowrap">
                  {article.source.name}
                </span>
              </td>
              <td className="px-4 py-3 text-foreground-600 text-xs max-w-[120px] truncate">
                {article.author || t('article.noAuthor')}
              </td>
              <td className="px-4 py-3">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-900 hover:text-accent-600 transition-colors line-clamp-2 text-xs font-medium"
                >
                  {article.title}
                </a>
              </td>
              <td className="px-4 py-3">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-600 hover:text-accent-700 text-xs font-medium whitespace-nowrap transition-colors"
                >
                  {t('article.readMore')}
                  <i className="ri-arrow-right-up-line text-xs"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}