
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Example anomaly data
const anomalies = [
  {
    id: 1,
    type: 'Put Skew',
    ticker: 'SPY',
    strike: 420,
    maturity: '30d',
    severity: 'high',
    impliedVol: 28.4,
    expectedVol: 22.1,
    difference: 6.3,
    tradeAction: 'Sell Puts',
    timestamp: '2 mins ago',
    explanation: 'Market fear is causing SPY 30-day puts to be significantly overpriced based on historical volatility patterns. Machine learning models suggest regression to historical mean is likely.'
  },
  {
    id: 2,
    type: 'Term Structure',
    ticker: 'AAPL',
    strike: 180,
    maturity: '60d',
    severity: 'medium',
    impliedVol: 19.7,
    expectedVol: 22.3,
    difference: -2.6,
    tradeAction: 'Calendar Spread',
    timestamp: '5 mins ago',
    explanation: 'AAPL volatility term structure shows unusual flattening, with mid-term options underpriced relative to near-term. This pricing anomaly has historically reverted within 7-10 trading days.'
  },
  {
    id: 3,
    type: 'Volatility Spike',
    ticker: 'TSLA',
    strike: 250,
    maturity: '14d',
    severity: 'medium',
    impliedVol: 54.2,
    expectedVol: 48.9,
    difference: 5.3,
    tradeAction: 'Iron Condor',
    timestamp: '18 mins ago',
    explanation: 'TSLA short-dated options are showing elevated IV due to recent news, but similar historical catalysts have resulted in less realized volatility than implied. Statistical edge exists in selling this inflated volatility.'
  }
];

const AnomalyIndicator = () => {
  const { toast } = useToast();

  const handleAnomalyClick = (anomaly: typeof anomalies[0]) => {
    toast({
      title: `${anomaly.ticker} ${anomaly.type} Anomaly Details`,
      description: anomaly.explanation,
      duration: 5000,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Volatility Anomalies</CardTitle>
          <Badge variant="outline" className="bg-card text-destructive border-destructive">
            3 Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[400px]">
        <div className="space-y-3">
          {anomalies.map((anomaly) => (
            <div 
              key={anomaly.id} 
              className="p-3 rounded-md border border-border bg-card/50 hover:bg-card/80 transition-colors cursor-pointer"
              onClick={() => handleAnomalyClick(anomaly)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1 text-destructive" />
                    {anomaly.type} ({anomaly.ticker} {anomaly.strike} {anomaly.maturity})
                  </h3>
                  <p className="text-sm text-muted-foreground">{anomaly.timestamp}</p>
                </div>
                <Badge 
                  variant={anomaly.severity === 'high' ? 'destructive' : 'outline'}
                  className={anomaly.severity === 'medium' ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' : ''}
                >
                  {anomaly.severity.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div>
                  <p className="data-label">Implied Vol</p>
                  <p className="font-medium">{anomaly.impliedVol}%</p>
                </div>
                <div>
                  <p className="data-label">Expected Vol</p>
                  <p className="font-medium">{anomaly.expectedVol}%</p>
                </div>
                <div>
                  <p className="data-label">Difference</p>
                  <p className={anomaly.difference > 0 ? "value-positive flex items-center" : "value-negative flex items-center"}>
                    {anomaly.difference > 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(anomaly.difference)}%
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="data-label">Recommended</p>
                    <p className="font-medium text-primary">{anomaly.tradeAction}</p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-muted-foreground hover:text-foreground">
                          <Info className="h-4 w-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px] text-xs">
                        <p>{anomaly.explanation}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyIndicator;
