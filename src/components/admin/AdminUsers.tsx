import React, { useState } from 'react';
import { User } from '../../types';
import { Search, Edit, Trash2, Shield, ShieldCheck, X, Save, User as UserIcon } from 'lucide-react';

interface AdminUsersProps {
  users: User[];
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  users,
  onUpdateUser,
  onDeleteUser,
  addToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'customer'>('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.contactNumber.includes(searchQuery);
    return matchesRole && matchesSearch;
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      contactNumber: user.contactNumber,
      address: user.address,
      role: user.role,
    });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    
    onUpdateUser({
      ...editingUser,
      ...editForm,
    });
    
    addToast('success', `User ${editForm.fullName} updated successfully!`);
    setEditingUser(null);
    setEditForm({});
  };

  const handleDelete = (user: User) => {
    if (user.role === 'admin' && users.filter(u => u.role === 'admin').length === 1) {
      addToast('error', 'Cannot delete the last admin account!');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${user.fullName}? This action cannot be undone.`)) {
      onDeleteUser(user.id);
      addToast('info', `User ${user.fullName} deleted successfully.`);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title & Overview stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Customer & Admin Accounts</h2>
          <p className="text-xs text-stone-500 mt-1">Manage all user accounts, modify details, and control access</p>
        </div>

        <div className="flex items-center space-x-4 bg-white px-5 py-3 rounded-2xl shadow-xs border border-stone-200/80">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Total Accounts</span>
            <span className="text-2xl font-extrabold text-stone-900">{users.length}</span>
          </div>
          <div className="h-8 w-px bg-stone-200 hidden sm:block" />
          <div className="text-center sm:text-left hidden sm:block">
            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Customers</span>
            <span className="text-lg font-bold text-stone-900">{users.filter(u => u.role === 'customer').length}</span>
          </div>
          <div className="h-8 w-px bg-stone-200 hidden sm:block" />
          <div className="text-center sm:text-left hidden sm:block">
            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Admins</span>
            <span className="text-lg font-bold text-rose-600">{users.filter(u => u.role === 'admin').length}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-stone-200/80">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider px-2 hidden sm:inline">
            Role:
          </span>
          {(['all', 'customer', 'admin'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                roleFilter === role ? 'bg-rose-600 text-white shadow-md shadow-rose-200' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {role === 'all' ? 'All Users' : role === 'customer' ? 'Customers' : 'Administrators'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100/80 border border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-stone-200/80">
            <UserIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-base font-medium text-stone-600">No users match your filter criteria.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900">{user.fullName}</p>
                      <p className="text-[10px] text-stone-400 font-mono">ID: {user.id}</p>
                    </div>
                  </div>

                  {user.role === 'admin' ? (
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Admin
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Customer
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-stone-700">
                  <div>
                    <span className="font-bold text-stone-500 block">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block">Phone:</span>
                    <span>{user.contactNumber}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block">Address:</span>
                    <span className="text-[11px] leading-relaxed">{user.address}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block">Username:</span>
                    <span className="font-mono">{user.username || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400">
                  Joined: {new Date(user.id).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Modify</span>
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative animate-scale-up border border-stone-100">
            
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-serif font-bold text-2xl text-stone-900">Modify User Account</h3>
              <p className="text-xs text-stone-500 mt-1">Update account details and permissions</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.fullName || ''}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={editForm.username || ''}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={editForm.contactNumber || ''}
                  onChange={(e) => setEditForm({ ...editForm, contactNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Address *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editForm.address || ''}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Account Role *
                </label>
                <select
                  value={editForm.role || 'customer'}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'admin' | 'customer' })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500 bg-white cursor-pointer"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-5 py-3 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-200 transition-all flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
