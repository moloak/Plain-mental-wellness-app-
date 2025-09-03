// Mock data for Plain Mental Health App

export const mockUser = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  aiAgent: 'jemma',
  subscriptionPlan: 'trial',
  trialStartDate: '2025-08-26',
  joinDate: '2025-08-26'
};

export const monitoredApps = [
  {
    id: 1,
    name: 'Instagram',
    icon: '📸',
    category: 'Social Media',
    dailyLimit: 120, // minutes
    todayUsage: 95,
    weeklyUsage: [45, 67, 89, 123, 78, 95, 87],
    status: 'warning',
    lastUsed: '2 hours ago',
    totalBlocks: 3,
    overshootHours: 2.5
  },
  {
    id: 2,
    name: 'TikTok',
    icon: '🎵',
    category: 'Entertainment',
    dailyLimit: 90,
    todayUsage: 87,
    weeklyUsage: [67, 89, 76, 91, 87, 82, 87],
    status: 'critical',
    lastUsed: '30 minutes ago',
    totalBlocks: 5,
    overshootHours: 4.2
  },
  {
    id: 3,
    name: 'WhatsApp',
    icon: '💬',
    category: 'Communication',
    dailyLimit: 180,
    todayUsage: 45,
    weeklyUsage: [34, 56, 67, 45, 78, 45, 52],
    status: 'normal',
    lastUsed: '5 minutes ago',
    totalBlocks: 0,
    overshootHours: 0
  },
  {
    id: 4,
    name: 'YouTube',
    icon: '📺',
    category: 'Entertainment',
    dailyLimit: 150,
    todayUsage: 142,
    weeklyUsage: [89, 134, 156, 142, 167, 142, 134],
    status: 'critical',
    lastUsed: '1 hour ago',
    totalBlocks: 7,
    overshootHours: 6.8
  },
  {
    id: 5,
    name: 'Twitter',
    icon: '🐦',
    category: 'Social Media',
    dailyLimit: 60,
    todayUsage: 23,
    weeklyUsage: [34, 45, 23, 56, 67, 23, 34],
    status: 'normal',
    lastUsed: '3 hours ago',
    totalBlocks: 1,
    overshootHours: 0.5
  }
];

export const weeklyInsights = {
  totalScreenTime: 1247, // minutes this week
  averageDailyUsage: 178,
  mostUsedApp: 'YouTube',
  leastUsedApp: 'Twitter',
  blockedAppsCount: 16,
  overshootTotal: 14.0,
  improvementScore: 72,
  weeklyGoal: 1200,
  previousWeekComparison: -8.5 // percentage change
};

export const aiInsights = {
  dan: [
    "Your screen time decreased by 8.5% this week - excellent progress! The data shows you're most vulnerable between 7-9 PM.",
    "Instagram usage spiked on Wednesday. Consider scheduling specific check-in times rather than continuous scrolling.",
    "You've successfully avoided YouTube blocks for 3 days. This pattern suggests improved self-regulation."
  ],
  jemma: [
    "I'm so proud of your progress this week! 💚 You're showing real commitment to your digital wellness journey.",
    "I noticed you've been reaching for Instagram when you might be feeling stressed. Remember, it's okay to feel emotions without distraction. 🌸",
    "Your mindful approach to WhatsApp usage is beautiful to see. You're maintaining connections without losing yourself. ✨"
  ]
};

export const usageCategories = [
  { name: 'Social Media', usage: 312, color: '#FF6B6B', apps: ['Instagram', 'Twitter'] },
  { name: 'Entertainment', usage: 487, color: '#4ECDC4', apps: ['TikTok', 'YouTube'] },
  { name: 'Communication', usage: 156, color: '#45B7D1', apps: ['WhatsApp'] },
  { name: 'Productivity', usage: 89, color: '#96CEB4', apps: ['Notes', 'Calendar'] },
  { name: 'Games', usage: 203, color: '#FFEAA7', apps: ['Candy Crush', 'PUBG'] }
];

export const notificationHistory = [
  {
    id: 1,
    appName: 'Instagram',
    type: '60%',
    timestamp: '2025-09-01 14:30',
    message: "You've reached 60% of your daily limit. Time to wrap up your current activity.",
    acknowledged: true
  },
  {
    id: 2,
    appName: 'TikTok',
    type: '90%',
    timestamp: '2025-09-01 16:45',
    message: "Final warning: 90% limit reached. Please save your work - this app will be blocked soon.",
    acknowledged: false
  },
  {
    id: 3,
    appName: 'YouTube',
    type: 'blocked',
    timestamp: '2025-09-01 19:20',
    message: "YouTube has been blocked for today. It will be available again tomorrow morning.",
    acknowledged: true
  }
];

export const monthlyStats = {
  totalUsers: 15420,
  averageUsageReduction: 34,
  successfulBlocks: 89234,
  userSatisfaction: 4.7,
  aiReportsDelivered: 12890
};