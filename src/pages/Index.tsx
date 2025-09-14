import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Wind, Sun, Battery, TrendingUp, Shield } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Sun,
      title: 'Solar Monitoring',
      description: 'Real-time solar panel performance tracking and efficiency analysis',
    },
    {
      icon: Wind,
      title: 'Wind Power Integration',
      description: 'Comprehensive wind turbine monitoring and power generation analytics',
    },
    {
      icon: Battery,
      title: 'Energy Storage',
      description: 'Battery management system with charge level and health monitoring',
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Advanced data visualization and energy consumption optimization',
    },
    {
      icon: Shield,
      title: 'Predictive Maintenance',
      description: 'AI-powered alerts for system health and maintenance scheduling',
    },
    {
      icon: Zap,
      title: 'Grid Integration',
      description: 'Seamless microgrid management and grid-tie functionality',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-6xl font-bold mb-6 text-black ">
              Renewable Energy Monitoring System for Microgrids
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              IoT-based monitoring system for solar and wind microgrids in rural areas. 
              Real-time data, predictive analytics, and smart energy management for sustainable communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Access Dashboard
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Comprehensive Energy Management
            </h2>
            <p className="text-lg text-muted-foreground">
              Monitor, analyze, and optimize your renewable energy systems with cutting-edge IoT technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="transition-smooth hover:shadow-lg border-0 bg-card/60 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg gradient-primary mr-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">15%</div>
                <div className="text-lg font-medium">Efficiency Improvement</div>
                <p className="text-sm text-muted-foreground">
                  Average energy efficiency gain with our monitoring system
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-solar">24/7</div>
                <div className="text-lg font-medium">Real-time Monitoring</div>
                <p className="text-sm text-muted-foreground">
                  Continuous system monitoring and data collection
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-wind">5</div>
                <div className="text-lg font-medium">Connected Houses</div>
                <p className="text-sm text-muted-foreground">
                  Rural households powered by our microgrid system
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4 text-center">
  &copy; 2025 Renewable Energy Monitoring System | All Rights Reserved
</footer>
    </div>
  );
};

export default Index;