import React, { useState } from 'react';
import AppCard from './AppCard';
import { monitoredApps } from '../../data/mockData';

const AppManager = () => {
  const [apps, setApps] = useState(monitoredApps);
  const [showAddApp, setShowAddApp] = useState(false);
  const [newApp, setNewApp] = useState({
    name: '',
    category: 'Social Media',
    dailyLimit: 60,
    icon: '📱'
  });

  const handleAddApp = (e) => {
    e.preventDefault();
    const app = {
      id: Date.now(),
      ...newApp,
      todayUsage: 0,
      weeklyUsage: [0, 0, 0, 0, 0, 0, 0],
      status: 'normal',
      lastUsed: 'Never',
      totalBlocks: 0,
      overshootHours: 0
    };
    setApps([...apps, app]);
    setNewApp({ name: '', category: 'Social Media', dailyLimit: 60, icon: '📱' });
    setShowAddApp(false);
  };

  const handleUpdateLimit = (appId) => {
    const newLimit = prompt('Enter new daily limit (in minutes):');
    if (newLimit && !isNaN(newLimit)) {
      setApps(apps.map(app => 
        app.id === appId ? { ...app, dailyLimit: parseInt(newLimit) } : app
      ));
    }
  };

  const handleRemoveApp = (appId) => {
    if (confirm('Are you sure you want to stop monitoring this app?')) {
      setApps(apps.filter(app => app.id !== appId));
    }
  };

  const categories = ['Social Media', 'Entertainment', 'Communication', 'Productivity', 'Games', 'News', 'Shopping'];
  const appIcons = ['📱', '📸', '🎵', '💬', '📺', '🐦', '🎮', '📰', '🛒', '💼', '📚'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">App Management</h2>
          <p className="text-gray-600">Monitor and control your app usage</p>
        </div>
        <button
          onClick={() => setShowAddApp(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Add App
        </button>
      </div>

      {showAddApp && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New App to Monitor</h3>
          <form onSubmit={handleAddApp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                <input
                  type="text"
                  value={newApp.name}
                  onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter app name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newApp.category}
                  onChange={(e) => setNewApp({ ...newApp, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daily Limit (minutes)</label>
                <input
                  type="number"
                  value={newApp.dailyLimit}
                  onChange={(e) => setNewApp({ ...newApp, dailyLimit: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="1440"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  value={newApp.icon}
                  onChange={(e) => setNewApp({ ...newApp, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {appIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add App
              </button>
              <button
                type="button"
                onClick={() => setShowAddApp(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map(app => (
          <AppCard
            key={app.id}
            app={app}
            onUpdateLimit={handleUpdateLimit}
            onRemoveApp={handleRemoveApp}
          />
        ))}
      </div>

      {apps.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Apps Being Monitored</h3>
          <p className="text-gray-600 mb-4">Add your first app to start monitoring your digital wellness</p>
          <button
            onClick={() => setShowAddApp(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Your First App
          </button>
        </div>
      )}
    </div>
  );
};

export default AppManager;