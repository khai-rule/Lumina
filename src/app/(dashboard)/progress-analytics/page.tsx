import type { Metadata } from 'next';
import ProgressAnalyticsInteractive from './components/ProgressAnalyticsInteractive';

export const metadata: Metadata = {
  title: 'Progress Analytics - SDLC Navigator',
  description: 'Comprehensive project tracking dashboard with performance metrics, AI-powered insights, and data-driven analytics for SDLC progression and improvement opportunities.',
};

export default function ProgressAnalyticsPage() {
  return <ProgressAnalyticsInteractive />;
}