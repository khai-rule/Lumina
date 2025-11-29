'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

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
    <div className="w-full lg:w-16 bg-card border border-border rounded-lg overflow-hidden">
      {/* Category Tabs */}
      <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-border">
        {toolCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center justify-center p-3 transition-default ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            title={category.name}
          >
            <Icon name={category.icon as any} size={20} />
            <span className="ml-2 lg:hidden text-sm">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="p-2">
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-1">
          {getToolsByCategory(activeCategory).map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolSelect(tool.id)}
              className={`flex items-center justify-center p-3 rounded-md transition-default ${
                selectedTool === tool.id
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              title={tool.name}
            >
              <Icon name={tool.icon as any} size={18} />
            </button>
          ))}
        </div>
      </div>

      {/* Tool Properties */}
      <div className="p-3 border-t border-border">
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
    </div>
  );
};

export default DrawingToolbar;