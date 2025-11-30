import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';

interface TimelineData {
  date: string;
  planned: number;
  actual: number;
}

interface TimelineChartProps {
  data: TimelineData[];
}

const TimelineChart = ({ data }: TimelineChartProps) => {
  return (
    <Card className="p-6 shadow-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Timeline Adherence</h3>
        <p className="text-sm text-muted-foreground">Planned vs actual progress over time</p>
      </div>
      <div className="w-full h-80" aria-label="Timeline Adherence Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748B"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748B"
              style={{ fontSize: '12px' }}
              label={{ value: 'Progress %', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
            />
            <Line 
              type="monotone" 
              dataKey="planned" 
              stroke="#2563EB" 
              strokeWidth={2}
              name="Planned Progress"
              dot={{ fill: '#2563EB', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Actual Progress"
              dot={{ fill: '#10B981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TimelineChart;