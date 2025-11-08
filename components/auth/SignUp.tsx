
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SignUpProps {
  onClose: () => void;
  switchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose, switchToSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { signUp, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await signUp(formData.firstName, formData.lastName, formData.email, formData.password);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-semibold mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-3 rounded-2xl hover:bg-teal-700 disabled:bg-teal-400 transition duration-300 font-semibold"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button onClick={switchToSignIn} className="text-teal-600 hover:text-teal-700 font-semibold">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
