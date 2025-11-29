'use client';


import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    <Card className="h-full overflow-y-auto border-r border-border rounded-none border-t-0 border-b-0 border-l-0">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Requirement Categories</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a category to manage requirements</p>
      </div>
      
      <nav className="p-3">
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <Button
                variant={activeCategory === category.id ? 'default' : 'ghost'}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full justify-between h-auto py-3 px-4 ${
                  activeCategory === category.id
                    ? 'shadow-subtle'
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
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border mt-4">
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center space-x-2"
        >
          <Icon name="DocumentPlusIcon" size={18} />
          <span>Import Requirements</span>
        </Button>
      </div>
    </Card>
  );
};

export default RequirementCategoryPanel;