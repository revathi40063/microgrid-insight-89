import energyData from '@/data/energyData.json';

export interface EnergyDataPoint {
  timestamp: string;
  solar_irradiance_Wm2: number;
  ambient_temp_C: number;
  panel_temp_C: number;
  pv_power_kW: number;
  wind_power_kW: number;
  total_generation_kW: number;
  load_consumption_kW: number;
  predicted_nextday_load_kW: number;
}

export interface ProcessedDayData {
  date: string;
  day: string;
  solarGeneration: number;
  windGeneration: number;
  totalGeneration: number;
  consumption: number;
  batteryLevel: number;
  efficiency: number;
}

export interface HourlyData {
  hour: string;
  time: string;
  solar: number;
  wind: number;
  consumption: number;
  generation: number;
}

// Simulate different houses having slightly different data
const getHouseMultiplier = (houseNumber: number) => {
  const multipliers = [1.0, 0.85, 1.15, 0.95, 1.05];
  return multipliers[houseNumber - 1] || 1.0;
};

const getBatteryLevel = (generation: number, consumption: number, baseLevel: number = 65) => {
  const efficiency = generation / consumption;
  const variation = (efficiency - 1) * 20; // Battery varies based on efficiency
  return Math.max(15, Math.min(95, baseLevel + variation));
};

export const getProcessedWeekData = (houseNumber: number): ProcessedDayData[] => {
  const multiplier = getHouseMultiplier(houseNumber);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return daysOfWeek.map((day, index) => {
    // Get 24 hours of data starting from day index
    const startIndex = index * 24;
    const dayData = energyData.slice(startIndex, startIndex + 24) as EnergyDataPoint[];
    
    const solarGeneration = dayData.reduce((sum, item) => sum + item.pv_power_kW, 0) * multiplier;
    const windGeneration = dayData.reduce((sum, item) => sum + item.wind_power_kW, 0) * multiplier;
    const totalGeneration = solarGeneration + windGeneration;
    const consumption = dayData.reduce((sum, item) => sum + item.load_consumption_kW, 0) * multiplier;
    
    const batteryLevel = getBatteryLevel(totalGeneration, consumption, 65 + (houseNumber * 2));
    const efficiency = (totalGeneration / consumption) * 100;
    
    return {
      date: `2024-01-0${index + 1}`,
      day,
      solarGeneration: Number(solarGeneration.toFixed(2)),
      windGeneration: Number(windGeneration.toFixed(2)),
      totalGeneration: Number(totalGeneration.toFixed(2)),
      consumption: Number(consumption.toFixed(2)),
      batteryLevel: Number(batteryLevel.toFixed(1)),
      efficiency: Number(efficiency.toFixed(1)),
    };
  });
};

export const getHourlyData = (houseNumber: number, dayIndex: number): HourlyData[] => {
  const multiplier = getHouseMultiplier(houseNumber);
  const startIndex = dayIndex * 24;
  const dayData = energyData.slice(startIndex, startIndex + 24) as EnergyDataPoint[];
  
  return dayData.map((item, index) => ({
    hour: `${index.toString().padStart(2, '0')}:00`,
    time: `${index}:00`,
    solar: Number((item.pv_power_kW * multiplier).toFixed(3)),
    wind: Number((item.wind_power_kW * multiplier).toFixed(3)),
    consumption: Number((item.load_consumption_kW * multiplier).toFixed(3)),
    generation: Number(((item.pv_power_kW + item.wind_power_kW) * multiplier).toFixed(3)),
  }));
};

export const getCurrentDayStats = (houseNumber: number) => {
  const weekData = getProcessedWeekData(houseNumber);
  const today = weekData[0]; // Using Monday as "today"
  
  return {
    generation: today.totalGeneration,
    batteryLevel: today.batteryLevel,
    consumption: today.consumption,
    efficiency: today.efficiency,
  };
};

export const getAlerts = (houseNumber: number): Array<{ type: 'warning' | 'info' | 'error', message: string }> => {
  const stats = getCurrentDayStats(houseNumber);
  const alerts = [];
  
  if (stats.batteryLevel < 30) {
    alerts.push({
      type: 'error' as const,
      message: 'Battery level critically low. Check system connections.',
    });
  } else if (stats.batteryLevel < 50) {
    alerts.push({
      type: 'warning' as const,
      message: 'Battery efficiency dropping. Consider maintenance check.',
    });
  }
  
  if (stats.efficiency < 80) {
    alerts.push({
      type: 'warning' as const,
      message: 'Energy efficiency below optimal. Check inverter connections.',
    });
  }
  
  if (stats.generation > stats.consumption * 1.2) {
    alerts.push({
      type: 'info' as const,
      message: 'Excellent generation today! Surplus energy available.',
    });
  }
  
  return alerts;
};