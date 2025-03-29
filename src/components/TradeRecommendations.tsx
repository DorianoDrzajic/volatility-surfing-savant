
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, CheckCircle2, Clock, Zap } from 'lucide-react';

// Example trade recommendations
const trades = [
  {
    id: 1,
    type: 'Volatility Dispersion',
    description: 'Buy SPY volatility, sell sector volatility',
    premium: 1250,
    expectedReturn: 18.4,
    probability: 72,
    status: 'high-confidence',
    details: {
      buy: [{ ticker: 'SPY', strike: 420, expiry: '30d', type: 'Put', quantity: 10 }],
      sell: [
        { ticker: 'XLF', strike: 36, expiry: '30d', type: 'Put', quantity: 25 },
        { ticker: 'XLK', strike: 170, expiry: '30d', type: 'Put', quantity: 15 }
      ]
    }
  },
  {
    id: 2,
    type: 'Calendar Spread',
    description: 'SPY term structure anomaly exploitation',
    premium: 850,
    expectedReturn: 12.7,
    probability: 68,
    status: 'pending-analysis',
    details: {
      buy: [{ ticker: 'SPY', strike: 422, expiry: '60d', type: 'Call', quantity: 5 }],
      sell: [{ ticker: 'SPY', strike: 422, expiry: '30d', type: 'Call', quantity: 5 }]
    }
  },
  {
    id: 3,
    type: 'Volatility Skew Arbitrage',
    description: 'Exploit TSLA put skew mispricing',
    premium: 1875,
    expectedReturn: 22.1,
    probability: 64,
    status: 'high-confidence',
    details: {
      buy: [{ ticker: 'TSLA', strike: 240, expiry: '45d', type: 'Call', quantity: 3 }],
      sell: [{ ticker: 'TSLA', strike: 210, expiry: '45d', type: 'Put', quantity: 3 }]
    }
  }
];

const TradeRecommendations = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">ML Trade Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-auto max-h-[500px]">
        <div className="space-y-4">
          {trades.map((trade) => (
            <div key={trade.id} className="border border-border rounded-md p-4 bg-card/50 hover:bg-card/80 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-2 text-primary" />
                    {trade.type}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{trade.description}</p>
                </div>
                <Badge 
                  variant={trade.status === 'high-confidence' ? 'default' : 'outline'}
                  className={trade.status === 'pending-analysis' ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' : ''}
                >
                  {trade.status === 'high-confidence' ? (
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
                  {trade.status === 'high-confidence' ? 'High Confidence' : 'Pending Analysis'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="data-label">Net Premium</p>
                  <p className="font-medium">${trade.premium}</p>
                </div>
                <div>
                  <p className="data-label">Expected Return</p>
                  <p className="text-chart-positive font-medium">{trade.expectedReturn}%</p>
                </div>
                <div>
                  <p className="data-label">Probability</p>
                  <p className="font-medium">{trade.probability}%</p>
                </div>
              </div>
              
              <div className="bg-background/50 p-3 rounded-md mb-3">
                <p className="text-xs font-medium mb-2">Trade Components:</p>
                <div className="space-y-2">
                  {trade.details.buy.map((leg, idx) => (
                    <div key={`buy-${idx}`} className="text-xs bg-chart-positive/10 border border-chart-positive/20 rounded-sm p-1.5 text-chart-positive">
                      BUY {leg.quantity} {leg.ticker} {leg.strike} {leg.expiry} {leg.type}
                    </div>
                  ))}
                  {trade.details.sell.map((leg, idx) => (
                    <div key={`sell-${idx}`} className="text-xs bg-chart-negative/10 border border-chart-negative/20 rounded-sm p-1.5 text-chart-negative">
                      SELL {leg.quantity} {leg.ticker} {leg.strike} {leg.expiry} {leg.type}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Zap className="h-4 w-4 mr-2" />
                  Execute Trade
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Analyze Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeRecommendations;
