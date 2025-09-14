import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  houseNumber: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Sample users data
const USERS = [
  { id: '1', username: 'house1', password: 'demo123', houseNumber: 1 },
  { id: '2', username: 'house2', password: 'demo123', houseNumber: 2 },
  { id: '3', username: 'house3', password: 'demo123', houseNumber: 3 },
  { id: '4', username: 'house4', password: 'demo123', houseNumber: 4 },
  { id: '5', username: 'house5', password: 'demo123', houseNumber: 5 },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(
      (u) => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const user = { 
        id: foundUser.id, 
        username: foundUser.username, 
        houseNumber: foundUser.houseNumber 
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};