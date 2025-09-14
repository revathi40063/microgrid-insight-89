import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Zap, Home } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Try house1-house5 with demo123.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const sampleAccounts = [
    'house1', 'house2', 'house3', 'house4', 'house5'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-primary shadow-glow">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold">SAHAYA GRID</span>
        </Link>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">House Login</CardTitle>
            <CardDescription>
              Access your energy monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">House Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g., house1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm mb-3 flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Demo Accounts
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {sampleAccounts.map((house) => (
                  <div key={house} className="flex justify-between">
                    <span className="font-mono">{house}</span>
                    <span className="text-muted-foreground">demo123</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;