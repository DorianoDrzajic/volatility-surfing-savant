
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Layers, Brain, BarChart3, TrendingUp } from 'lucide-react';

// Market metrics data
const metrics = [
  {
    name: 'VIX Index',
    value: 16.42,
    change: -0.78,
    changePercent: -4.53,
    icon: BarChart3,
  },
  {
    name: 'IV Rank',
    value: 38,
    change: 3,
    changePercent: 8.57,
    icon: TrendingUp,
  },
  {
    name: 'IV Term Slope',
    value: 0.82,
    change: 0.03,
    changePercent: 3.80,
    icon: Layers,
  },
  {
    name: 'ML Prediction',
    value: 22.4,
    change: 1.2,
    changePercent: 5.66,
    icon: Brain,
  },
];

const MetricsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="bg-card/50 hover:bg-card/80 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold">
                {typeof metric.value === 'number' && metric.name !== 'IV Rank' 
                  ? metric.value.toFixed(2) 
                  : metric.value}
                {metric.name === 'IV Rank' && '%'}
              </p>
              
              <div className={metric.change >= 0 ? "text-chart-positive flex items-center" : "text-chart-negative flex items-center"}>
                {metric.change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span className="text-sm">
                  {metric.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsPanel;
