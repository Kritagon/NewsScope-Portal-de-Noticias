import { useTranslation } from 'react-i18next';
import type { Article } from '@/types/news';
import NewsCard from '@/components/feature/NewsCard';
import { LoadingGrid } from '@/components/feature/EmptyState';

interface NewsGridProps {
  articles: Article[];
  loading: boolean;
}

export default function NewsGrid({ articles, loading }: NewsGridProps) {
  const { t } = useTranslation();

  return (
    <section className="px-4 md:px-6 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <div className="w-1 h-6 bg-accent-500 rounded-full"></div>
          <h2 className="text-xl font-heading font-bold text-foreground-900">
            {t('home.featuredTitle')}
          </h2>
        </div>

        {loading ? (
          <LoadingGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {articles.map((article, index) => (
              <NewsCard key={`${article.title}-${index}`} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}