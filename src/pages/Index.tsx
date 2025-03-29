
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VolatilitySurface from '@/components/VolatilitySurface';
import AnomalyIndicator from '@/components/AnomalyIndicator';
import MetricsPanel from '@/components/MetricsPanel';
import OptionChain from '@/components/OptionChain';
import TradeRecommendations from '@/components/TradeRecommendations';
import UnderlyingSelector from '@/components/UnderlyingSelector';
import HistoricalPerformance from '@/components/HistoricalPerformance';
import RiskAnalysis from '@/components/RiskAnalysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

// Define the allowed data mode types
type DataMode = 'live' | 'historical' | 'simulated';

const Index = () => {
  const { toast } = useToast();
  const [dataMode, setDataMode] = useState<DataMode>('live');

  useEffect(() => {
    // Show a welcome toast when the application loads
    toast({
      title: "Welcome to Volatility Surface Arbitrage",
      description: "Market data loaded successfully. System is ready.",
      duration: 5000,
    });
    
    // Simulate finding a new anomaly after a few seconds
    const timer = setTimeout(() => {
      toast({
        title: "New Volatility Anomaly Detected",
        description: "SPY 420 Put shows significant mispricing (28.4% vs 22.1% expected).",
        variant: "destructive",
        duration: 8000,
      });
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleModeChange = (value: string) => {
    setDataMode(value as DataMode);
    
    // Provide feedback on mode change
    const modeMessages = {
      'live': "Switched to Live Data Mode",
      'historical': "Switched to Historical Data Mode",
      'simulated': "Switched to Simulated Data Mode"
    };
    
    toast({
      title: modeMessages[value as keyof typeof modeMessages],
      description: value === 'historical' ? 
        "Historical data from Jan 1 - Mar 31, 2024 loaded." : 
        value === 'simulated' ? 
          "Running Monte Carlo simulation with parameters from settings." : 
          "Connected to real-time data feed.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      
      <main className="flex-1 p-4 space-y-6">
        {/* Control Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <UnderlyingSelector />
          
          <div className="flex items-center space-x-4">
            <Tabs defaultValue="live" value={dataMode} onValueChange={handleModeChange} className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="historical">Historical</TabsTrigger>
                <TabsTrigger value="simulated">Simulated</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Metrics Overview Panel */}
        <MetricsPanel mode={dataMode} />
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Volatility Surface */}
          <div className="col-span-1 lg:col-span-2">
            <div className="space-y-6">
              <VolatilitySurface />
              <OptionChain />
              
              {/* Additional content below OptionChain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HistoricalPerformance />
                <RiskAnalysis />
              </div>
            </div>
          </div>
          
          {/* Right Column: Anomalies and Trades */}
          <div className="space-y-6">
            <AnomalyIndicator />
            <TradeRecommendations />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
