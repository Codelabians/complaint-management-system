import { Check } from 'lucide-react';
import React from 'react'

const plans = [
  {
    name: 'Basic',
    price: '0',
    features: [
      'Up to 100 community members',
      'Basic community management tools',
      'Standard support',
      'Email notifications',
      'Basic analytics',
      'Mobile app access',
      'Community forum'
    ]
  },
  {
    name: 'Premium',
    price: '1',
    features: [
      'Unlimited community members',
      'Advanced management tools',
      'Priority 24/7 support',
      'Custom branding & themes',
      'Advanced analytics & insights',
      'Event management system',
      'Multi-language support'
    ]
  }
];

const Subscription = () => {
  return (
    <div className="flex justify-center items-center p-4 sm:p-6 lg:p-8 min-h-full">
      <div className="w-full max-w-6xl">
        {/* Pricing Cards Container */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 sm:gap-6 lg:gap-8 ">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`
                bg-grey text-white rounded-xl shadow-xl relative overflow-hidden
                w-full max-w-sm mx-auto lg:mx-0 lg:w-80 xl:w-96 
                p-6 sm:p-8
                transform transition-transform duration-300 hover:scale-105
                ${index === 1 ? 'lg:mt-0 border-2 border-orange-500' : ''}
              `}
            >
        
              {/* Background decoration */}
              <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-10">
                <div className="w-full h-full bg-gray-600 rounded-full transform translate-x-12 translate-y-12 sm:translate-x-16 sm:translate-y-16"></div>
              </div>
              
              {/* Plan Header */}
              <div className="text-center mb-6 sm:mb-8 relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange">{plan.price}</span>
                  <span className="text-orange text-xl sm:text-2xl">$</span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">Per member</p>
              </div>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4 relative z-10">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              
           
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Subscription