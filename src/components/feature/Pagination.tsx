interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-sm text-foreground-600 hover:bg-background-100 hover:text-foreground-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-sm text-foreground-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              currentPage === page
                ? 'bg-accent-500 text-background-50 dark:text-foreground-950'
                : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-sm text-foreground-600 hover:bg-background-100 hover:text-foreground-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
}