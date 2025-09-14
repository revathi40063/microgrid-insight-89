import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  getProcessedWeekData, 
  getHourlyData, 
  getCurrentDayStats, 
  getAlerts 
} from '@/utils/dataProcessing';
import EnergyCard from '@/components/EnergyCard';
import EnergyChart from '@/components/EnergyChart';
import { 
  Sun, 
  Wind, 
  Battery, 
  Zap, 
  TrendingUp, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'daily' | 'hourly'>('daily');
  const [selectedDay, setSelectedDay] = useState(0);

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const weekData = getProcessedWeekData(user.houseNumber);
  const hourlyData = getHourlyData(user.houseNumber, selectedDay);
  const currentStats = getCurrentDayStats(user.houseNumber);
  const alerts = getAlerts(user.houseNumber);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return CheckCircle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'default';
      case 'info': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            House {user.houseNumber} - Energy Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring and analytics for your renewable energy system
          </p>
        </div>

        {/* Current Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EnergyCard
            title="Today's Generation"
            value={currentStats.generation.toFixed(1)}
            unit="kWh"
            icon={TrendingUp}
            variant="battery"
            trend={{ value: 8, label: "vs yesterday" }}
          />
          <EnergyCard
            title="Battery Level"
            value={currentStats.batteryLevel.toFixed(0)}
            unit="%"
            icon={Battery}
            variant="battery"
            trend={{ value: -2, label: "from full" }}
          />
          <EnergyCard
            title="Consumption"
            value={currentStats.consumption.toFixed(1)}
            unit="kWh"
            icon={Zap}
            variant="consumption"
            trend={{ value: -5, label: "vs yesterday" }}
          />
          <EnergyCard
            title="Efficiency"
            value={currentStats.efficiency.toFixed(0)}
            unit="%"
            icon={TrendingUp}
            variant="solar"
            trend={{ value: 12, label: "improvement" }}
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'daily' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('daily')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              7-Day View
            </Button>
            <Button
              variant={viewMode === 'hourly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('hourly')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Hourly View
            </Button>
          </div>
          
          {viewMode === 'hourly' && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Select Day:</span>
              {weekData.slice(0, 7).map((day, index) => (
                <Button
                  key={index}
                  variant={selectedDay === index ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDay(index)}
                >
                  {day.day.slice(0, 3)}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {viewMode === 'daily' ? (
            <>
              <EnergyChart
                data={weekData}
                title="Generation vs Consumption"
                description="7-day energy trends"
                type="line"
              />
              <EnergyChart
                data={weekData}
                title="Renewable Sources"
                description="Solar and wind generation breakdown"
                type="bar"
              />
            </>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Energy Data - {weekData[selectedDay].day}</CardTitle>
                  <CardDescription>
                    Hour-by-hour breakdown for {weekData[selectedDay].date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {hourlyData.map((hour, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
                        <div className="font-mono text-sm">{hour.hour}</div>
                        <div className="flex space-x-4 text-xs">
                          <span className="text-solar">☀️ {hour.solar}kW</span>
                          <span className="text-wind">💨 {hour.wind}kW</span>
                          <span className="text-consumption">⚡ {hour.consumption}kW</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <EnergyChart
                data={weekData}
                title="Energy Source Distribution"
                description="Today's generation breakdown"
                type="pie"
              />
            </>
          )}
        </div>

        {/* System Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Current system status and maintenance notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <div className="space-y-3">
                {alerts.map((alert, index) => {
                  const Icon = getAlertIcon(alert.type);
                  return (
                    <Alert key={index} variant={getAlertColor(alert.type) as any}>
                      <Icon className="h-4 w-4" />
                      <AlertDescription className="flex items-center justify-between">
                        <span>{alert.message}</span>
                        <Badge variant="outline" className="ml-2">
                          {alert.type}
                        </Badge>
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                All systems operating normally
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;