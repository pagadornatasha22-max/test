import React, { useState } from 'react';
import { User, PageView } from '../../types';
import { Flower, Key, User as UserIcon, ArrowRight, ShieldCheck, Heart, MapPin } from 'lucide-react';

interface LoginProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
  onNavigate: (page: PageView) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const Login: React.FC<LoginProps> = ({ users, onLoginSuccess, onNavigate, addToast }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      addToast('error', 'Please enter your email/username and password');
      return;
    }

    const foundUser = users.find(
      (u) =>
        (u.email.toLowerCase() === identifier.toLowerCase() ||
          u.username?.toLowerCase() === identifier.toLowerCase()) &&
        u.password === password
    );

    if (foundUser) {
      addToast('success', `Welcome back, ${foundUser.fullName}!`);
      onLoginSuccess(foundUser);
    } else {
      addToast('error', 'Invalid email/username or password. Please try again.');
    }
  };

  const fillDemo = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      setIdentifier('macel.flowershop@gmail.com');
      setPassword('password123');
      addToast('info', 'Filled Admin Demo Credentials');
    } else {
      setIdentifier('juan.delacruz@gmail.com');
      setPassword('password123');
      addToast('info', 'Filled Customer Demo Credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 relative overflow-hidden">
      {/* Background soft glowing blur effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/20 relative z-10 animate-fade-in-up">
        
        {/* Header branding */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center text-emerald-950 shadow-lg shadow-gold-400/20 mb-4">
            <Flower className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-emerald-900">
            Macel's <span className="text-gold-600 font-normal italic">Flower Shop</span>
          </h2>
          
          <div className="mt-4 flex flex-col items-center text-xs text-stone-600 font-medium space-y-2 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Canipaan, Hinunangan, Southern Leyte</span>
            </div>
            
            {/* Embedded Live Google Map */}
            <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-300 shadow-inner bg-stone-200">
              <iframe
                title="Macel's Flower Shop Google Map"
                src="https://maps.google.com/maps?q=10.414779,125.185361&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex items-center justify-between w-full px-1 text-[10px] font-mono text-stone-500 pt-0.5">
              <span>10.414779, 125.185361</span>
              <a
                href="https://www.google.com/maps?q=10.414779,125.185361"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
              >
                Open Maps
              </a>
            </div>
          </div>

          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            <Heart className="w-3.5 h-3.5 mr-1 inline animate-pulse text-rose-500" /> Premium Canipaan Florist
          </div>
        </div>

        {/* Demo Fast Login helpers */}
        <div className="bg-emerald-950/5 p-4 rounded-2xl border border-emerald-900/10 text-xs space-y-2">
          <p className="font-bold text-emerald-800 text-center flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1" /> Quick Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo('customer')}
              className="px-3 py-2.5 bg-white text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 rounded-xl font-bold transition-all shadow-2xs text-center cursor-pointer"
            >
              🧑 Customer Account
            </button>
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="px-3 py-2.5 bg-emerald-700 text-white hover:bg-emerald-800 rounded-xl font-bold transition-all shadow-xs text-center cursor-pointer"
            >
              👑 Admin Account
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Email or Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <UserIcon className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white/60 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-medium text-sm transition-all focus:bg-white"
                placeholder="email@example.com or username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Key className="h-4.5 w-4.5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white/60 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-medium text-sm transition-all focus:bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-all cursor-pointer shadow-md shadow-emerald-700/20 group"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-stone-200">
          <p className="text-xs text-stone-600 font-medium">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-all cursor-pointer"
            >
              Register here
            </button>
          </p>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-stone-400 mt-2">
          Macel's Flower Shop Ordering System &copy; 2026. All rights reserved.
        </div>

      </div>
    </div>
  );
};
