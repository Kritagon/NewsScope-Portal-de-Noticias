import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '@/types/news';

interface CategorySelectorProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer border ${
            selected === cat.id
              ? 'bg-accent-500 text-background-50 dark:text-foreground-950 border-accent-500 scale-105'
              : 'bg-background-50 text-foreground-700 border-background-200/70 hover:border-accent-300 hover:text-accent-600 hover:scale-105'
          }`}
        >
          <i className={`${cat.icon} text-base`}></i>
          {t(cat.labelKey)}
        </button>
      ))}
    </div>
  );
}