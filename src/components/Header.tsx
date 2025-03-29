
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Settings, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  const { toast } = useToast();

  const handleRefreshData = () => {
    toast({
      title: "Refreshing Data",
      description: "Fetching latest market data...",
      duration: 2000,
    });
    
    // Simulate data refresh with a timeout
    setTimeout(() => {
      toast({
        title: "Data Refreshed",
        description: "Market data updated successfully at " + new Date().toLocaleTimeString(),
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <header className="border-b border-border bg-card/50 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-primary">
            Volatility Surface Arbitrage
          </h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-subtle"></span>
            <span>LIVE</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Volatility Surface Arbitrage</DialogTitle>
                <DialogDescription>
                  This platform analyzes options market data to identify mispriced volatility across different strikes and expirations.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
                    <li>Real-time implied volatility surface visualization</li>
                    <li>ML-powered volatility anomaly detection</li>
                    <li>Automated arbitrage trade recommendations</li>
                    <li>Options chain analytics with mispricing highlights</li>
                    <li>Advanced statistical filtering and backtesting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Version:</h4>
                  <p className="text-sm text-muted-foreground">v1.0.2-beta</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                  Configure platform settings and preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Data Settings</h4>
                  <div className="flex items-center justify-between">
                    <label htmlFor="refresh-interval" className="text-sm">Auto-refresh interval:</label>
                    <select id="refresh-interval" className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="0">Manual only</option>
                      <option value="60">Every minute</option>
                      <option value="300">Every 5 minutes</option>
                      <option value="900">Every 15 minutes</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="data-source" className="text-sm">Market data source:</label>
                    <select id="data-source" className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="realtime">Real-time (paid)</option>
                      <option value="delayed">15-min delayed (free)</option>
                      <option value="simulation">Simulation</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Analysis Settings</h4>
                  <div className="flex items-center justify-between">
                    <label htmlFor="anomaly-threshold" className="text-sm">Anomaly threshold (σ):</label>
                    <input type="number" id="anomaly-threshold" defaultValue="2.0" step="0.1" min="0.5" max="5.0" 
                      className="w-20 rounded-md border border-input bg-background px-3 py-1 text-sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="ml-model" className="text-sm">ML model:</label>
                    <select id="ml-model" className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="ensemble">Ensemble (recommended)</option>
                      <option value="lstm">LSTM</option>
                      <option value="transformer">Transformer</option>
                      <option value="statistical">Statistical only</option>
                    </select>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
