import React from 'react';
import { formatTime, calculateUsagePercentage, getUsageStatus, getStatusColor } from '../../utils/utils';

const AppCard = ({ app, onUpdateLimit, onRemoveApp }) => {
  const usagePercentage = calculateUsagePercentage(app.todayUsage, app.dailyLimit);
  const status = getUsageStatus(usagePercentage);
  const statusColor = getStatusColor(status);

  const getStatusText = (status) => {
    const statusTexts = {
      normal: 'Healthy Usage',
      caution: 'Approaching Limit',
      warning: 'Usage Warning',
      critical: 'Critical Usage',
      blocked: 'App Blocked'
    };
    return statusTexts[status];
  };

  const getProgressBarColor = (status) => {
    const colors = {
      normal: 'bg-green-500',
      caution: 'bg-yellow-500',
      warning: 'bg-orange-500',
      critical: 'bg-red-500',
      blocked: 'bg-gray-500'
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{app.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{app.name}</h3>
            <p className="text-sm text-gray-500">{app.category}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {getStatusText(status)}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Today's Usage</span>
          <span className="font-medium">{formatTime(app.todayUsage)} / {formatTime(app.dailyLimit)}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(status)}`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{usagePercentage.toFixed(0)}% used</span>
          <span>Last used: {app.lastUsed}</span>
        </div>

        {app.overshootHours > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 text-sm">⚠️ Overshoot: {app.overshootHours}h this week</span>
            </div>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => onUpdateLimit(app.id)}
            className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            Edit Limit
          </button>
          <button
            onClick={() => onRemoveApp(app.id)}
            className="bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;