
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const riskMetrics = [
  { name: "Sharpe Ratio", value: 1.82, max: 3, description: "Excess return per unit of risk" },
  { name: "Max Drawdown", value: 12.5, max: 50, description: "Largest peak-to-trough decline (%)" },
  { name: "Sortino Ratio", value: 2.14, max: 4, description: "Downside risk adjustment" },
  { name: "VaR (95%)", value: 1.85, max: 5, description: "Daily value at risk (%)" },
];

const exposureData = [
  { factor: "Market Beta", value: 0.45, color: "bg-blue-500" },
  { factor: "Volatility", value: 0.78, color: "bg-purple-500" },
  { factor: "Size", value: 0.12, color: "bg-green-500" },
  { factor: "Value", value: -0.23, color: "bg-orange-500" },
  { factor: "Momentum", value: 0.62, color: "bg-pink-500" },
];

const RiskAnalysis = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Key Metrics</h4>
          <div className="space-y-2">
            {riskMetrics.map((metric) => (
              <div key={metric.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{metric.name}</span>
                  <span className="font-medium">{metric.value}</span>
                </div>
                <Progress value={(metric.value / metric.max) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Factor Exposures</h4>
          <Table>
            <TableBody>
              {exposureData.map((item) => (
                <TableRow key={item.factor}>
                  <TableCell className="py-1.5 text-xs">{item.factor}</TableCell>
                  <TableCell className="py-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color}`} 
                          style={{ 
                            width: `${Math.abs(item.value) * 100}%`, 
                            marginLeft: item.value < 0 ? 'auto' : 0,
                            transform: item.value < 0 ? 'scaleX(-1)' : 'none'
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{item.value}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysis;
