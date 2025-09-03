import React from 'react';
import { useAuth } from './auth/AuthContext';

const Sidebar = ({ currentView, onViewChange }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'apps', label: 'App Management', icon: '📱' },
    { id: 'ai-agent', label: 'AI Coach', icon: '🤖' },
    { id: 'email-reports', label: 'Email Reports', icon: '📧' },
    { id: 'subscription', label: 'Subscription', icon: '💳' }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user?.subscriptionPlan} Plan</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white text-center">
          <div className="text-2xl mb-2">🌟</div>
          <p className="text-sm font-medium mb-1">Digital Wellness</p>
          <p className="text-xs opacity-90">Your mental health matters</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;