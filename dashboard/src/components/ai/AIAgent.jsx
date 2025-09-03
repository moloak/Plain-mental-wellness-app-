import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { AI_AGENTS } from '../../utils/constants';
import { aiInsights } from '../../data/mockData';

const AIAgent = () => {
  const { user, updateUser } = useAuth();
  const currentAgent = AI_AGENTS[user?.aiAgent?.toUpperCase()] || AI_AGENTS.JEMMA;
  const insights = aiInsights[user?.aiAgent] || aiInsights.jemma;

  const switchAgent = (agentKey) => {
    updateUser({ aiAgent: agentKey.toLowerCase() });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your AI Wellness Coach</h2>
        <p className="text-gray-600">Personalized insights and support for your digital wellness journey</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="text-6xl">{currentAgent.avatar}</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{currentAgent.name}</h3>
            <p className="text-gray-600 mb-2">{currentAgent.personality}</p>
            <p className="text-sm text-gray-500">{currentAgent.description}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Recent Insights from {currentAgent.name}</h4>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Switch Your AI Coach</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(AI_AGENTS).map(([key, agent]) => (
              <button
                key={key}
                onClick={() => switchAgent(key)}
                className={`p-4 border-2 rounded-lg transition-all text-left ${
                  user?.aiAgent === key.toLowerCase()
                    ? `border-${agent.color}-500 bg-${agent.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{agent.avatar}</div>
                  <div>
                    <div className="font-medium text-gray-900">{agent.name}</div>
                    <div className="text-sm text-gray-600">{agent.personality}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">AI Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📊</div>
            <div>
              <h5 className="font-medium text-gray-900">Usage Analysis</h5>
              <p className="text-sm text-gray-600">Deep insights into your app usage patterns and trends</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h5 className="font-medium text-gray-900">Smart Suggestions</h5>
              <p className="text-sm text-gray-600">Personalized recommendations for better digital wellness</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📧</div>
            <div>
              <h5 className="font-medium text-gray-900">Weekly Reports</h5>
              <p className="text-sm text-gray-600">Detailed email reports with progress tracking</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <h5 className="font-medium text-gray-900">Goal Setting</h5>
              <p className="text-sm text-gray-600">AI-assisted goal setting based on your usage patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;