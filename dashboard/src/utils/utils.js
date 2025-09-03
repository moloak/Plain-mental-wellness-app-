export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const calculateUsagePercentage = (used, limit) => {
  return Math.min((used / limit) * 100, 100);
};

export const getUsageStatus = (percentage) => {
  if (percentage >= 100) return 'blocked';
  if (percentage >= 90) return 'critical';
  if (percentage >= 60) return 'warning';
  if (percentage >= 30) return 'caution';
  return 'normal';
};

export const getStatusColor = (status) => {
  const colors = {
    normal: 'text-green-600 bg-green-100',
    caution: 'text-yellow-600 bg-yellow-100',
    warning: 'text-orange-600 bg-orange-100',
    critical: 'text-red-600 bg-red-100',
    blocked: 'text-gray-600 bg-gray-100'
  };
  return colors[status] || colors.normal;
};

export const generateUsageInsight = (appName, usage, limit, agent) => {
  const percentage = calculateUsagePercentage(usage, limit);
  const status = getUsageStatus(percentage);
  
  const insights = {
    dan: {
      normal: `Great job managing ${appName}! You're using it efficiently within healthy limits.`,
      caution: `${appName} usage is at ${percentage.toFixed(0)}%. Consider setting specific times for usage.`,
      warning: `${appName} consumption is concerning. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.`,
      critical: `${appName} usage is critically high. Immediate action needed to prevent digital burnout.`,
      blocked: `${appName} has been blocked for your wellbeing. Use this time for offline activities.`
    },
    jemma: {
      normal: `You're doing wonderfully with ${appName}! Your mindful usage shows great self-awareness. 💚`,
      caution: `I notice you're spending more time on ${appName}. Remember, it's okay to take breaks. You deserve balance. 🌸`,
      warning: `${appName} seems to be taking up a lot of your energy today. How are you feeling? Consider some gentle movement or fresh air. 🌿`,
      critical: `I'm concerned about your ${appName} usage, dear. Your mental health matters more than any app. Let's find healthier ways to spend time. 💝`,
      blocked: `${appName} is taking a rest, and so should you. This is a perfect time for self-care activities that nourish your soul. ✨`
    }
  };
  
  return insights[agent.toLowerCase()]?.[status] || insights.dan[status];
};

export const calculateTrialDaysLeft = (signupDate) => {
  const today = new Date();
  const signup = new Date(signupDate);
  const daysPassed = Math.floor((today - signup) / (1000 * 60 * 60 * 24));
  return Math.max(7 - daysPassed, 0);
};

export const formatCurrency = (amount, currency = 'NGN') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
};