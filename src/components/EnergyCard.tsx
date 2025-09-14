import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnergyCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant: 'solar' | 'wind' | 'battery' | 'consumption';
  className?: string;
}

const EnergyCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  variant,
  className 
}: EnergyCardProps) => {
  const gradientClasses = {
    solar: 'gradient-solar',
    wind: 'gradient-wind', 
    battery: 'gradient-battery',
    consumption: 'bg-consumption',
  };

  const textClasses = {
    solar: 'text-solar',
    wind: 'text-wind',
    battery: 'text-battery', 
    consumption: 'text-consumption',
  };

  return (
    <Card className={cn("transition-smooth hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-lg",
          gradientClasses[variant]
        )}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-1 mb-1">
          <div className={cn("text-2xl font-bold", textClasses[variant])}>
            {value}
          </div>
          <span className="text-sm text-muted-foreground">
            {unit}
          </span>
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EnergyCard;