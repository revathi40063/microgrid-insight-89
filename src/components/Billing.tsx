import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Lightbulb, Battery, TrendingDown } from 'lucide-react';

interface BillingProps {
  houseNumber: number;
  dailyConsumption: number;
  target: number;
  tolerance: number;
  ratePerKwh: number;
}

const Billing = ({ houseNumber, dailyConsumption, target, tolerance, ratePerKwh }: BillingProps) => {
  // Calculate billing information
  const totalAllowedLimit = target + tolerance;
  const toleranceRemaining = Math.max(0, totalAllowedLimit - dailyConsumption);
  const excessConsumption = Math.max(0, dailyConsumption - totalAllowedLimit);
  const payableAmount = excessConsumption * ratePerKwh;

  // Get recommendations based on consumption pattern
  const getRecommendations = () => {
    const recommendations = [];
    
    if (dailyConsumption >= target) {
      recommendations.push("Reduce consumption to avoid higher bills.");
    }
    
    if (dailyConsumption >= target - tolerance) {
      recommendations.push("Use battery storage efficiently.");
    }
    
    if (excessConsumption > 0) {
      recommendations.push("Consider upgrading your energy plan.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Great job! Your consumption is within limits.");
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      {/* Main Billing Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Billing Information
          </CardTitle>
          <CardDescription>
            House {houseNumber} - Daily consumption and billing details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Daily Consumption */}
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Daily Consumption</p>
                  <p className="text-2xl font-bold">{dailyConsumption.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">kWh</p>
                </div>
              </div>
            </div>

            {/* Tolerance Remaining */}
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tolerance Remaining</p>
                  <p className="text-2xl font-bold">{toleranceRemaining.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">kWh</p>
                </div>
              </div>
            </div>

            {/* Total Allowed Limit */}
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Allowed</p>
                  <p className="text-2xl font-bold">{totalAllowedLimit.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">kWh</p>
                </div>
              </div>
            </div>

            {/* Payable Amount */}
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payable Amount</p>
                  <p className="text-2xl font-bold">₹{payableAmount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {excessConsumption > 0 ? `${excessConsumption.toFixed(1)} kWh excess` : 'No excess'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Details Table */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">Billing Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-1">Description</th>
                    <th className="text-right py-2 px-1">Consumption (kWh)</th>
                    <th className="text-right py-2 px-1">Rate (₹/kWh)</th>
                    <th className="text-right py-2 px-1">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-1">Base consumption (within limit)</td>
                    <td className="text-right py-2 px-1">{Math.min(dailyConsumption, totalAllowedLimit).toFixed(1)}</td>
                    <td className="text-right py-2 px-1">0.00</td>
                    <td className="text-right py-2 px-1">0.00</td>
                  </tr>
                  {excessConsumption > 0 && (
                    <tr className="border-b">
                      <td className="py-2 px-1">Excess consumption</td>
                      <td className="text-right py-2 px-1">{excessConsumption.toFixed(1)}</td>
                      <td className="text-right py-2 px-1">{ratePerKwh.toFixed(2)}</td>
                      <td className="text-right py-2 px-1">{payableAmount.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="font-medium">
                    <td className="py-2 px-1">Total</td>
                    <td className="text-right py-2 px-1">{dailyConsumption.toFixed(1)}</td>
                    <td className="text-right py-2 px-1">-</td>
                    <td className="text-right py-2 px-1">₹{payableAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Smart Recommendations
          </CardTitle>
          <CardDescription>
            Tips to optimize your energy consumption and reduce costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="mt-0.5">
                  {recommendation.includes("Great job") ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <Battery className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm flex-1">{recommendation}</p>
                <Badge variant="outline" className="text-xs">
                  {recommendation.includes("Great job") ? "Good" : "Tip"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;