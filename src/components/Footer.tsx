
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-border bg-card/50 py-3 px-4 mt-auto">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          Volatility Surface Arbitrage Platform © {currentTime.getFullYear()}
        </div>
        <div className="flex items-center space-x-4">
          <span>Data: Delayed 15 min</span>
          <span>Last Update: {currentTime.toLocaleTimeString()}</span>
          <span className="text-primary">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            System: Normal
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
