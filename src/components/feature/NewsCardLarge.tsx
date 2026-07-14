import { useTranslation } from 'react-i18next';
import type { Article } from '@/types/news';

interface NewsCardLargeProps {
  article: Article;
}

function formatDateTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function NewsCardLarge({ article }: NewsCardLargeProps) {
  const { t } = useTranslation();

  return (
    <article className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden transition-all hover:border-accent-200/50">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image */}
        <div className="lg:col-span-2 relative h-64 lg:h-full min-h-[280px] bg-secondary-100 overflow-hidden">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-foreground-400 gap-2">
              <i className="ri-image-line text-5xl"></i>
              <span className="text-sm">{t('article.noImage')}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full whitespace-nowrap">
              {article.source.name}
            </span>
            <span className="text-sm text-foreground-500">
              {formatDateTime(article.publishedAt)}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground-900 leading-tight mb-3">
            {article.title}
          </h2>

          <p className="text-foreground-600 leading-relaxed mb-5">
            {article.description || t('article.noDescription')}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-500 text-background-50 dark:text-foreground-950 rounded-lg text-sm font-semibold hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('article.readMore')}
              <i className="ri-arrow-right-up-line"></i>
            </a>
            {article.author && (
              <span className="text-sm text-foreground-500">
                {t('article.publishedAt')} por <strong>{article.author}</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}