import React, { useState } from 'react';
import { User, PageView } from '../../types';
import { Flower, Mail, Lock, User as UserIcon, Phone, MapPin, ArrowRight } from 'lucide-react';

interface RegisterProps {
  users: User[];
  onRegisterSuccess: (newUser: User) => void;
  onNavigate: (page: PageView) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ users, onRegisterSuccess, onNavigate, addToast }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !contactNumber.trim() || !address.trim() || !password.trim()) {
      addToast('error', 'Please complete all required fields.');
      return;
    }

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      addToast('error', 'An account with this email already exists.');
      return;
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      username: email.split('@')[0],
      email: email.trim(),
      password: password,
      fullName: fullName.trim(),
      contactNumber: contactNumber.trim(),
      address: address.trim(),
      role: 'customer',
    };

    addToast('success', 'Registration successful! Welcome to Macel\'s Flower Shop.');
    onRegisterSuccess(newUser);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50/50 via-stone-50 to-rose-100/30">
      <div className="max-w-xl w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-rose-100">
        
        {/* Header branding */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-200 mb-3">
            <Flower className="w-9 h-9" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            Create Customer Account
          </h2>
          <div className="mt-3 flex flex-col items-center text-xs sm:text-sm text-stone-600 font-medium space-y-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 shadow-2xs max-w-md mx-auto">
            <div className="flex items-center space-x-1.5 font-bold text-stone-900">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Canipaan, Hinunangan, Southern Leyte</span>
            </div>
            
            <div className="w-full h-36 rounded-xl overflow-hidden border border-stone-300 shadow-inner bg-stone-200">
              <iframe
                title="Register Google Map"
                src="https://maps.google.com/maps?q=10.414779,125.185361&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex items-center justify-between w-full px-1 text-[11px] font-mono text-stone-500 pt-0.5">
              <span>GPS: 10.414779, 125.185361</span>
              <a
                href="https://www.google.com/maps?q=10.414779,125.185361"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
              >
                Open Map &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <UserIcon className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-medium text-sm transition-all bg-stone-50/50"
                placeholder="e.g., Maria Clara"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-medium text-sm transition-all bg-stone-50/50"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Contact Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-medium text-sm transition-all bg-stone-50/50"
                  placeholder="0917 ••• ••••"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Complete Delivery/Pickup Address *
            </label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-stone-400">
                <MapPin className="h-5 w-5" />
              </div>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-medium text-sm transition-all bg-stone-50/50"
                placeholder="Purok E, Brgy Canipaan, Hinunangan, Southern Leyte"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Account Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-medium text-sm transition-all bg-stone-50/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-md shadow-rose-200 transition-all cursor-pointer group mt-2"
          >
            <span>Complete Registration & Log In</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-stone-100">
          <p className="text-sm text-stone-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-bold text-rose-600 hover:text-rose-700 hover:underline transition-all"
            >
              Sign In here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
