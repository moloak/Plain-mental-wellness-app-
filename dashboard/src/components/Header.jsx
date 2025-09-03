import React from 'react';
import { useAuth } from './auth/AuthContext';
import { calculateTrialDaysLeft } from '../utils/utils';

const Header = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();
  const trialDaysLeft = user?.subscriptionPlan === 'trial' ? calculateTrialDaysLeft(user.trialStartDate) : 0;

  const getViewTitle = (view) => {
    const titles = {
      dashboard: 'Dashboard',
      apps: 'App Management',
      subscription: 'Subscription',
      'ai-agent': 'AI Coach',
      'email-reports': 'Email Reports'
    };
    return titles[view] || 'Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🧠</div>
            <h1 className="text-xl font-bold text-gray-900">Plain</h1>
          </div>
          <div className="hidden md:block text-gray-400">|</div>
          <h2 className="hidden md:block text-lg font-medium text-gray-700">
            {getViewTitle(currentView)}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {user?.subscriptionPlan === 'trial' && trialDaysLeft > 0 && (
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {trialDaysLeft} days left in trial
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600">
              Welcome, {user?.name}
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile view selector */}
      <div className="md:hidden mt-4">
        <select
          value={currentView}
          onChange={(e) => onViewChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="dashboard">📊 Dashboard</option>
          <option value="apps">📱 App Management</option>
          <option value="ai-agent">🤖 AI Coach</option>
          <option value="email-reports">📧 Email Reports</option>
          <option value="subscription">💳 Subscription</option>
        </select>
      </div>
    </header>
  );
};

export default Header;