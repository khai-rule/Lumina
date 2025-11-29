'use client';


import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

interface RequirementCategoryPanelProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const RequirementCategoryPanel = ({
  categories,
  activeCategory,
  onCategoryChange,
}: RequirementCategoryPanelProps) => {
  return (
    <div className="bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Requirement Categories</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a category to manage requirements</p>
      </div>
      
      <nav className="p-3">
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-default focus-ring ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${category.color}`}>
                    <Icon name={category.icon as any} size={18} className="text-white" />
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border mt-4">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-md font-medium text-sm hover:bg-accent/90 transition-default focus-ring">
          <Icon name="DocumentPlusIcon" size={18} />
          <span>Import Requirements</span>
        </button>
      </div>
    </div>
  );
};

export default RequirementCategoryPanel;