
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Settings, Info } from 'lucide-react';

const Header = () => {
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
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
