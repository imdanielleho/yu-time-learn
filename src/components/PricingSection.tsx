
import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LoginSignupModal from './LoginSignupModal';

const PricingSection = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = false;

  const handleLogin = (email: string, password: string) => {
    console.log("Login with:", email, password);
    setIsLoginModalOpen(false);
    // TODO: Implement actual login logic
  };

  const handleSignup = (email: string, password: string, name: string) => {
    console.log("Signup with:", email, password, name);
    setIsLoginModalOpen(false);
    // TODO: Implement actual signup logic
  };

  const handleSelectPlan = (plan: string) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      console.log(`Selected ${plan} plan`);
      // TODO: Implement plan selection logic
    }
  };

  const plans = [
    {
      name: "Single Course",
      price: "120",
      period: "one-time",
      description: "Perfect for trying out YŪTIME",
      features: [
        "Access to 1 course",
        "Lifetime access",
        "Community support",
        "Certificate of completion"
      ],
      popular: false,
      buttonText: "Get Started"
    },
    {
      name: "3-Course Bundle",
      price: "350", 
      period: "one-time",
      description: "Great value for focused learning",
      features: [
        "Access to 3 courses",
        "Lifetime access",
        "Priority community support",
        "Certificates of completion",
        "Monthly group sessions"
      ],
      popular: true,
      buttonText: "Most Popular"
    },
    {
      name: "Full Access",
      price: "500",
      period: "one-time", 
      description: "Complete learning journey",
      features: [
        "Access to all courses",
        "Lifetime access",
        "1-on-1 mentoring sessions",
        "Priority support",
        "All certificates",
        "Exclusive workshops",
        "Early access to new courses"
      ],
      popular: false,
      buttonText: "Get Full Access"
    }
  ];

  return (
    <>
      <section id="pricing" className="section bg-yutime-softWhite">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yutime-sage">Choose Your Path</h2>
            <p className="max-w-2xl mx-auto text-yutime-warmGray text-lg leading-relaxed">
              Select the learning journey that fits your goals and budget. All plans include lifetime access.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl p-8 shadow-soft transition-all duration-300 hover:shadow-warm border-2 ${
                  plan.popular ? 'border-yutime-coral scale-105' : 'border-yutime-sand hover:border-yutime-sand_dark'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yutime-coral text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star size={16} className="fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2 text-yutime-sage">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-yutime-sage">HKD {plan.price}</span>
                    <span className="text-yutime-warmGray ml-1">/ {plan.period}</span>
                  </div>
                  <p className="text-yutime-warmGray">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check size={20} className="text-yutime-sage mt-0.5 flex-shrink-0" />
                      <span className="text-yutime-warmGray">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-3 rounded-xl font-medium text-lg transition-all duration-300 hover-lift ${
                    plan.popular 
                      ? 'bg-yutime-coral hover:bg-yutime-coral/90 text-white' 
                      : 'bg-yutime-sage hover:bg-yutime-sage/90 text-white'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-yutime-warmGray mb-4">
              Questions about our plans? <a href="#" className="text-yutime-sage hover:underline font-medium">Contact us</a>
            </p>
            <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-yutime-warmGray">
              <span className="flex items-center space-x-1">
                <Check size={16} className="text-yutime-sage" />
                <span>30-day money-back guarantee</span>
              </span>
              <span className="flex items-center space-x-1">
                <Check size={16} className="text-yutime-sage" />
                <span>Secure payment</span>
              </span>
              <span className="flex items-center space-x-1">
                <Check size={16} className="text-yutime-sage" />
                <span>Cancel anytime</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <LoginSignupModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
};

export default PricingSection;
