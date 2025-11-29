'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Tool {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'shapes' | 'connectors' | 'text';
}

interface DrawingToolbarProps {
  selectedTool: string;
  onToolSelect: (toolId: string) => void;
}

const DrawingToolbar = ({ selectedTool, onToolSelect }: DrawingToolbarProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('basic');

  const toolCategories = [
    { id: 'basic', name: 'Basic', icon: 'CursorArrowRaysIcon' },
    { id: 'shapes', name: 'Shapes', icon: 'Square3Stack3DIcon' },
    { id: 'connectors', name: 'Connectors', icon: 'ArrowRightIcon' },
    { id: 'text', name: 'Text', icon: 'DocumentTextIcon' },
  ];

  const tools: Tool[] = [
    { id: 'select', name: 'Select', icon: 'CursorArrowRaysIcon', category: 'basic' },
    { id: 'rectangle', name: 'Rectangle', icon: 'RectangleStackIcon', category: 'shapes' },
    { id: 'circle', name: 'Circle', icon: 'EllipsisHorizontalCircleIcon', category: 'shapes' },
    { id: 'line', name: 'Line', icon: 'MinusIcon', category: 'connectors' },
    { id: 'arrow', name: 'Arrow', icon: 'ArrowRightIcon', category: 'connectors' },
    { id: 'text', name: 'Text', icon: 'DocumentTextIcon', category: 'text' },
  ];

  const getToolsByCategory = (category: string) => {
    return tools.filter((tool) => tool.category === category);
  };

  return (
    <Card className="w-full lg:w-16 overflow-hidden flex flex-col p-0">
      {/* Category Tabs */}
      <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-border">
        {toolCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveCategory(category.id)}
            className={`w-auto lg:w-full h-auto p-3 rounded-none ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            title={category.name}
          >
            <Icon name={category.icon as any} size={20} />
            <span className="ml-2 lg:hidden text-sm">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="p-2">
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-1">
          {getToolsByCategory(activeCategory).map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onToolSelect(tool.id)}
              className={`w-full h-10 ${
                selectedTool === tool.id
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              title={tool.name}
            >
              <Icon name={tool.icon as any} size={18} />
            </Button>
          ))}
        </div>
      </div>

      {/* Tool Properties */}
      <div className="p-3 border-t border-border mt-auto">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-muted-foreground">
            Stroke Width
          </label>
          <input
            type="range"
            min="1"
            max="10"
            defaultValue="2"
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};

export default DrawingToolbar;