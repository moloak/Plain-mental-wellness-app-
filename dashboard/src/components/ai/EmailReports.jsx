import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { AI_AGENTS } from '../../utils/constants';
import { weeklyInsights, monitoredApps } from '../../data/mockData';
import { formatTime } from '../../utils/utils';

const EmailReports = () => {
  const { user } = useAuth();
  const [previewMode, setPreviewMode] = useState(false);
  const [emailSettings, setEmailSettings] = useState({
    frequency: 'weekly',
    dayOfWeek: 'sunday',
    time: '09:00',
    enabled: true
  });
  const currentAgent = AI_AGENTS[user?.aiAgent?.toUpperCase()] || AI_AGENTS.JEMMA;

  const generateEmailContent = () => {
    const agentName = currentAgent.name;
    const greeting = currentAgent.name === 'Dan' 
      ? `Hi ${user?.name || 'there'},\n\nHere's your weekly digital wellness report with data-driven insights:`
      : `Hello beautiful soul ${user?.name || ''} 💝,\n\nI hope this message finds you well! Here's your gentle weekly check-in on your digital wellness journey:`;

    const topApps = monitoredApps
      .sort((a, b) => b.todayUsage - a.todayUsage)
      .slice(0, 3);

    const improvements = currentAgent.name === 'Dan'
      ? [
          "Consider setting specific time blocks for social media usage",
          "Try the Pomodoro technique for focused work sessions", 
          "Use app timers to create natural stopping points"
        ]
      : [
          "Remember to take gentle breaks and breathe deeply 🌸",
          "Consider replacing some screen time with nature walks 🌿",
          "Practice self-compassion - progress isn't always linear ✨"
        ];

    return {
      subject: `Your Weekly Digital Wellness Report from ${agentName}`,
      content: `${greeting}

📊 WEEKLY OVERVIEW
• Total screen time: ${formatTime(weeklyInsights.totalScreenTime)}
• Daily average: ${formatTime(weeklyInsights.averageDailyUsage)}
• Apps blocked: ${weeklyInsights.blockedAppsCount} times
• Improvement score: ${weeklyInsights.improvementScore}/100

🏆 TOP APPS THIS WEEK
${topApps.map((app, index) => 
  `${index + 1}. ${app.name} ${app.icon} - ${formatTime(app.todayUsage * 7)} (${app.category})`
).join('\n')}

💡 PERSONALIZED INSIGHTS
${improvements.map(tip => `• ${tip}`).join('\n')}

${currentAgent.name === 'Dan' 
  ? `Keep up the analytical approach to your digital wellness. Data shows you're making measurable progress!\n\nBest regards,\nDan 🤖`
  : `Remember, every small step counts on this journey. I'm so proud of your commitment to wellness! 💚\n\nWith love and support,\nJemma 💝`
}

---
Plain Mental Health App
Unsubscribe | Update Preferences`
    };
  };

  const emailContent = generateEmailContent();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Reports</h2>
        <p className="text-gray-600">Weekly insights delivered to your inbox by your AI coach</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{currentAgent.avatar}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Weekly Reports from {currentAgent.name}
              </h3>
              <p className="text-gray-600">Sent every {emailSettings.dayOfWeek} at {emailSettings.time}</p>
            </div>
          </div>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {previewMode ? 'Hide Preview' : 'Preview Email'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Email Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email Reports</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailSettings.enabled}
                    onChange={(e) => setEmailSettings({...emailSettings, enabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={emailSettings.frequency}
                  onChange={(e) => setEmailSettings({...emailSettings, frequency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
                <select
                  value={emailSettings.dayOfWeek}
                  onChange={(e) => setEmailSettings({...emailSettings, dayOfWeek: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Recent Reports</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Weekly Report #47</p>
                  <p className="text-sm text-gray-600">Sent Sep 1, 2025</p>
                </div>
                <span className="text-green-600 text-sm">✓ Delivered</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Weekly Report #46</p>
                  <p className="text-sm text-gray-600">Sent Aug 25, 2025</p>
                </div>
                <span className="text-green-600 text-sm">✓ Delivered</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Weekly Report #45</p>
                  <p className="text-sm text-gray-600">Sent Aug 18, 2025</p>
                </div>
                <span className="text-green-600 text-sm">✓ Delivered</span>
              </div>
            </div>
          </div>
        </div>

        {previewMode && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Email Preview</h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="mb-4 pb-4 border-b border-gray-300">
                <p className="font-medium text-gray-900">Subject: {emailContent.subject}</p>
                <p className="text-sm text-gray-600">From: {currentAgent.name} &lt;{currentAgent.name.toLowerCase()}@plain.app&gt;</p>
                <p className="text-sm text-gray-600">To: {user?.email}</p>
              </div>
              <div className="whitespace-pre-line text-gray-800 font-mono text-sm">
                {emailContent.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailReports;