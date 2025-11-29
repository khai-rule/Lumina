'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

interface TaskChecklistProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onAddNote: (taskId: string) => void;
}

const TaskChecklist = ({ tasks, onTaskToggle, onAddNote }: TaskChecklistProps) => {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`border rounded-lg transition-default ${
            task.completed ? 'border-success/30 bg-success/5' : 'border-border bg-card'
          }`}
        >
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => onTaskToggle(task.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-default focus-ring ${
                  task.completed
                    ? 'bg-success border-success' :'border-muted-foreground hover:border-primary'
                }`}
              >
                {task.completed && (
                  <Icon name="CheckIcon" size={16} className="text-success-foreground" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4
                    className={`font-medium ${
                      task.completed
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <button
                    onClick={() =>
                      setExpandedTask(expandedTask === task.id ? null : task.id)
                    }
                    className="ml-2 p-1 rounded hover:bg-muted transition-default focus-ring"
                  >
                    <Icon
                      name={expandedTask === task.id ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                      size={16}
                      className="text-muted-foreground"
                    />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getPriorityBadge(
                      task.priority
                    )}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="ClockIcon" size={14} />
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {expandedTask === task.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onAddNote(task.id)}
                    className="flex items-center space-x-2 px-3 py-1.5 border border-border rounded-md text-sm text-foreground hover:bg-muted transition-default focus-ring"
                  >
                    <Icon name="PencilIcon" size={14} />
                    <span>Add Note</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-1.5 border border-border rounded-md text-sm text-foreground hover:bg-muted transition-default focus-ring">
                    <Icon name="PaperClipIcon" size={14} />
                    <span>Attach File</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskChecklist;