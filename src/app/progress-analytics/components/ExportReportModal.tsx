'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, options: ExportOptions) => void;
}

interface ExportOptions {
  includeCharts: boolean;
  includeInsights: boolean;
  includeBottlenecks: boolean;
  includeMilestones: boolean;
  dateRange: string;
}

const ExportReportModal = ({ isOpen, onClose, onExport }: ExportReportModalProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');
  const [options, setOptions] = useState<ExportOptions>({
    includeCharts: true,
    includeInsights: true,
    includeBottlenecks: true,
    includeMilestones: true,
    dateRange: 'all',
  });

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(selectedFormat, options);
    onClose();
  };

  const formats = [
    { id: 'pdf', label: 'PDF Document', icon: 'DocumentTextIcon', description: 'Comprehensive report with charts' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: 'TableCellsIcon', description: 'Raw data for analysis' },
    { id: 'csv', label: 'CSV File', icon: 'DocumentIcon', description: 'Simple data export' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-foreground/50 z-modal" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-modal p-4">
        <div className="bg-background rounded-lg shadow-active max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Export Analytics Report</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-default focus-ring"
              aria-label="Close modal"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Format Selection */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Select Export Format</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-default focus-ring ${
                      selectedFormat === format.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name={format.icon as any} size={24} className="text-primary mb-2" />
                    <p className="font-medium text-foreground text-sm mb-1">{format.label}</p>
                    <p className="text-xs text-muted-foreground">{format.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Include in Report</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeCharts}
                    onChange={(e) => setOptions({ ...options, includeCharts: e.target.checked })}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Charts and Graphs</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeInsights}
                    onChange={(e) => setOptions({ ...options, includeInsights: e.target.checked })}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">AI Insights and Recommendations</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeBottlenecks}
                    onChange={(e) => setOptions({ ...options, includeBottlenecks: e.target.checked })}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Bottleneck Analysis</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeMilestones}
                    onChange={(e) => setOptions({ ...options, includeMilestones: e.target.checked })}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Milestone Tracking</span>
                </label>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Date Range</h3>
              <select
                value={options.dateRange}
                onChange={(e) => setOptions({ ...options, dateRange: e.target.value })}
                className="w-full px-4 py-2.5 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Time</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-border rounded-md text-foreground hover:bg-muted transition-default focus-ring"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-default focus-ring flex items-center space-x-2"
            >
              <Icon name="ArrowDownTrayIcon" size={18} />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportReportModal;