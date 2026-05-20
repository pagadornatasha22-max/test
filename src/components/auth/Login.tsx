import React, { useState } from 'react';
import { User, PageView } from '../../types';
import { Flower, Key, User as UserIcon, ArrowRight, Heart, MapPin } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (page: PageView) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigate, addToast }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      addToast('error', 'Please enter your email/username and password');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), password: password.trim() })
      });

      const data = await response.json();

      if (data.success && data.user) {
        addToast('success', `Welcome back, ${data.user.full_name}!`);
        
        // Map database fields to frontend User object structure
        onLoginSuccess({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          fullName: data.user.full_name,
          contactNumber: data.user.contact_number,
          address: data.user.address,
          role: data.user.role
        });
      } else {
        addToast('error', data.message || 'Invalid email/username or password. Please try again.');
      }
    } catch (err) {
      console.error("Login API request failed:", err);
      addToast('error', 'Database connection failed. Cannot authenticate user.');
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
