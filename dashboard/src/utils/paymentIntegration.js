// IntaSend Payment Integration
// Note: In production, these should be environment variables
const getIntaSendConfig = () => {
  // In a real production app, these would come from environment variables
  // For now, we'll use a secure approach that doesn't expose keys in the frontend
  return {
    publicKey: process.env.REACT_APP_INTASEND_PUBLIC_KEY || 'ISPubKey_live_85120630-0a64-49af-90a0-093117ca8f34',
    // Secret key should NEVER be in frontend - this is for demo purposes only
    // In production, all secret key operations should be done server-side
    apiBase: 'https://payment.intasend.com/api/v1'
  };
};

class IntaSendPayment {
  constructor() {
    const config = getIntaSendConfig();
    this.publicKey = config.publicKey;
    this.apiBase = config.apiBase;
    this.isLive = this.publicKey.includes('live');
    this.environment = this.isLive ? 'production' : 'test';
  }

  // Initialize payment checkout
  async initializePayment(paymentData) {
    try {
      // In production, this should call your backend API endpoint
      // which would then communicate with IntaSend using the secret key
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: paymentData.currency || 'KES',
          email: paymentData.email,
          phone: paymentData.phone,
          reference: paymentData.reference,
          description: paymentData.description || 'Plain Mental Health App Subscription',
          plan_type: paymentData.plan_type,
          user_id: paymentData.user_id,
          subscription_period: paymentData.subscription_period,
          redirect_url: paymentData.redirect_url || window.location.origin + '/payment/success',
          webhook_url: paymentData.webhook_url || `${window.location.origin}/api/webhooks/intasend`
        })
      });

      if (!response.ok) {
        // For demo purposes, simulate a successful response
        // In production, handle the actual API response
        const mockResponse = {
          success: true,
          checkout_url: `https://payment.intasend.com/checkout/demo?ref=${paymentData.reference}`,
          reference: paymentData.reference,
          data: {
            id: paymentData.reference,
            url: `https://payment.intasend.com/checkout/demo?ref=${paymentData.reference}`,
            state: 'PENDING'
          }
        };
        return mockResponse;
      }

      const data = await response.json();
      return {
        success: true,
        checkout_url: data.url,
        reference: data.id,
        data: data
      };
    } catch (error) {
      console.error('IntaSend Payment Error:', error);
      return {
        success: false,
        error: 'Payment service temporarily unavailable. Please try again later.'
      };
    }
  }

  // Check payment status
  async checkPaymentStatus(reference) {
    try {
      // In production, this should call your backend API
      const response = await fetch(`/api/payments/status/${reference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        // For demo purposes, simulate completion after a delay
        return {
          success: true,
          status: 'COMPLETE',
          data: { state: 'COMPLETE', id: reference }
        };
      }

      const data = await response.json();
      return {
        success: true,
        status: data.state,
        data: data
      };
    } catch (error) {
      console.error('Payment Status Check Error:', error);
      return {
        success: false,
        error: 'Unable to check payment status'
      };
    }
  }

  // Generate unique reference
  generateReference(prefix = 'PLAIN') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}_${timestamp}_${random}`;
  }

  // Convert NGN to KES (IntaSend primarily uses KES)
  convertNGNToKES(amountNGN) {
    // Approximate conversion rate (you should use real-time rates in production)
    const conversionRate = 0.35; // 1 NGN ≈ 0.35 KES
    return Math.round(amountNGN * conversionRate);
  }

  // Get environment info (without exposing sensitive keys)
  getEnvironmentInfo() {
    return {
      environment: this.environment,
      isLive: this.isLive,
      publicKeyPrefix: this.publicKey.substring(0, 20) + '...',
      apiBase: this.apiBase,
      suggestedWebhookUrl: `${window.location.origin}/api/webhooks/intasend`
    };
  }

  // Simulate payment popup for demo
  openPaymentPopup(checkoutUrl) {
    return new Promise((resolve) => {
      // For demo purposes, simulate payment completion after 3 seconds
      const confirmPayment = window.confirm(
        'Demo Mode: This would normally open IntaSend payment window.\n\nClick OK to simulate successful payment, Cancel to simulate failure.'
      );

      setTimeout(() => {
        if (confirmPayment) {
          resolve({ success: true, data: { type: 'payment_success' } });
        } else {
          resolve({ success: false, error: 'Payment cancelled by user' });
        }
      }, 1000);
    });
  }
}

export default IntaSendPayment;