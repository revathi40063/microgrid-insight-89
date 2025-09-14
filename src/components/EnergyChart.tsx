import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface EnergyChartProps {
  data: any[];
  title: string;
  description?: string;
  type: 'line' | 'bar' | 'pie';
}

const COLORS = {
  solar: 'hsl(48, 96%, 53%)',
  wind: 'hsl(200, 98%, 39%)', 
  consumption: 'hsl(15, 86%, 58%)',
  generation: 'hsl(142, 76%, 36%)',
  battery: 'hsl(142, 76%, 36%)',
};

const EnergyChart = ({ data, title, description, type }: EnergyChartProps) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="totalGeneration" 
                stroke={COLORS.generation}
                strokeWidth={2}
                name="Generation (kW)"
              />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke={COLORS.consumption}
                strokeWidth={2}
                name="Consumption (kW)"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="solarGeneration" fill={COLORS.solar} name="Solar (kW)" />
              <Bar dataKey="windGeneration" fill={COLORS.wind} name="Wind (kW)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        const pieData = [
          { name: 'Solar', value: data[0]?.solarGeneration || 0, color: COLORS.solar },
          { name: 'Wind', value: data[0]?.windGeneration || 0, color: COLORS.wind },
        ];
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value.toFixed(1)}kW`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default EnergyChart;