import { useTranslation } from 'react-i18next';
import type { Article } from '@/types/news';
import NewsCardLarge from '@/components/feature/NewsCardLarge';
import { SkeletonLarge } from '@/components/feature/SkeletonCard';

interface FeaturedNewsProps {
  article: Article | null;
  loading: boolean;
}

export default function FeaturedNews({ article, loading }: FeaturedNewsProps) {
  const { t } = useTranslation();

  return (
    <section className="px-4 md:px-6 py-10 md:py-14 bg-background-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <div className="w-1 h-6 bg-accent-500 rounded-full"></div>
          <h2 className="text-xl font-heading font-bold text-foreground-900">
            {t('home.featuredNews')}
          </h2>
        </div>

        {loading ? (
          <SkeletonLarge />
        ) : article ? (
          <div className="animate-scale-in"><NewsCardLarge article={article} /></div>
        ) : null}
      </div>
    </section>
  );
}