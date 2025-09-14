import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface AlertsProps {
  houseNumber: number;
  dailyConsumption: number;
  target: number;
  tolerance: number;
}

const Alerts = ({ houseNumber, dailyConsumption, target, tolerance }: AlertsProps) => {
  // Threshold logic for alerts
  const getAlertInfo = () => {
    if (dailyConsumption >= target + tolerance) {
      return {
        message: "You have exceeded your allowed consumption. Payment required to continue usage.",
        badge: "destructive",
        icon: XCircle,
        bgColor: "bg-destructive/10"
      };
    } else if (dailyConsumption >= target) {
      return {
        message: "You have reached your daily limit.",
        badge: "default",
        icon: AlertCircle,
        bgColor: "bg-orange-500/10"
      };
    } else if (dailyConsumption >= target - tolerance) {
      return {
        message: "You are nearing your limit.",
        badge: "secondary",
        icon: AlertTriangle,
        bgColor: "bg-yellow-500/10"
      };
    } else {
      return {
        message: "All good. Keep monitoring.",
        badge: "default",
        icon: CheckCircle,
        bgColor: "bg-green-500/10"
      };
    }
  };

  const alertInfo = getAlertInfo();
  const Icon = alertInfo.icon;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Consumption Alerts
        </CardTitle>
        <CardDescription>
          House {houseNumber} - Real-time consumption monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`p-4 rounded-lg border ${alertInfo.bgColor}`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-current" />
              <div>
                <p className="font-medium text-sm md:text-base">{alertInfo.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Current consumption: {dailyConsumption.toFixed(1)} kWh
                </p>
              </div>
            </div>
            <Badge variant={alertInfo.badge as any} className="shrink-0">
              {dailyConsumption >= target + tolerance ? "Critical" :
               dailyConsumption >= target ? "Warning" :
               dailyConsumption >= target - tolerance ? "Caution" : "Normal"}
            </Badge>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Usage Progress</span>
            <span>{((dailyConsumption / target) * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((dailyConsumption / target) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 kWh</span>
            <span>{target} kWh (Target)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Alerts;