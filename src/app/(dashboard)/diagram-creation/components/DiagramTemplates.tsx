'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  alt: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
}

interface DiagramTemplatesProps {
  onTemplateSelect: (template: Template) => void;
}

const DiagramTemplates = ({ onTemplateSelect }: DiagramTemplatesProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
  { id: 'all', name: 'All Templates', count: 12 },
  { id: 'uml', name: 'UML Diagrams', count: 4 },
  { id: 'flowchart', name: 'Flowcharts', count: 3 },
  { id: 'architecture', name: 'Architecture', count: 3 },
  { id: 'database', name: 'Database', count: 2 }];


  const templates: Template[] = [
  {
    id: '1',
    name: 'Class Diagram',
    category: 'uml',
    description: 'Basic UML class diagram template with inheritance relationships',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_193391b54-1764145719129.png",
    alt: 'UML class diagram template showing connected boxes with class relationships',
    complexity: 'beginner'
  },
  {
    id: '2',
    name: 'Use Case Diagram',
    category: 'uml',
    description: 'User interaction and system boundary visualization',
    thumbnail: "https://images.unsplash.com/photo-1719261779184-66b846a98ec9",
    alt: 'Use case diagram template with actors and system interactions',
    complexity: 'beginner'
  },
  {
    id: '3',
    name: 'Sequence Diagram',
    category: 'uml',
    description: 'Object interaction over time representation',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1c93f0617-1764145719289.png",
    alt: 'Sequence diagram template showing timeline interactions between objects',
    complexity: 'intermediate'
  },
  {
    id: '4',
    name: 'Activity Diagram',
    category: 'uml',
    description: 'Workflow and business process modeling',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1639a8c94-1764145720142.png",
    alt: 'Activity diagram template with workflow nodes and decision points',
    complexity: 'intermediate'
  },
  {
    id: '5',
    name: 'Basic Flowchart',
    category: 'flowchart',
    description: 'Simple process flow with decision points',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_159c246f6-1764145720923.png",
    alt: 'Basic flowchart template with start, process, and decision symbols',
    complexity: 'beginner'
  },
  {
    id: '6',
    name: 'Algorithm Flowchart',
    category: 'flowchart',
    description: 'Complex algorithm visualization with loops',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1acf58191-1764145719799.png",
    alt: 'Algorithm flowchart template with loop structures and complex logic',
    complexity: 'advanced'
  },
  {
    id: '7',
    name: 'System Architecture',
    category: 'architecture',
    description: 'High-level system component overview',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebd0db3d-1764145718852.png",
    alt: 'System architecture diagram template showing connected system components',
    complexity: 'intermediate'
  },
  {
    id: '8',
    name: 'Microservices Architecture',
    category: 'architecture',
    description: 'Distributed system design pattern',
    thumbnail: "https://images.unsplash.com/photo-1610650394203-1cfee9542823",
    alt: 'Microservices architecture template with service boundaries and APIs',
    complexity: 'advanced'
  },
  {
    id: '9',
    name: 'Entity Relationship Diagram',
    category: 'database',
    description: 'Database schema and relationships',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1860effbe-1764145721825.png",
    alt: 'Entity relationship diagram template showing database tables and connections',
    complexity: 'intermediate'
  }];


  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getComplexityColor = (complexity: Template['complexity']) => {
    switch (complexity) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Diagram Templates</h2>
          <p className="text-muted-foreground">Choose a template to get started quickly</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full lg:w-64">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" />

          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10" />

        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) =>
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'secondary'}
          size="sm"
          onClick={() => setSelectedCategory(category.id)}
          className={selectedCategory === category.id ? '' : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'}
          >

            {category.name}
            <span className="ml-2 text-xs opacity-75">({category.count})</span>
          </Button>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) =>
        <Card
          key={template.id}
          onClick={() => onTemplateSelect(template)}
          className="group overflow-hidden hover:shadow-hover transition-default cursor-pointer p-0">

            <div className="aspect-video overflow-hidden">
              <AppImage
              src={template.thumbnail}
              alt={template.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-default">
                  {template.name}
                </h3>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getComplexityColor(template.complexity)}`}>
                  {template.complexity}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground capitalize">
                  {template.category.replace('-', ' ')}
                </span>
                <Icon
                name="ArrowRightIcon"
                size={16}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />

              </div>
            </div>
          </Card>
        )}
      </div>

      {filteredTemplates.length === 0 &&
      <div className="text-center py-12">
          <Icon name="DocumentIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or category filter
          </p>
        </div>
      }
    </div>);

};

export default DiagramTemplates;