import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getCurrentDayStats } from '@/utils/dataProcessing';
import Alerts from '@/components/Alerts';

const AlertsPage = () => {
  const { user } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const currentStats = getCurrentDayStats(user.houseNumber);

  // Mock data for Alerts component
  // TODO: Replace with real data from your backend/API
  const mockAlertData = {
    dailyConsumption: currentStats.consumption, // Using current consumption from existing data
    target: 25.0, // Daily target consumption in kWh
    tolerance: 5.0, // Tolerance before billing kicks in
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            House {user.houseNumber} - Consumption Alerts
          </h1>
          <p className="text-muted-foreground">
            Monitor your energy consumption and receive real-time alerts
          </p>
        </div>

        {/* Alerts Component */}
        <div className="max-w-4xl mx-auto">
          <Alerts
            houseNumber={user.houseNumber}
            dailyConsumption={mockAlertData.dailyConsumption}
            target={mockAlertData.target}
            tolerance={mockAlertData.tolerance}
          />
        </div>

        {/* Additional Alert Information */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 text-green-600">Normal Range</h3>
              <p className="text-sm text-muted-foreground">
                Consumption below {mockAlertData.target - mockAlertData.tolerance} kWh
              </p>
              <p className="text-xs mt-2">All systems operating efficiently</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 text-yellow-600">Warning Zone</h3>
              <p className="text-sm text-muted-foreground">
                Consumption between {mockAlertData.target - mockAlertData.tolerance} - {mockAlertData.target} kWh
              </p>
              <p className="text-xs mt-2">Monitor usage closely</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 text-red-600">Critical Zone</h3>
              <p className="text-sm text-muted-foreground">
                Consumption above {mockAlertData.target} kWh
              </p>
              <p className="text-xs mt-2">Immediate action required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;