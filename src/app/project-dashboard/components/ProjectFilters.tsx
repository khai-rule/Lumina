'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface FilterOptions {
  phase: string;
  status: string;
  sortBy: string;
  searchQuery: string;
}

interface ProjectFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
}

const ProjectFilters = ({ onFiltersChange }: ProjectFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    phase: 'all',
    status: 'all',
    sortBy: 'lastModified',
    searchQuery: '',
  });

  const phases = [
    { value: 'all', label: 'All Phases' },
    { value: 'planning', label: 'Planning' },
    { value: 'requirements', label: 'Requirements' },
    { value: 'design', label: 'Design' },
    { value: 'implementation', label: 'Implementation' },
    { value: 'testing', label: 'Testing' },
    { value: 'deployment', label: 'Deployment' },
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'paused', label: 'Paused' },
  ];

  const sortOptions = [
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'name', label: 'Project Name' },
    { value: 'progress', label: 'Progress' },
    { value: 'created', label: 'Date Created' },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <Card className="mb-6">
      <div className="p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
          />
          <Input
            type="text"
            placeholder="Search projects..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Phase Filter */}
          <div className="relative">
            <select
              value={filters.phase}
              onChange={(e) => handleFilterChange('phase', e.target.value)}
              className="h-10 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none pr-8"
            >
              {phases.map((phase) => (
                <option key={phase.value} value={phase.value}>
                  {phase.label}
                </option>
              ))}
            </select>
            <Icon name="ChevronDownIcon" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="h-10 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none pr-8"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <Icon name="ChevronDownIcon" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="h-10 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none pr-8"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <Icon name="ChevronDownIcon" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectFilters;