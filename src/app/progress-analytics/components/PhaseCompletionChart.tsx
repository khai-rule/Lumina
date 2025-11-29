import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PhaseData {
  phase: string;
  completed: number;
  remaining: number;
  total: number;
}

interface PhaseCompletionChartProps {
  data: PhaseData[];
}

const PhaseCompletionChart = ({ data }: PhaseCompletionChartProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Phase Completion Status</h3>
        <p className="text-sm text-muted-foreground">Task completion across all SDLC phases</p>
      </div>
      <div className="w-full h-80" aria-label="Phase Completion Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="phase" 
              stroke="#64748B"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748B"
              style={{ fontSize: '12px' }}
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
            <Bar dataKey="completed" fill="#10B981" name="Completed" radius={[4, 4, 0, 0]} />
            <Bar dataKey="remaining" fill="#64748B" name="Remaining" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PhaseCompletionChart;