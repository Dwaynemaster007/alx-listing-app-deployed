// components/auth/SignIn.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SignInProps {
  onClose: () => void;
  switchToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose, switchToSignUp }) => {
  const [email, setEmail] = useState('app@alx.com'); // Pre-fill demo email
  const [password, setPassword] = useState('password123'); // Pre-fill demo password
  const { signIn, continueAsGuest, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await signIn(email, password);
      onClose();
    } catch (error) {
      throw new Error(
        `Error Happened: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const handleGuestLogin = (): void => {
    continueAsGuest();
    onClose();
  };

  const handleDemoLogin = (): void => {
    setEmail('app@alx.com');
    setPassword('password123');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) clearError();
              }}
              placeholder="Enter your email"
              className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) clearError();
              }}
              placeholder="Enter your password"
              className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
              required
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-3 rounded-2xl hover:bg-teal-700 disabled:bg-teal-400 transition duration-300 font-semibold"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Account Button */}
        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full bg-emerald-300 text-white py-3 rounded-2xl hover:bg-emerald-600 disabled:bg-emerald-300 transition duration-300 font-semibold mt-4"
        >
          Use Demo Account
        </button>

        {/* Continue as Guest Button */}
        <button
          onClick={handleGuestLogin}
          disabled={isLoading}
          className="w-full bg-gray-500 text-white py-3 rounded-2xl hover:bg-gray-600 disabled:bg-gray-400 transition duration-300 font-semibold mt-4"
        >
          Continue as Guest
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don&rsquo;t have an account?{' '}
            <button onClick={switchToSignUp} className="text-teal-600 hover:text-teal-700 font-semibold">
              Sign Up
            </button>
          </p>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            <strong>Demo Account:</strong><br />
            app@alx.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
