import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AppManager from './components/apps/AppManager';
import Subscription from './components/subscription/Subscription';
import AIAgent from './components/ai/AIAgent';
import EmailReports from './components/ai/EmailReports';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showAuth, setShowAuth] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧠</div>
          <div className="text-xl font-semibold text-gray-900">Loading Plain...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        {showAuth === 'login' ? (
          <Login onSwitchToSignup={() => setShowAuth('signup')} />
        ) : (
          <SignUp onSwitchToLogin={() => setShowAuth('login')} />
        )}
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'apps':
        return <AppManager />;
      case 'subscription':
        return <Subscription />;
      case 'ai-agent':
        return <AIAgent />;
      case 'email-reports':
        return <EmailReports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex flex-1">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-6 overflow-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;