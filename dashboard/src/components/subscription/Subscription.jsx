import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { SUBSCRIPTION_PLANS } from '../../utils/constants';
import { formatCurrency, calculateTrialDaysLeft } from '../../utils/utils';
import IntaSendPayment from '../../utils/paymentIntegration';
import PaymentEnvironmentInfo from './PaymentEnvironmentInfo';

const Subscription = () => {
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const trialDaysLeft = user?.subscriptionPlan === 'trial' ? calculateTrialDaysLeft(user.trialStartDate) : 0;
  const intaSend = new IntaSendPayment();

  const handleSubscribe = async (planType) => {
    setLoading(true);
    setPaymentError('');
    setSelectedPlan(planType);
    
    const plan = SUBSCRIPTION_PLANS[planType.toUpperCase()];
    const reference = intaSend.generateReference('PLAIN_SUB');
    
    try {
      // Initialize payment with IntaSend
      const paymentData = {
        amount: intaSend.convertNGNToKES(plan.price), // Convert NGN to KES
        currency: 'KES',
        email: user.email,
        phone: user.phone || '', // You might want to collect phone during signup
        reference: reference,
        description: `Plain Mental Health App - ${plan.name}`,
        plan_type: planType,
        user_id: user.id,
        subscription_period: plan.duration,
        redirect_url: `${window.location.origin}/payment/success`,
        webhook_url: `${window.location.origin}/api/webhooks/intasend`
      };

      const result = await intaSend.initializePayment(paymentData);
      
      if (result.success) {
        // Open payment popup
        try {
          const paymentResult = await intaSend.openPaymentPopup(result.checkout_url);
          
          if (paymentResult.success) {
            // Payment successful
            updateUser({ 
              subscriptionPlan: planType,
              subscriptionStartDate: new Date().toISOString().split('T')[0],
              paymentReference: reference
            });
            setPaymentSuccess(true);
            setShowPayment(false);
          } else if (paymentResult.closed) {
            // User closed popup - check payment status
            const statusResult = await intaSend.checkPaymentStatus(result.reference);
            if (statusResult.success && statusResult.status === 'COMPLETE') {
              updateUser({ 
                subscriptionPlan: planType,
                subscriptionStartDate: new Date().toISOString().split('T')[0],
                paymentReference: reference
              });
              setPaymentSuccess(true);
              setShowPayment(false);
            } else {
              setPaymentError('Payment was not completed. Please try again.');
            }
          }
        } catch (popupError) {
          setPaymentError(popupError.error || 'Payment popup failed to open');
        }
      } else {
        setPaymentError(result.error || 'Failed to initialize payment');
      }
    } catch (error) {
      setPaymentError('Payment initialization failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializePayment = (planType) => {
    setSelectedPlan(planType);
    setShowPayment(true);
    setPaymentError('');
    setPaymentSuccess(false);
  };

  if (paymentSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Welcome to Plain! Your {SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].name} subscription is now active.
        </p>
        <button
          onClick={() => {
            setPaymentSuccess(false);
            setShowPayment(false);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">💳</div>
          <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
          <p className="text-gray-600">
            {SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].name} - {formatCurrency(SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].price)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Amount will be converted to KES for payment processing
          </p>
        </div>

        <div className="space-y-4">
          <PaymentEnvironmentInfo />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">🔒</span>
              <span className="text-blue-800 font-medium">Secure Payment with IntaSend</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">Your payment is processed securely through IntaSend payment gateway</p>
          </div>

          {paymentError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <span className="text-red-600">⚠️</span>
                <span className="text-red-800 font-medium">Payment Error</span>
              </div>
              <p className="text-red-700 text-sm mt-1">{paymentError}</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium">{SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount (NGN)</span>
              <span className="font-medium">{formatCurrency(SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount (KES)</span>
              <span className="font-medium">KES {intaSend.convertNGNToKES(SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Billing</span>
              <span className="font-medium">Per {SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].duration}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => handleSubscribe(selectedPlan)}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing Payment...' : `Pay with IntaSend`}
            </button>
            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* IntaSend Trust Badge */}
          <div className="pt-4 border-t border-gray-200">
            <div className="text-center">
              <a href="https://intasend.com/security" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-with-mpesa-hr-dark.png" 
                  width="300" 
                  alt="IntaSend Secure Payments (PCI-DSS Compliant)"
                  className="mx-auto"
                />
              </a>
              <a 
                href="https://intasend.com/security" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-600 text-xs mt-2 hover:text-gray-800 transition-colors"
              >
                Secured by IntaSend Payments
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Invest in your digital wellness journey</p>
      </div>

      <PaymentEnvironmentInfo />

      {user?.subscriptionPlan === 'trial' && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
          <div className="text-2xl mb-2">🎉</div>
          <h3 className="text-xl font-bold mb-2">Free Trial Active</h3>
          <p className="mb-2">
            {trialDaysLeft > 0 
              ? `${trialDaysLeft} days remaining in your free trial`
              : 'Your free trial has expired'
            }
          </p>
          <p className="text-sm opacity-90">
            Upgrade now to continue enjoying all Plain features
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
          <div
            key={key}
            className={`bg-white rounded-xl shadow-lg border-2 p-6 relative ${
              key === 'YEARLY' ? 'border-purple-500' : 'border-gray-200'
            }`}
          >
            {key === 'YEARLY' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {formatCurrency(plan.price)}
              </div>
              <p className="text-gray-600">per {plan.duration}</p>
              {key === 'YEARLY' && (
                <p className="text-green-600 font-medium text-sm mt-1">Save ₦6,000 per year!</p>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => initializePayment(key.toLowerCase())}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                key === 'YEARLY'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {user?.subscriptionPlan === 'trial' ? 'Upgrade Now' : 'Switch to This Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">What's Included</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span>Detailed analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🤖</span>
              <span>AI-powered insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>Weekly email reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🚫</span>
              <span>App blocking features</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Real-time notifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>Unlimited app monitoring</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          All plans include a 7-day free trial • Cancel anytime • No hidden fees
        </p>

        {/* IntaSend Trust Badge for main subscription page */}
        <div className="pt-4">
          <div className="text-center">
            <a href="https://intasend.com/security" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-with-mpesa-hr-dark.png" 
                width="250" 
                alt="IntaSend Secure Payments (PCI-DSS Compliant)"
                className="mx-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
            <a 
              href="https://intasend.com/security" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-500 text-xs mt-2 hover:text-gray-700 transition-colors"
            >
              Secured by IntaSend Payments
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;