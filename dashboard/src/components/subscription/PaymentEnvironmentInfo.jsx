import React from 'react';
import IntaSendPayment from '../../utils/paymentIntegration';

const PaymentEnvironmentInfo = () => {
  const intaSend = new IntaSendPayment();
  const envInfo = intaSend.getEnvironmentInfo();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-blue-900 mb-2">🔧 Payment Environment Configuration</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-blue-700">Environment:</span>
          <span className={`font-medium ${envInfo.isLive ? 'text-green-600' : 'text-orange-600'}`}>
            {envInfo.environment.toUpperCase()} {envInfo.isLive ? '🟢' : '🟡'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-700">Public Key:</span>
          <span className="font-mono text-xs text-blue-800">
            {envInfo.publicKeyPrefix}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-700">API Endpoint:</span>
          <span className="font-mono text-xs text-blue-800">
            {envInfo.apiBase}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <span className="text-blue-700 font-medium">Suggested Webhook URL:</span>
          <div className="mt-1 p-2 bg-blue-100 rounded border font-mono text-xs text-blue-900 break-all">
            {envInfo.suggestedWebhookUrl}
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Configure this URL in your IntaSend dashboard to receive payment notifications
          </p>
        </div>
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-xs text-yellow-800">
            <strong>Demo Mode:</strong> Payment processing is simulated for development. 
            In production, integrate with your backend API for secure payment handling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentEnvironmentInfo;