
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

// Example option chain data
const optionData = [
  {
    strike: 420,
    callBid: 10.45,
    callAsk: 10.65,
    callVolume: 3245,
    callOpenInt: 12543,
    callIV: 28.4,
    putBid: 8.25,
    putAsk: 8.45,
    putVolume: 2156,
    putOpenInt: 8762,
    putIV: 29.2,
    delta: 0.52,
    gamma: 0.04,
    vega: 0.32,
    theta: -0.15,
    abnormal: true,
  },
  {
    strike: 422,
    callBid: 9.15,
    callAsk: 9.35,
    callVolume: 1876,
    callOpenInt: 8654,
    callIV: 27.8,
    putBid: 9.10,
    putAsk: 9.30,
    putVolume: 1543,
    putOpenInt: 7652,
    putIV: 28.5,
    delta: 0.48,
    gamma: 0.043,
    vega: 0.33,
    theta: -0.16,
    abnormal: false,
  },
  {
    strike: 424,
    callBid: 7.85,
    callAsk: 8.05,
    callVolume: 2134,
    callOpenInt: 9876,
    callIV: 27.3,
    putBid: 10.25,
    putAsk: 10.45,
    putVolume: 1987,
    putOpenInt: 8945,
    putIV: 28.1,
    delta: 0.44,
    gamma: 0.044,
    vega: 0.34,
    theta: -0.17,
    abnormal: false,
  },
  {
    strike: 426,
    callBid: 6.65,
    callAsk: 6.85,
    callVolume: 1543,
    callOpenInt: 7845,
    callIV: 26.9,
    putBid: 11.45,
    putAsk: 11.65,
    putVolume: 2345,
    putOpenInt: 10234,
    putIV: 27.8,
    delta: 0.40,
    gamma: 0.045,
    vega: 0.35,
    theta: -0.18,
    abnormal: false,
  },
  {
    strike: 428,
    callBid: 5.55,
    callAsk: 5.75,
    callVolume: 1234,
    callOpenInt: 6543,
    callIV: 26.5,
    putBid: 12.75,
    putAsk: 12.95,
    putVolume: 2654,
    putOpenInt: 11543,
    putIV: 27.6,
    delta: 0.36,
    gamma: 0.046,
    vega: 0.36,
    theta: -0.19,
    abnormal: false,
  }
];

const OptionChain = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Option Chain</CardTitle>
          <Badge variant="outline" className="bg-secondary text-secondary-foreground">
            SPY Jun 21, 2024
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input 
              placeholder="Search strike" 
              className="pl-8 h-9 w-[140px]" 
            />
          </div>
          <Select defaultValue="30d">
            <SelectTrigger className="w-[100px] h-9">
              <SelectValue placeholder="Expiry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="14d">14 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="60d">60 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-2 overflow-auto">
        <Table>
          <TableHeader className="bg-secondary/30 sticky top-0">
            <TableRow>
              <TableHead className="text-center w-[80px]">Strike</TableHead>
              <TableHead className="text-center">Call Bid</TableHead>
              <TableHead className="text-center">Call Ask</TableHead>
              <TableHead className="text-center">Call IV</TableHead>
              <TableHead className="text-center">Put Bid</TableHead>
              <TableHead className="text-center">Put Ask</TableHead>
              <TableHead className="text-center">Put IV</TableHead>
              <TableHead className="text-center">Delta</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {optionData.map((option) => (
              <TableRow key={option.strike} className={option.abnormal ? "bg-destructive/10" : ""}>
                <TableCell className="text-center font-medium">{option.strike}</TableCell>
                <TableCell className="text-center">{option.callBid.toFixed(2)}</TableCell>
                <TableCell className="text-center">{option.callAsk.toFixed(2)}</TableCell>
                <TableCell className="text-center">{option.callIV.toFixed(1)}%</TableCell>
                <TableCell className="text-center">{option.putBid.toFixed(2)}</TableCell>
                <TableCell className="text-center">{option.putAsk.toFixed(2)}</TableCell>
                <TableCell className="text-center">{option.putIV.toFixed(1)}%</TableCell>
                <TableCell className="text-center">{option.delta.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  {option.abnormal ? (
                    <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/50">
                      Mispriced
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-secondary/20">Fair</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OptionChain;
