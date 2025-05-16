
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, simulate an API call with mock users
    setIsLoading(true);
    
    // Simulating an API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === "admin@college.edu" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        name: "Admin User",
        email: "admin@college.edu",
        role: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin!",
      });
    } else if (email === "user@college.edu" && password === "user123") {
      const regularUser: User = {
        id: "2",
        name: "Regular User",
        email: "user@college.edu",
        role: "user",
      };
      setUser(regularUser);
      localStorage.setItem("user", JSON.stringify(regularUser));
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password",
      });
    }
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    // For demo purposes, simulate an API call
    setIsLoading(true);
    
    // Simulating an API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: "user",
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast({
      title: "Registration Successful",
      description: "Welcome to College Events!",
    });
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
