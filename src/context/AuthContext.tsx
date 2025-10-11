// src/context/AuthContext.tsx
// src/context/AuthContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'; 

interface AuthContextType {
  user: User | null;
  role: string | null; // Exposed role
  logout: () => void;
  loading: boolean; // 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, role, logout, loading } = useFirebaseAuth();

  // Show a loading screen while Firebase initializes
  if (loading) {
      return <div className="min-h-screen flex items-center justify-center text-xl font-medium">Loading Application...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, role, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
// ⚠️ REMEMBER TO WRAP YOUR APP:
// In your App.tsx or main.tsx:
// <AuthProvider>
//   <Navbar />
//   <Routes>...</Routes>
// </AuthProvider>