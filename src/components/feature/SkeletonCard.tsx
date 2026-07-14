export function SkeletonCard() {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
      <div className="w-full h-48 skeleton-shimmer"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton-shimmer rounded w-1/3"></div>
        <div className="h-5 skeleton-shimmer rounded w-full"></div>
        <div className="h-5 skeleton-shimmer rounded w-4/5"></div>
        <div className="h-3 skeleton-shimmer rounded w-2/3"></div>
        <div className="flex justify-between pt-2">
          <div className="h-3 skeleton-shimmer rounded w-1/4"></div>
          <div className="h-3 skeleton-shimmer rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLarge() {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 h-64 lg:h-full min-h-[280px] skeleton-shimmer"></div>
        <div className="lg:col-span-3 p-8 space-y-4">
          <div className="flex gap-3">
            <div className="h-6 skeleton-shimmer rounded-full w-20"></div>
            <div className="h-6 skeleton-shimmer rounded w-32"></div>
          </div>
          <div className="h-8 skeleton-shimmer rounded w-full"></div>
          <div className="h-8 skeleton-shimmer rounded w-3/4"></div>
          <div className="h-4 skeleton-shimmer rounded w-full"></div>
          <div className="h-4 skeleton-shimmer rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonKPI() {
  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 space-y-3">
      <div className="w-10 h-10 skeleton-shimmer rounded-lg"></div>
      <div className="h-8 skeleton-shimmer rounded w-16"></div>
      <div className="h-4 skeleton-shimmer rounded w-24"></div>
    </div>
  );
}