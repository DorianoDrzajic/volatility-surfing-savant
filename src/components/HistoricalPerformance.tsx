
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Sample data for historical performance
const historicalData = [
  { date: 'Jan', return: 2.4, benchmark: 1.2 },
  { date: 'Feb', return: -1.3, benchmark: -0.8 },
  { date: 'Mar', return: 3.7, benchmark: 2.1 },
  { date: 'Apr', return: 2.9, benchmark: 1.5 },
  { date: 'May', return: -2.1, benchmark: -1.7 },
  { date: 'Jun', return: 4.2, benchmark: 2.4 },
  { date: 'Jul', return: 3.8, benchmark: 1.9 },
  { date: 'Aug', return: 1.2, benchmark: 0.7 },
  { date: 'Sep', return: -0.5, benchmark: -0.2 },
  { date: 'Oct', return: 5.1, benchmark: 2.8 },
  { date: 'Nov', return: 2.7, benchmark: 1.4 },
  { date: 'Dec', return: 3.3, benchmark: 1.8 },
];

const HistoricalPerformance = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Historical Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                labelStyle={{ color: 'var(--foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--background)', 
                  borderColor: 'var(--border)',
                  borderRadius: '0.375rem' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="return" 
                stroke="var(--primary)" 
                strokeWidth={2} 
                dot={false}
                name="Strategy Return"
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="var(--muted-foreground)" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
                name="S&P 500 Return"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-0.5 bg-primary block"></span>
              <span>Strategy: +18.4% YTD</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-0.5 bg-muted-foreground block dashed"></span>
              <span>Benchmark: +9.1% YTD</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalPerformance;
