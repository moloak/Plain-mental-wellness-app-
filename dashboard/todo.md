# Plain Mental Health App - MVP Todo

## Core Features to Implement

### 1. Authentication System
- **SignUp.jsx** - Registration with AI agent selection (Dan/Jemma)
- **Login.jsx** - User authentication
- **AuthContext.jsx** - Authentication state management

### 2. Main Dashboard
- **Dashboard.jsx** - Main app usage overview (modify existing)
- **AppUsageChart.jsx** - Daily/weekly usage visualization
- **UsageStats.jsx** - Key metrics and statistics

### 3. App Management
- **AppManager.jsx** - Add/remove apps for monitoring
- **AppCard.jsx** - Individual app monitoring component
- **UsageLimits.jsx** - Set time limits for apps

### 4. Subscription & Payment
- **Subscription.jsx** - Plan selection and payment
- **PaymentIntegration.js** - Intasend payment gateway
- **TrialManager.jsx** - 7-day free trial logic

### 5. AI Agent System
- **AIAgent.jsx** - Dan/Jemma persona display
- **EmailReports.jsx** - Simulated email report system

### 6. Data & Utils
- **mockData.js** - Enhanced with Plain-specific data (modify existing)
- **utils.js** - Helper functions for time calculations
- **constants.js** - App constants and configurations

## File Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── SignUp.jsx
│   │   ├── Login.jsx
│   │   └── AuthContext.jsx
│   ├── dashboard/
│   │   ├── Dashboard.jsx (modify)
│   │   ├── AppUsageChart.jsx
│   │   └── UsageStats.jsx
│   ├── apps/
│   │   ├── AppManager.jsx
│   │   ├── AppCard.jsx
│   │   └── UsageLimits.jsx
│   ├── subscription/
│   │   ├── Subscription.jsx
│   │   └── TrialManager.jsx
│   └── ai/
│       ├── AIAgent.jsx
│       └── EmailReports.jsx
├── utils/
│   ├── paymentIntegration.js
│   ├── utils.js
│   └── constants.js
└── data/
    └── mockData.js (modify)
```

## Implementation Priority
1. Update mockData.js with Plain-specific data
2. Create authentication system
3. Modify main dashboard for Plain branding
4. Implement app management system
5. Add subscription and payment features
6. Create AI agent system
7. Final styling and mobile optimization