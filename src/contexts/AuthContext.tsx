import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Course {
  id: string;
  title: string;
  progress: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  hasPurchasedCourses: boolean;
  lastActiveCourse: Course | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasPurchasedCourses, setHasPurchasedCourses] = useState(false);
  const [lastActiveCourse, setLastActiveCourse] = useState<Course | null>(null);

  const login = (email: string, password: string) => {
    console.log("Login with:", email, password);
    console.log("Setting user and course purchase status...");
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: undefined
    };
    setUser(mockUser);
    
    // Set course purchase status immediately for demo purposes
    console.log("Setting hasPurchasedCourses to true");
    setHasPurchasedCourses(false);
    setLastActiveCourse({
      id: '1',
      title: 'Japanese Basics',
      progress: 65
    });
  };

  const logout = () => {
    setUser(null);
    setHasPurchasedCourses(false);
    setLastActiveCourse(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    hasPurchasedCourses,
    lastActiveCourse,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
