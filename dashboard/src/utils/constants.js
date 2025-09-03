export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    name: 'Monthly Plan',
    price: 3000,
    currency: 'NGN',
    duration: 'month',
    features: [
      'Unlimited app monitoring',
      'AI-powered insights',
      'Email reports',
      'Usage notifications',
      'App blocking features'
    ]
  },
  YEARLY: {
    name: 'Yearly Plan',
    price: 30000,
    currency: 'NGN',
    duration: 'year',
    features: [
      'All monthly features',
      '2 months free',
      'Priority support',
      'Advanced analytics',
      'Custom AI agent training'
    ]
  }
};

export const AI_AGENTS = {
  DAN: {
    name: 'Dan',
    personality: 'Analytical and data-driven',
    description: 'Dan provides detailed analytics and practical suggestions based on usage patterns.',
    avatar: '🤖',
    color: 'blue'
  },
  JEMMA: {
    name: 'Jemma',
    personality: 'Empathetic and supportive',
    description: 'Jemma offers compassionate guidance and emotional support for digital wellness.',
    avatar: '💝',
    color: 'pink'
  }
};

export const USAGE_THRESHOLDS = {
  WARNING_30: 0.3,
  WARNING_60: 0.6,
  FINAL_WARNING: 0.9,
  BLOCKED: 1.0
};

export const NOTIFICATION_MESSAGES = {
  30: "You've used 30% of your daily limit for this app. Consider taking a break soon.",
  60: "You've reached 60% of your daily limit. Time to wrap up your current activity.",
  90: "Final warning: 90% limit reached. Please save your work - this app will be blocked soon."
};

export const TRIAL_DURATION = 7; // days