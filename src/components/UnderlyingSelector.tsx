
import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Example data
const stocks = [
  { value: 'spy', label: 'SPY', marketCap: '$456.2B', sector: 'Index' },
  { value: 'aapl', label: 'AAPL', marketCap: '$2.87T', sector: 'Technology' },
  { value: 'msft', label: 'MSFT', marketCap: '$2.74T', sector: 'Technology' },
  { value: 'amzn', label: 'AMZN', marketCap: '$1.84T', sector: 'Consumer Cyclical' },
  { value: 'googl', label: 'GOOGL', marketCap: '$1.82T', sector: 'Communication Services' },
  { value: 'meta', label: 'META', marketCap: '$1.19T', sector: 'Communication Services' },
  { value: 'tsla', label: 'TSLA', marketCap: '$678.7B', sector: 'Automotive' },
  { value: 'nvda', label: 'NVDA', marketCap: '$2.18T', sector: 'Technology' },
  { value: 'jpm', label: 'JPM', marketCap: '$506.1B', sector: 'Financial Services' },
  { value: 'v', label: 'V', marketCap: '$512.8B', sector: 'Financial Services' },
];

export function UnderlyingSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('spy'); // Default to SPY
  
  const handleSelectStock = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue || 'spy'); // Fallback to SPY if nothing selected
    setOpen(false);
    
    const selectedStock = stocks.find((stock) => stock.value === (newValue || 'spy'));
    if (selectedStock) {
      toast({
        title: `Selected ${selectedStock.label}`,
        description: `Market Cap: ${selectedStock.marketCap} | Sector: ${selectedStock.sector}`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm font-medium">Underlying:</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[180px] justify-between"
          >
            {value ? stocks.find((stock) => stock.value === value)?.label : "Select stock..."}
            <Badge variant="secondary" className="ml-2 text-xs font-normal">
              {stocks.find((stock) => stock.value === value)?.sector}
            </Badge>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command>
            <CommandInput placeholder="Search stock..." />
            <CommandEmpty>No stock found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {stocks.map((stock) => (
                <CommandItem
                  key={stock.value}
                  value={stock.value}
                  onSelect={handleSelectStock}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === stock.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{stock.label}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">{stock.marketCap}</span>
                      <Badge variant="outline" className="text-xs mt-1">{stock.sector}</Badge>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default UnderlyingSelector;
