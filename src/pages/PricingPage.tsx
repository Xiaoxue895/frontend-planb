import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'yearly' | 'monthly'>('yearly');

  const handlePlanSelect = (plan: string) => {
    // For now, all plans lead to profile creation
    navigate('/onboarding/profile');
  };

  const handleSkip = () => {
    navigate('/onboarding/profile');
  };

  const pricingPlans = {
    yearly: {
      free: { price: 0, tokens: 'one time', limit: 'Up to XXX' },
      standard: { price: 12, tokens: 420, limit: 'Up to XXX' },
      pro: { price: 22, tokens: 1200, limit: 'Up to XXX' }
    },
    monthly: {
      free: { price: 0, tokens: 'one time', limit: 'Up to XXX' },
      standard: { price: 15, tokens: 350, limit: 'Up to XXX' },
      pro: { price: 29, tokens: 1000, limit: 'Up to XXX' }
    }
  };

  const currentPricing = pricingPlans[billingPeriod];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐥</span>
              </div>
              <span className="text-xl font-bold text-gray-900">JOBHATCH</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="font-medium">Mia Yue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Do more in less time
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get the early - bird pricing
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex bg-gray-100 rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly -25%
            </button>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.free.price}</span>
              <span className="text-gray-600">/mo</span>
            </div>
            <button
              onClick={() => handlePlanSelect('free')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
            >
              Start for free
            </button>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Token</h4>
                <p className="text-sm text-gray-600">90 Tokens ({currentPricing.free.tokens})</p>
                <p className="text-xs text-gray-500">{currentPricing.free.limit}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Feature</h4>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Standard</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.standard.price}</span>
              <span className="text-gray-600">/mo</span>
            </div>
            <button
              onClick={() => handlePlanSelect('standard')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
            >
              Subscribe
            </button>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Token</h4>
                <p className="text-sm text-gray-600">{currentPricing.standard.tokens} Tokens</p>
                <p className="text-xs text-gray-500">{currentPricing.standard.limit}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Feature</h4>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.pro.price}</span>
              <span className="text-gray-600">/mo</span>
            </div>
            <button
              onClick={() => handlePlanSelect('pro')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
            >
              Subscribe
            </button>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Token</h4>
                <p className="text-sm text-gray-600">{currentPricing.pro.tokens} Tokens</p>
                <p className="text-xs text-gray-500">{currentPricing.pro.limit}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Feature</h4>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
                <p className="text-sm text-gray-600">XXXXXXXX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-medium underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 