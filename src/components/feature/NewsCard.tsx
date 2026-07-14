import { useTranslation } from 'react-i18next';
import type { Article } from '@/types/news';

interface NewsCardProps {
  article: Article;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function NewsCard({ article }: NewsCardProps) {
  const { t } = useTranslation();

  return (
    <article className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden transition-all duration-300 hover:border-accent-200/50 hover:translate-y-[-3px] group">
      {/* Image */}
      <div className="relative w-full h-48 bg-secondary-100 overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-foreground-400 gap-2">
            <i className="ri-image-line text-3xl"></i>
            <span className="text-xs">{t('article.noImage')}</span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-900/80 backdrop-blur-sm text-background-50 text-xs font-medium rounded-full whitespace-nowrap">
          {article.source.name}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="text-base font-semibold text-foreground-900 leading-snug line-clamp-2 mb-2 group-hover:text-accent-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-foreground-600 line-clamp-2 mb-3">
          {article.description || t('article.noDescription')}
        </p>
        <div className="flex items-center justify-between text-xs text-foreground-500">
          <span className="truncate max-w-[140px]">{article.author || t('article.noAuthor')}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors whitespace-nowrap"
        >
          {t('article.readMore')}
          <i className="ri-arrow-right-up-line text-sm"></i>
        </a>
      </div>
    </article>
  );
}