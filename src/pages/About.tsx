import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, TrendingUp, Zap, Globe, Leaf } from 'lucide-react';

const About = () => {
  const goals = [
    {
      icon: TrendingUp,
      title: '15% Efficiency Improvement',
      description: 'Increase rural microgrid efficiency through intelligent monitoring and optimization.',
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Continuous tracking of energy generation, storage, and consumption patterns.',
    },
    {
      icon: Globe,
      title: 'Remote Management',
      description: 'Enable operators to manage distributed energy systems from centralized locations.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Energy',
      description: 'Maximize renewable energy utilization and minimize grid dependency.',
    },
  ];

  const features = [
    'IoT sensor integration for real-time data collection',
    'AI-powered predictive analytics for energy optimization',
    'Automated fault detection and alert systems',
    'Weather pattern analysis for generation forecasting',
    'Load balancing and demand response management',
    'Mobile-responsive dashboard for field operators',
  ];

  const impact = [
    { metric: '247 kWh', label: 'Daily Energy Generated', trend: '+12%' },
    { metric: '15%', label: 'Efficiency Improvement', trend: 'Target' },
    { metric: '98.5%', label: 'System Uptime', trend: '+2.1%' },
    { metric: '156', label: 'Households Served', trend: '+8' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white space-y-6">
            
           
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
              SmartGrid Monitor
            </h1>
            <p className="text-xl md:text-2xl text-black/90 max-w-3xl mx-auto">
              Empowering Rural Energy with IoT
            </p>
            <p className="text-lg text-black/80 max-w-2xl mx-auto">
              Advanced monitoring system that leverages IoT sensors and AI analytics to optimize 
              renewable energy microgrids in rural communities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Project Overview */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Project Overview</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our mission is to revolutionize rural energy access through intelligent monitoring 
              and optimization of renewable energy microgrids, targeting a 15% efficiency improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-3 bg-gradient-primary rounded-xl shadow-soft mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
            <p className="text-lg text-muted-foreground">
              Advanced technology stack powering intelligent energy management
            </p>
          </div>

          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">
                      Technology Features
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">
                      Community Impact
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Our system directly benefits rural communities by providing:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Reliable Energy
                        </Badge>
                        <span className="text-sm text-muted-foreground">24/7 power availability</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Cost Savings
                        </Badge>
                        <span className="text-sm text-muted-foreground">Reduced energy costs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Sustainability
                        </Badge>
                        <span className="text-sm text-muted-foreground">Clean energy future</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Impact Metrics */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Current Impact</h2>
            <p className="text-lg text-muted-foreground">
              Real results from our deployed monitoring systems
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map((item, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-primary">{item.metric}</p>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <Badge 
                      variant="outline" 
                      className={`${
                        item.trend.startsWith('+') 
                          ? 'bg-success/10 text-success border-success/20' 
                          : item.trend === 'Target'
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-primary/10 text-primary border-primary/20'
                      }`}
                    >
                      {item.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section>
          <Card className="shadow-card bg-gradient-card border-0">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                <div className="mx-auto p-4 bg-gradient-primary rounded-2xl shadow-glow w-fit">
                   <Leaf className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  To bridge the energy gap in rural communities through innovative IoT monitoring solutions, 
                  making renewable energy more reliable, efficient, and accessible. We believe that every 
                  community deserves access to clean, sustainable energy that powers their growth and prosperity.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;