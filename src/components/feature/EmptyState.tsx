import { useTranslation } from 'react-i18next';

export function EmptyState({ onClear }: { onClear?: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-secondary-100 mb-6">
        <i className="ri-search-line text-3xl text-foreground-400"></i>
      </div>
      <h3 className="text-lg font-semibold text-foreground-800 mb-2">{t('status.empty')}</h3>
      {onClear && (
        <button
          onClick={onClear}
          className="mt-4 px-5 py-2.5 bg-accent-500 text-background-50 dark:text-foreground-950 rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer"
        >
          {t('status.clearFilters')}
        </button>
      )}
    </div>
  );
}

export function ErrorState({ onRetry, message }: { onRetry?: () => void; message?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-50 mb-6">
        <i className="ri-error-warning-line text-3xl text-red-500"></i>
      </div>
      <h3 className="text-lg font-semibold text-foreground-800 mb-2">
        {message || t('status.error')}
      </h3>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-5 py-2.5 bg-accent-500 text-background-50 dark:text-foreground-950 rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer"
        >
          {t('status.retry')}
        </button>
      )}
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
          <div className="w-full h-48 skeleton-shimmer"></div>
          <div className="p-5 space-y-3">
            <div className="h-4 skeleton-shimmer rounded w-1/3"></div>
            <div className="h-5 skeleton-shimmer rounded w-full"></div>
            <div className="h-5 skeleton-shimmer rounded w-4/5"></div>
            <div className="h-3 skeleton-shimmer rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}