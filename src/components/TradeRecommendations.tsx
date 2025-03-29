
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, CheckCircle2, Clock, Zap, LineChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const { toast } = useToast();
  const [selectedTrade, setSelectedTrade] = React.useState<null | (typeof trades)[0]>(null);
  const [analyzeDialogOpen, setAnalyzeDialogOpen] = React.useState(false);
  const [executeDialogOpen, setExecuteDialogOpen] = React.useState(false);

  const handleExecuteTrade = (trade: (typeof trades)[0]) => {
    setSelectedTrade(trade);
    setExecuteDialogOpen(true);
  };

  const handleAnalyzeTrade = (trade: (typeof trades)[0]) => {
    setSelectedTrade(trade);
    setAnalyzeDialogOpen(true);
  };

  const confirmExecution = () => {
    if (!selectedTrade) return;
    
    setExecuteDialogOpen(false);
    
    toast({
      title: "Trade Executed Successfully",
      description: `${selectedTrade.type} trade for $${selectedTrade.premium} premium submitted at ${new Date().toLocaleTimeString()}`,
      duration: 5000,
    });
  };

  return (
    <>
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
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleExecuteTrade(trade)}
                    disabled={trade.status !== 'high-confidence'}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Execute Trade
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleAnalyzeTrade(trade)}
                  >
                    <LineChart className="h-4 w-4 mr-2" />
                    Analyze Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Execute Trade Dialog */}
      <Dialog open={executeDialogOpen} onOpenChange={setExecuteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Execute Trade</DialogTitle>
            <DialogDescription>
              Review and confirm the trade details before execution
            </DialogDescription>
          </DialogHeader>
          
          {selectedTrade && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">{selectedTrade.type}</h4>
                <p className="text-sm text-muted-foreground">{selectedTrade.description}</p>
              </div>
              
              <div className="border rounded-md p-3 bg-background/50 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Net Premium:</span>
                    <span className="font-medium ml-2">${selectedTrade.premium}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Return:</span>
                    <span className="font-medium text-chart-positive ml-2">{selectedTrade.expectedReturn}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Success Probability:</span>
                    <span className="font-medium ml-2">{selectedTrade.probability}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Max Loss:</span>
                    <span className="font-medium text-chart-negative ml-2">${(selectedTrade.premium * 0.65).toFixed(0)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-xs font-medium">Trade Components:</h5>
                  {selectedTrade.details.buy.map((leg, idx) => (
                    <div key={`exec-buy-${idx}`} className="text-xs bg-chart-positive/10 border border-chart-positive/20 rounded-sm p-1.5 text-chart-positive">
                      BUY {leg.quantity} {leg.ticker} {leg.strike} {leg.expiry} {leg.type}
                    </div>
                  ))}
                  {selectedTrade.details.sell.map((leg, idx) => (
                    <div key={`exec-sell-${idx}`} className="text-xs bg-chart-negative/10 border border-chart-negative/20 rounded-sm p-1.5 text-chart-negative">
                      SELL {leg.quantity} {leg.ticker} {leg.strike} {leg.expiry} {leg.type}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-3 text-sm">
                <p className="font-medium text-amber-500">Important Notice</p>
                <p className="text-muted-foreground text-xs mt-1">
                  This is a simulated trade execution. In a production environment, this would connect to your broker API to execute the trade. Always review trades carefully before execution.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setExecuteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmExecution}>Confirm Execution</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Analyze Trade Dialog */}
      <Dialog open={analyzeDialogOpen} onOpenChange={setAnalyzeDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Trade Analysis</DialogTitle>
            <DialogDescription>
              Detailed breakdown of the volatility arbitrage strategy
            </DialogDescription>
          </DialogHeader>
          
          {selectedTrade && (
            <div className="space-y-4 py-2">
              <div className="border-b pb-2">
                <h3 className="font-medium">{selectedTrade.type}</h3>
                <p className="text-sm text-muted-foreground">{selectedTrade.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Strategy Metrics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-card/50 p-2 rounded-md">
                      <span className="text-xs text-muted-foreground block">Net Premium</span>
                      <span className="font-medium">${selectedTrade.premium}</span>
                    </div>
                    <div className="bg-card/50 p-2 rounded-md">
                      <span className="text-xs text-muted-foreground block">Expected Return</span>
                      <span className="font-medium text-chart-positive">{selectedTrade.expectedReturn}%</span>
                    </div>
                    <div className="bg-card/50 p-2 rounded-md">
                      <span className="text-xs text-muted-foreground block">Success Probability</span>
                      <span className="font-medium">{selectedTrade.probability}%</span>
                    </div>
                    <div className="bg-card/50 p-2 rounded-md">
                      <span className="text-xs text-muted-foreground block">Risk/Reward</span>
                      <span className="font-medium">1:{(selectedTrade.expectedReturn / 8).toFixed(1)}</span>
                    </div>
                    <div className="bg-card/50 p-2 rounded-md">
                      <span className="text-xs text-muted-foreground block">Max Loss</span>
                      <span className="font-medium text-chart-negative">${(selectedTrade.premium * 0.65).toFixed(0)}</span>
                    </div>
                    <div className="bg-card/50 p-2 rounded-md">
                      <span className="text-xs text-muted-foreground block">Expected Profit</span>
                      <span className="font-medium text-chart-positive">${(selectedTrade.premium * selectedTrade.expectedReturn / 100).toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium mt-2">Strategy Rationale</h4>
                  <p className="text-xs text-muted-foreground">
                    This strategy exploits the temporary mispricing in the volatility surface where the 
                    {selectedTrade.id === 1 ? " broad market index (SPY) volatility is underpriced relative to its component sectors." : 
                      selectedTrade.id === 2 ? " term structure of SPY options shows an anomaly between the 30-day and 60-day expirations." :
                      " TSLA put skew is overpriced compared to calls at equivalent distance from the money."}
                  </p>
                  
                  <h4 className="text-sm font-medium mt-2">ML Model Confidence</h4>
                  <div className="bg-primary/10 p-2 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Model Confidence</span>
                      <span className="text-xs font-medium">{selectedTrade.probability}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ width: `${selectedTrade.probability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Strategy Components</h4>
                  <div className="space-y-2">
                    {selectedTrade.details.buy.map((leg, idx) => (
                      <div key={`analyze-buy-${idx}`} className="bg-chart-positive/10 border border-chart-positive/20 rounded-md p-2">
                        <div className="flex justify-between items-center">
                          <h5 className="text-xs font-medium text-chart-positive">BUY {leg.ticker} {leg.strike} {leg.expiry} {leg.type}</h5>
                          <span className="text-xs">x{leg.quantity}</span>
                        </div>
                        <div className="mt-2 text-xs grid grid-cols-3 gap-1">
                          <div>
                            <span className="text-muted-foreground block">IV</span>
                            <span>{(18 + Math.random() * 10).toFixed(1)}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Delta</span>
                            <span>{(leg.type === 'Put' ? -0.35 : 0.45) + Math.random() * 0.1}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Premium</span>
                            <span>${(selectedTrade.premium / (leg.quantity * 2)).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {selectedTrade.details.sell.map((leg, idx) => (
                      <div key={`analyze-sell-${idx}`} className="bg-chart-negative/10 border border-chart-negative/20 rounded-md p-2">
                        <div className="flex justify-between items-center">
                          <h5 className="text-xs font-medium text-chart-negative">SELL {leg.ticker} {leg.strike} {leg.expiry} {leg.type}</h5>
                          <span className="text-xs">x{leg.quantity}</span>
                        </div>
                        <div className="mt-2 text-xs grid grid-cols-3 gap-1">
                          <div>
                            <span className="text-muted-foreground block">IV</span>
                            <span>{(22 + Math.random() * 10).toFixed(1)}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Delta</span>
                            <span>{(leg.type === 'Put' ? -0.35 : 0.45) + Math.random() * 0.1}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Premium</span>
                            <span>${(selectedTrade.premium / (leg.quantity * 1.5)).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-sm font-medium mt-2">Risk Analysis</h4>
                  <p className="text-xs text-muted-foreground">
                    Primary risk comes from {selectedTrade.id === 1 ? "correlation breakdown between sectors during market stress" : 
                      selectedTrade.id === 2 ? "sudden volatility shifts in the near-term expiration" : 
                      "unexpected earnings announcement or product news"}. The strategy includes a stop-loss at 65% of premium to limit downside.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TradeRecommendations;
