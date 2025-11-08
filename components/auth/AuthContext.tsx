import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isGuest?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  continueAsGuest: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'SIGN_OUT' }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false, error: null };
    case 'AUTH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'SIGN_OUT':
      return { user: null, isAuthenticated: false, isLoading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Demo user database
const demoUsers = [
  {
    id: '1',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@alx.com',
    password: 'password123'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // Auto-login for demo account
      if (email === 'demo@alx.com') {
        if (password === 'password123') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const userData: User = {
            id: '1',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@alx.com',
          };
          dispatch({ type: 'AUTH_SUCCESS', payload: userData });
          return;
        } else {
          throw new Error('Invalid password for demo account. Use: password123');
        }
      }

      // For other emails, check if they exist
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const user = demoUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('No account found with this email. Use demo@alx.com or continue as guest.');
      }

      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      const userData: User = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: (error as Error).message });
      throw error;
    }
  };

  const signUp = async (firstName: string, lastName: string, email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const existingUser = demoUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        email,
        password,
      };

      demoUsers.push(newUser);

      const userData: User = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: (error as Error).message });
      throw error;
    }
  };

  const continueAsGuest = (): void => {
    const guestUser: User = {
      id: 'guest_' + Math.random().toString(36).substr(2, 9),
      firstName: 'Guest',
      lastName: 'User',
      email: 'guest@alx.com',
      isGuest: true
    };
    dispatch({ type: 'AUTH_SUCCESS', payload: guestUser });
  };

  const signOut = (): void => {
    dispatch({ type: 'SIGN_OUT' });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      signIn, 
      signUp, 
      signOut, 
      continueAsGuest, 
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
