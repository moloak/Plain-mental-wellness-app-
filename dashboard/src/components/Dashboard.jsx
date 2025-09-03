import React from 'react';
import { useAuth } from './auth/AuthContext';
import StatsCard from './StatsCard';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monitoredApps, weeklyInsights, usageCategories } from '../data/mockData';
import { formatTime, calculateUsagePercentage, getUsageStatus, generateUsageInsight } from '../utils/utils';

const Dashboard = () => {
  const { user } = useAuth();

  // Prepare chart data
  const weeklyData = monitoredApps[0]?.weeklyUsage.map((usage, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    usage: usage,
    limit: monitoredApps[0]?.dailyLimit || 120
  })) || [];

  const categoryData = usageCategories.map(cat => ({
    name: cat.name,
    value: cat.usage,
    color: cat.color
  }));

  const topApps = monitoredApps
    .sort((a, b) => b.todayUsage - a.todayUsage)
    .slice(0, 5);

  const totalScreenTime = monitoredApps.reduce((sum, app) => sum + app.todayUsage, 0);
  const averageUsage = totalScreenTime / monitoredApps.length;
  const blockedAppsToday = monitoredApps.filter(app => getUsageStatus(calculateUsagePercentage(app.todayUsage, app.dailyLimit)) === 'blocked').length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="opacity-90">
              Here's your digital wellness overview for today
            </p>
          </div>
          <div className="text-6xl opacity-80">🧠</div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Screen Time"
          value={formatTime(totalScreenTime)}
          change={weeklyInsights.previousWeekComparison}
          icon="📱"
          color="blue"
        />
        <StatsCard
          title="Apps Monitored"
          value={monitoredApps.length.toString()}
          change={0}
          icon="👁️"
          color="green"
        />
        <StatsCard
          title="Apps Blocked Today"
          value={blockedAppsToday.toString()}
          change={0}
          icon="🚫"
          color="red"
        />
        <StatsCard
          title="Wellness Score"
          value={`${weeklyInsights.improvementScore}/100`}
          change={5.2}
          icon="⭐"
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Usage Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Usage Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [formatTime(value), 'Usage']} />
              <Area type="monotone" dataKey="usage" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Line type="monotone" dataKey="limit" stroke="#EF4444" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Usage by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [formatTime(value), 'Usage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Apps Today */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Used Apps Today</h3>
        <div className="space-y-4">
          {topApps.map((app, index) => {
            const percentage = calculateUsagePercentage(app.todayUsage, app.dailyLimit);
            const status = getUsageStatus(percentage);
            
            return (
              <div key={app.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{app.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{app.name}</span>
                    <span className="text-sm text-gray-600">
                      {formatTime(app.todayUsage)} / {formatTime(app.dailyLimit)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        status === 'blocked' ? 'bg-gray-500' :
                        status === 'critical' ? 'bg-red-500' :
                        status === 'warning' ? 'bg-orange-500' :
                        status === 'caution' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  status === 'blocked' ? 'text-gray-600 bg-gray-100' :
                  status === 'critical' ? 'text-red-600 bg-red-100' :
                  status === 'warning' ? 'text-orange-600 bg-orange-100' :
                  status === 'caution' ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100'
                }`}>
                  {percentage.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-2xl">
            {user?.aiAgent === 'dan' ? '🤖' : '💝'}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Insights from {user?.aiAgent === 'dan' ? 'Dan' : 'Jemma'}
          </h3>
        </div>
        <div className="space-y-3">
          {topApps.slice(0, 2).map(app => (
            <div key={app.id} className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-800">
                {generateUsageInsight(app.name, app.todayUsage, app.dailyLimit, user?.aiAgent || 'jemma')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;