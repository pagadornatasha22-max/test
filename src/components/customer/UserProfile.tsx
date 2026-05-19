import React, { useState } from 'react';
import { User } from '../../types';
import { User as UserIcon, Phone, MapPin, Lock, Save, ShieldCheck } from 'lucide-react';

interface UserProfileProps {
  currentUser: User;
  onUpdateUser: (updatedUser: User) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ currentUser, onUpdateUser, addToast }) => {
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [contactNumber, setContactNumber] = useState(currentUser.contactNumber);
  const [address, setAddress] = useState(currentUser.address);
  const [password, setPassword] = useState(currentUser.password || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !contactNumber.trim() || !address.trim() || !password.trim()) {
      addToast('error', 'All fields are required.');
      return;
    }

    const updated: User = {
      ...currentUser,
      fullName: fullName.trim(),
      contactNumber: contactNumber.trim(),
      address: address.trim(),
      password: password.trim(),
    };

    onUpdateUser(updated);
    addToast('success', 'Profile information updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="pb-4 border-b border-stone-200">
        <h2 className="text-3xl font-serif font-bold text-stone-900">Customer Profile</h2>
        <p className="text-xs text-stone-500 mt-1">Manage your account credentials and Hinunangan address</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xs border border-stone-200/80 space-y-6">
        <div className="flex items-center space-x-4 pb-6 border-b border-stone-100">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-2xl uppercase shadow-xs">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">{currentUser.fullName}</h3>
            <p className="text-xs text-stone-500">{currentUser.email} • {currentUser.role.toUpperCase()}</p>
            <div className="mt-1.5 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Account</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Contact Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Default Pickup / Delivery Address *
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-stone-400">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Account Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-24 py-3 border border-stone-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3.5 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all flex items-center space-x-2 text-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
