import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

interface QualityMetric {
  category: string;
  score: number;
  benchmark: number;
}

interface QualityMetricsChartProps {
  data: QualityMetric[];
}

const QualityMetricsChart = ({ data }: QualityMetricsChartProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Quality Metrics</h3>
        <p className="text-sm text-muted-foreground">Project quality vs industry benchmarks</p>
      </div>
      <div className="w-full h-80" aria-label="Quality Metrics Radar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="category" 
              stroke="#64748B"
              style={{ fontSize: '12px' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              stroke="#64748B"
              style={{ fontSize: '12px' }}
            />
            <Radar 
              name="Your Project" 
              dataKey="score" 
              stroke="#2563EB" 
              fill="#2563EB" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar 
              name="Industry Benchmark" 
              dataKey="benchmark" 
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QualityMetricsChart;